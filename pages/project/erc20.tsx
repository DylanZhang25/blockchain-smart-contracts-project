import styles from '../../styles/Home.module.css'
import HeroCard from '../../components/hero-card'
import { ERC20_CONTRACT_ADDRESS } from '../../constants/addresses';
import { useAddress, useContract, useContractMetadata, useTokenSupply, useTokenBalance, Web3Button } from "@thirdweb-dev/react";
import Link from 'next/link';

export default function ERC20Project() {
    const address = useAddress();

    // This is the hook from thirdweb that gives you access to the contract.
    const { contract } = useContract(ERC20_CONTRACT_ADDRESS, "token");

    const { 
        data: contractMetadata,
        isLoading: contractMetadataIsLoading 
    } = useContractMetadata(contract)

    const {
        data: tokenSupply,
        isLoading: tokenSupplyIsLoading
    } = useTokenSupply(contract)

    const {
        data: tokenBalance,
        isLoading: tokenBalanceIsLoading
    } = useTokenBalance(contract, address)



    return (
        <div className={styles.container}>
            <HeroCard 
                /**
                 *  contractMetadata?.name! is used to get the name property in the contractMetadata object and explicitly tell the TypeScript compiler that there will be no null values.
                 *  If contractMetadata or name is null or undefined, it will return undefined at runtime, which helps you handle possible null cases without raising an error.
                 */
                isLoading={contractMetadataIsLoading}
                title={contractMetadata?.name!}
                description={contractMetadata?.description!}
                image={contractMetadata?.image!}
            />

            <div className={styles.grid}>
                <div className={styles.componentCard}>
                    <h3 className={styles.customHeadingSpace1}>Token Stats</h3>
                    {tokenSupplyIsLoading ? (
                        <p className={styles.customHeadingSpace1}>Loading supply...</p>
                    ) : (
                        <p className={styles.customHeadingSpace1}>Total supply: {tokenSupply?.displayValue} {tokenSupply?.symbol}</p>
                    )}
                </div>

                <div className={styles.componentCard}>
                    <h3 className={styles.customHeadingSpace1}>Token Balance</h3>

                    {tokenBalanceIsLoading ? (
                        <p className={styles.customHeadingSpace1}>Loading balance...</p>
                    ) : (
                        <p className={styles.customHeadingSpace1}>Balance: {tokenBalance?.displayValue} {tokenBalance?.symbol}</p>
                    )}

                    <Web3Button
                        contractAddress={ERC20_CONTRACT_ADDRESS}
                        action={(contract) => contract.erc20.burn(10)}
                        style={{ marginLeft: '1rem' }}
                    >
                        Burn 10 tokens
                    </Web3Button>
                </div>

                <div className={styles.componentCard}>
                    <h3 className={styles.customHeadingSpace1}>Earn Tokens</h3>
                    <p className={styles.customHeadingSpace1}>Earn more tokens from staking an ERC721 NFT</p>
                    
                    <div>
                        <Link href='project/staking'>
                            <button className={styles.matchButton}>Stake ERC721</button>
                        </Link>

                        <Link href='project/erc721'>
                            <button className={styles.matchButton}>Claim ERC721</button>
                        </Link>    
                    </div>    

                </div>

            </div>
        </div>
    )
}