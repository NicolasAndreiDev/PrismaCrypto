import Image from "next/image";
import { AiOutlineUser } from 'react-icons/ai'
import styles from './Header.module.scss'
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/providers/userProvider";

export default function Header() {
    const { user } = useContext(UserContext)

    return(
        <header className={styles.container}>
            <nav className={styles.header}>
                <Link href={'/'} className={styles.link}>
                    <Image src={'./images/Logo.svg'} alt={'Logo'} height={32} width={32}/>
                </Link>
                <Link href={'/user'} className={styles.link}>
                    <span className={styles.email}>{user?.email}</span>
                    <AiOutlineUser className={styles.icon}/>
                </Link>
            </nav>
        </header>
    )
}