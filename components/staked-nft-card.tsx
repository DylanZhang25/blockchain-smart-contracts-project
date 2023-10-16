import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { useNFT, ThirdwebNftMedia, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../constants/addresses";
import { ethers } from "ethers";

type NFTProps = {
    tokenId: number;
};

export default function StakeNFTCard({tokenId}: NFTProps) {
    const {
        data: ERC721Contract,
        isLoading: ERC721ContractIsLoading
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop")

    const {
        data: stakingContract,
        isLoading: stakingContractIsLoading
    } = useContract(STAKING_CONTRACT_ADDRESS)

    const {
        data: nftMetadata,
        isLoading: nftMetadataIsLoading
    } = useNFT(ERC721Contract, tokenId)

    return (
        <div className={styles.card}>
            <ThirdwebNftMedia 
                metadata={nftMetadata?.metadata!}
                width="100%"
                height="auto"
            />

            <div className={styles.nftInfoContainer}>
                <p className={styles.nftName}>{nftMetadata?.metadata.name}</p>
                <p className={styles.nftTokenInfo}>Token ID id#{nftMetadata?.metadata.id}</p>
            </div>

            <Web3Button
                contractAddress={STAKING_CONTRACT_ADDRESS}
                action={(contract) => contract.call(
                    "withdraw",
                    [tokenId]
                )}
            >
                Unstake
            </Web3Button>
        </div>
    )

}
