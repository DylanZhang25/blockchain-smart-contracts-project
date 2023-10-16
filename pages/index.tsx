// import { Contract } from "ethers";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import * as address from "../constants/addresses";
import ContractCard from "../components/contract-card";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Haitian &nbsp;
            <span className={styles.gradientText0}>
                Contracts
            </span>
          </h1>

          <p className={styles.description}>
            Select a following contract to work with:{" "}
          </p>

        </div>

        <div className={styles.grid}>
          <ContractCard 
            href="/project/erc20"
            contractAddress={address.ERC20_CONTRACT_ADDRESS}
            title="ERC20 -> "
            description='Claim ERC20 Tokens'
          />
          <ContractCard 
            href="/project/erc721"
            contractAddress={address.ERC721_CONTRACT_ADDRESS}
            title="ERC721 -> "
            description='Claim ERC721 Tokens'
          />
          <ContractCard 
            href="/project/erc1155"
            contractAddress={address.ERC1155_CONTRACT_ADDRESS}
            title="ERC1155 -> "
            description='Claim ERC1155 Tokens'
          />
          <ContractCard 
            href="/project/staking"
            contractAddress={address.STAKING_CONTRACT_ADDRESS}
            title="Staking Contract -> "
            description='Stake ERC721 to earn MATIC'
          />
          <ContractCard 
            href="/project/tipJar"
            contractAddress={address.TIP_JAR_CONTRACT_ADDRESS}
            title="Tip Jar ->"
            description='Donate a tip to the developer'
          />
          <ContractCard 
            href="/project/profileStatus"
            contractAddress={address.PROFILE_STATUS_CONTRACT_ADDRESS}
            title="Profile Status ->"
            description='Update your profile status'
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
