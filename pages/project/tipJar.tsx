import { useAddress, useContract, useContractMetadata, Web3Button, useTotalCount, useClaimedNFTSupply, useOwnedNFTs, ThirdwebNftMedia, useTotalCirculatingSupply, useContractRead } from "@thirdweb-dev/react";
import HeroCard from "../../components/hero-card";
import styles from "../../styles/Home.module.css";
import { TIP_JAR_CONTRACT_ADDRESS } from "../../constants/addresses";
import { ethers } from "ethers";

export default function TipJar() {
    const address = useAddress();

    const {
        contract
    } = useContract(TIP_JAR_CONTRACT_ADDRESS);

    const {
        data: contractMetadata,
        isLoading: contractMetadataIsLoading
    } = useContractMetadata(contract);

    const {
        data: tipJarBalance,
        isLoading: tipJarBalanceIsLoading
    } = useContractRead(contract, "getBalance");

    const {
        data: owner,
        isLoading: ownerIsLoading
    } = useContractRead (contract, "owner");


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
                            <h3>Leave a tip</h3>
                            <p>Tips in MATIC.</p>
                            <Web3Button
                                contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                                action={(contract) => contract.call(
                                    "tip",
                                    [],
                                    {
                                      value: "1000000000000000"  
                                    }
                                )}
                                onSuccess={() => alert("Successfully tipped!")}
                                style={{ marginBottom: "1rem" }}
                            >
                                {`TIP (0.001 MATIC)`}
                            </Web3Button>

                        
                        </div>
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Tipjar Balance</h3>
                            <p>
                                Total Tips:&nbsp;
                                {tipJarBalanceIsLoading ? ("Loading...") : `${ethers.utils.formatEther(tipJarBalance)} MATIC`}
                            </p>
                        </div>
                    </div>

                    <div className={styles.componentCard}>
                        <div className={styles.customHeadingSpace1}>
                            <h3>Withdraw Balance</h3>
                            {ownerIsLoading ? "Loading..." : owner === address ? (
                                <div>
                                    <p>You are the owner, so you can withdraw.</p>
                                    <Web3Button
                                    contractAddress={TIP_JAR_CONTRACT_ADDRESS}
                                    action={(contract) => contract.call(
                                        "withdrawTips" 
                                    )}
                                    onSuccess={() => alert("Successfully withdrawn!")}
                                    style={{ marginBottom: "1rem" }}
                                    >
                                        Withdraw Balance
                                    </Web3Button>
                                </div>
                                
                            ) : (
                                <p>Only the owner can withdraw.</p>
                            )}
                        
                            
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )

}