import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { MediaRenderer, useContract, useContractMetadata } from "@thirdweb-dev/react";

type CardProp = {
    href: string;
    contractAddress: string;
    title: string;
    description: string;
};

export default function ContractCard(props: CardProp) {
    // This is the hook from thirdweb that gives you access to the contract.
    const { contract } = useContract(props.contractAddress);

    const { data: contractMetadata } = useContractMetadata(contract)

    return (
        <Link 
            href={props.href}
            className={`${styles.card} ${styles.contractCardWrapper}`}
        >
            <MediaRenderer 
                src={contractMetadata?.image}
                width='100%'
                height='auto'
                // style={{ marginTop: '0.25rem' }}
            />
            <div className={styles.cardTextHomepage}>
                <h3 className={styles.gradientText1}>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </Link>
    )
}

