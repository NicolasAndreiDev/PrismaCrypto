import Formulario from "@/components/Form";
import styles from '@/styles/Login.module.scss';

export default function Login() {
    return(
        <div className={styles.container}>
            <img className={styles.logo} src={'./images/LogoBranca.png'} alt={'Logo'}/>
            <Formulario />
            <div className={styles.intro}>
                <img className={styles.logoIntro} src={'./images/LogoBranca.png'} alt={'Logo'}/>
            </div>
        </div>
    )
}