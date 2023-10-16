import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { ConnectWallet, darkTheme, lightTheme } from '@thirdweb-dev/react'


const customDarkTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
      modalBg: "#000000",
      accentText: "green",
    },
  });

export default function Navbar() {
    return(
        <div className={styles.navbarContainer}>
            <Link href="/">
                <p 
                    className={styles.gradientText1}
                    style={{
                        cursor: "pointer",
                        fontSize: "1.5 rem",
                        fontWeight: 'bold'
                    }}
                >
                    Blockchain Self-study Portfolio of Haitian
                </p>
            </Link>
            <ConnectWallet 
                theme={customDarkTheme}
                btnTitle='Login'
                modalTitle='Select your Login wallet:'
            />
        </div>
    )

}