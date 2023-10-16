import { useAddress, useContract, useContractMetadata, Web3Button, useTotalCount, useClaimedNFTSupply, useOwnedNFTs, ThirdwebNftMedia, useTotalCirculatingSupply } from "@thirdweb-dev/react";
import HeroCard from "../../components/hero-card";
import styles from "../../styles/Home.module.css";
import { ERC1155_CONTRACT_ADDRESS } from "../../constants/addresses";
import Link from 'next/link';

export default function Erc1155() {
    const address = useAddress();

    const {
        contract
    } = useContract(ERC1155_CONTRACT_ADDRESS, "edtion-drop");

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading
    } = useContractMetadata(contract)

    const {
        data: contractNTFSupply,
        isLoading: contractNTFSupplyIsLoading
    } = useTotalCount(contract)

    const {
        data: totalCirculationSupply,
        isLoading: totalCirculationSupplyIsLoading
    } = useTotalCirculatingSupply(contract, 1)

    const {
        data: ownedNFTs,
        isLoading: ownedNFTsIsLoading
    } = useOwnedNFTs(contract, address)

    return (
        <div className={styles.container}>
            <div className={styles.contractpage}>
                <HeroCard
                    isLoading={contractMetadataIsLoading}
                    title={contractMetadata?.name!}
                    description={contractMetadata?.description!}
                    image={contractMetadata?.image!}
                />
                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Claim ERC155</h3>
                            <p>Claim an ERC1155 NTF for 0.001 Matic tokens</p>
                            <Web3Button
                                contractAddress={ERC1155_CONTRACT_ADDRESS}
                                action={(contract) => contract.erc1155.claim(1, 1)}
                                onSuccess={() => alert("Successfully claimed 1 NFT!")}
                                style={{ marginBottom: "1rem" }}
                            >
                                Claim 0.001 MATIC
                            </Web3Button>
                        </div>
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Contract Stats</h3>
                            <p>
                                Total NTFs:&nbsp;
                                {contractNTFSupplyIsLoading ? (
                                    "Loading..."
                                ) : (
                                    `${contractNTFSupply?.toNumber()}`
                                )}
                            </p>
                            <p>
                                Total Circulating Supply TokenID 1:&nbsp;
                                {totalCirculationSupplyIsLoading ? (
                                    "Loading..."
                                ) : (
                                    `${totalCirculationSupply?.toNumber()}`
                                )}
                            </p>
                        </div>
                       
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Your NFTs</h3>
                            {ownedNFTsIsLoading ? (
                                "Loading..."
                            ) : (
                                ownedNFTs?.map((nft) => (
                                    <p key={nft.metadata.id}>TokenID#{nft.metadata.id} Owned: {nft.quantityOwned}</p>
                                ))
                            )}         
                        </div>
                    </div>
                </div>
                
            </div>
         </div>       

    )

}