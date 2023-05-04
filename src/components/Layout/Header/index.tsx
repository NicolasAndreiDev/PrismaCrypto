import Image from "next/image";
import { AiOutlineUser } from 'react-icons/ai'
import styles from './Header.module.scss'
import Link from "next/link";

export default function Header() {
    return(
        <header className={styles.container}>
            <nav className={styles.header}>
                <Link href={'/'} className={styles.link}>
                    <Image src={'/Logo.svg'} alt={'Logo'} height={32} width={32}/>
                </Link>
                <Link href={'/user'} className={styles.link}>
                    <AiOutlineUser className={styles.icon}/>
                </Link>
            </nav>
        </header>
    )
}