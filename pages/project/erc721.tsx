import { useAddress, useContract, useContractMetadata, Web3Button, useTotalCount, useClaimedNFTSupply, useOwnedNFTs, ThirdwebNftMedia } from "@thirdweb-dev/react";
import HeroCard from "../../components/hero-card";
import styles from "../../styles/Home.module.css";
import { ERC721_CONTRACT_ADDRESS } from "../../constants/addresses";
import Link from 'next/link';

export default function Erc721() {
    const address = useAddress();

    const {
        contract
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop");

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading
    } = useContractMetadata(contract)

    const {
        data: totalSupply,
        isLoading: totalSupplyIsLoading
    } = useTotalCount(contract)

    const {
        data: totalClaimedSupply,
        isLoading: totalClaimedSupplyIsLoading
    } = useClaimedNFTSupply(contract)

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
                        <h3 className={styles.customHeadingSpace1}>Claim ERC721</h3>
                        <p className={styles.customHeadingSpace1}>Free to claim ERC721 NFT.</p>
                        <Web3Button
                            contractAddress={ERC721_CONTRACT_ADDRESS}
                            action={(contract) => contract.erc721.claim(1)}
                            onSuccess={() => alert("Successfully claimed 1 NFT!")}
                            style={{ marginLeft: '1rem', marginBottom: '1rem' }}  
                        >
                            Claim 1 NFT
                        </Web3Button>
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Contract Stats</h3>
                            <p>
                                Total Supply:&nbsp;
                                {totalSupplyIsLoading ? (
                                    "Loading..."
                                ) : (
                                `${totalSupply?.toNumber()}` 
                                )}
                            </p>
                            <p>
                                Total Claimed:&nbsp;
                                {totalClaimedSupplyIsLoading ? (
                                    "Loading..."
                                ) : (
                                    `${totalClaimedSupply?.toNumber()}`
                                )}
                            </p>
                        </div>
                        
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Your NFTs</h3>
                            <p>
                                Total Owned:&nbsp;
                                {ownedNFTsIsLoading ? (
                                    "Loading..."
                                ) : (
                                    `${ownedNFTs?.length}`
                                )}
                            </p>    
                        </div>      
                    </div>
                </div>

                <div style={{ marginTop: '3rem'}}>
                    <h2>My NFTs:</h2>
                    <div className={styles.grid}>
                        {ownedNFTsIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            ownedNFTs?.map((nft) => (
                                <div className={styles.card} key={nft.metadata.id}>
                                    <ThirdwebNftMedia 
                                        metadata={nft.metadata}
                                        style={{ width: '100%', height: 'auto' }}
                                    />

                                    <div className={styles.cardText}>
                                        <h2>{nft.metadata.name}</h2>
                                    </div>

                                    <Link
                                        href={`/project/staking`}
                                    >
                                        <button 
                                            className={styles.stakeButton}
                                            style={{ width: '100%' }}
                                        >
                                            Stake NFT
                                        </button>
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>                       
                </div>
            </div>
        </div>
    )
}