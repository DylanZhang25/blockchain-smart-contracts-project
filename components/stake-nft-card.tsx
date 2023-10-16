import { NFT } from "@thirdweb-dev/sdk";
import styles from "../styles/Home.module.css";
import { ThirdwebNftMedia, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { ERC721_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../constants/addresses";
import { ethers } from "ethers";

type NFTProps = {
    nft: NFT;
};

export default function StakeNFTCard({nft}: NFTProps) {
    const address = useAddress();
    
    const {
        data: ERC721Contract,
        isLoading: ERC721ContractIsLoading
    } = useContract(ERC721_CONTRACT_ADDRESS, "signature-drop")

    const {
        data: stakingContract,
        isLoading: stakingContractIsLoading
    } = useContract(STAKING_CONTRACT_ADDRESS)

    async function stakeNFT(nftId: number[]) {
        if(!address) return;

        const isApproved = await ERC721Contract?.isApproved(
            address,
            STAKING_CONTRACT_ADDRESS,
        );

        if (!isApproved) {
            await ERC721Contract?.setApprovalForAll(
                STAKING_CONTRACT_ADDRESS,
                true
            );
        }

        await stakingContract?.call(
            "stake",
            [nftId],
        );
    }


    return (
        <div className={styles.card}>
            <ThirdwebNftMedia
                metadata={nft.metadata}
                // width="100%"
                height="auto"
            />

            <div className={styles.nftInfoContainer}>
                <p className={styles.nftName}>{nft.metadata.name}</p>
                <p className={styles.nftTokenInfo}>Token ID id#{nft.metadata.id}</p>
            </div>

            <Web3Button
                contractAddress={STAKING_CONTRACT_ADDRESS}
                action={() => stakeNFT([parseInt(nft.metadata.id)])}
                // style={{ width: "100% !important" }}
            >
                Stake NFT
            </Web3Button>
        </div>
    )
}