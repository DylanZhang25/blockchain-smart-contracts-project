import { MediaRenderer } from '@thirdweb-dev/react';
import styles from '../styles/Home.module.css';

type HeroCardProps = {
    isLoading: boolean;
    title: string;
    description: string;
    image: string;
}

export default function TokenCard(props: HeroCardProps) {
    return (
        <>
            {props.isLoading ? (
                <div className={styles.loadingText}>
                    <p>Loading...</p>
                </div>
            ):(
                <div className={styles.heroCardContainer}>
                    <MediaRenderer 
                        src={props.image}
                    
                        className={styles.heroCardImage}
                    />

                    <div className={styles.heroCardContent}>
                        <h1 className={styles.gradientText1}>{props.title}</h1>
                        <p>{props.description}</p>
                    </div>
                </div>
            )}
        
        </>
    )
}