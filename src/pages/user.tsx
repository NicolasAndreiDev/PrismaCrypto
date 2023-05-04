import InfoUser from "@/components/InfoUser";
import Layout from "@/components/Layout";
import styles from "@/styles/User.module.scss";

export default function User() {
    return (
        <div className={styles.container}>
            <Layout>
                <InfoUser />
            </Layout>
        </div>
    )
}