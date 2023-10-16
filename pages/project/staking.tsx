import { useAddress, useContract, useContractMetadata, Web3Button, useTotalCount, useClaimedNFTSupply, useOwnedNFTs, ThirdwebNftMedia, useTotalCirculatingSupply, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import HeroCard from "../../components/hero-card";
import styles from "../../styles/Home.module.css";
import { STAKING_CONTRACT_ADDRESS, ERC20_CONTRACT_ADDRESS, ERC721_CONTRACT_ADDRESS } from "../../constants/addresses";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import StakeNFTCard from "../../components/stake-nft-card";
import StakedNFTCard from "../../components/staked-nft-card";

export default function Staking() {
    const address = useAddress();

    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

    const {
        contract: stakingContract
    } = useContract(STAKING_CONTRACT_ADDRESS);

    const {
        contract: ERC20Contract
    } = useContract(ERC20_CONTRACT_ADDRESS);

    const {
        contract: ERC721Contract
    } = useContract(ERC721_CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading
    } = useContractMetadata(stakingContract);

    const {
        data: tokenBalance,
        isLoading: tokenBalanceIsLoading
    } = useTokenBalance(ERC20Contract, address);

    const {
        data: ownedERC721NFTs,
        isLoading: ownedERC721NFTsIsLoading
    } = useOwnedNFTs(ERC721Contract, address)

    const {
        data: stakedERC721Tokens,
        isLoading: isStakedERC721NFTsIsLoading
    } = useContractRead(stakingContract, "getStakedInfo", [address]);

    useEffect(() => {
        if(!stakingContract || !address) return;
        async function getClaimableRewards() {
            const claimableRewards = await stakingContract?.call("getStakeInfo", [address]);
            setClaimableRewards(claimableRewards[1]);
        }
        getClaimableRewards();
    }, [address, stakingContract]);

    return (
        <div className={styles.container}>
            <div className={styles.contractPage}>
                <HeroCard
                    isLoading={contractMetadataIsLoading}
                    title={contractMetadata?.name!}
                    description={contractMetadata?.description!}
                    image={contractMetadata?.image!}
                />

                <div className={styles.grid}>
                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                        <h3>Rewards</h3>

                        {tokenBalanceIsLoading ? (
                            <p>Token balance is loading...</p>
                        ) : (
                            <p>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                        )}

                        {claimableRewards && (
                            <p>Claimable Rewards: {ethers.utils.formatEther(claimableRewards!)}</p>
                        )}

                        <Web3Button
                            contractAddress={STAKING_CONTRACT_ADDRESS}
                            action={(contract) => contract.call("claimRewards")}
                            onSuccess={() => {
                                alert("Successfully claimed rewards!")
                                setClaimableRewards(ethers.constants.Zero);//reset claimable rewards to 0 
                            }}
                            isDisabled={!claimableRewards || claimableRewards.isZero()}
                        >
                            Claim Rewards
                        </Web3Button>
                        </div>    
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                        <h3>Unstaked NFT</h3>
                        {ownedERC721NFTsIsLoading ? (
                            <p>Loading...</p>
                        ) : (
                            ownedERC721NFTs && ownedERC721NFTs.length > 0 ? (
                                ownedERC721NFTs.map((nft) => (
                                    <div key={nft.metadata.id} className={styles.nftGrid} style={{ marginBottom: '1rem' }}>
                                        <StakeNFTCard
                                            nft={nft}
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No NFTs owned.</p>
                            )
                        )}
                        </div>    
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Staked NFT</h3>
                            {/* {isStakedERC721NFTsIsLoading ? (
                                <p>Loading...</p>
                            ) : (
                                stakedERC721Tokens && stakedERC721Tokens.length > 0 ? (
                                    stakedERC721Tokens[0].map((stakedNFT: BigNumber, index: number) => (
                                        <div key={index} className={styles.nftGrid}>
                                            <StakedNFTCard
                                                tokenId={stakedNFT.toNumber()}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>None NFTs staked</p>
                                )
                            )} */}
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    )

}