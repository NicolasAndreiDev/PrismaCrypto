import styles from './Login.module.scss';
import { useRouter } from 'next/router';

export default function Login({onClick}: {onClick: () => void}) {
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        router.push('/')
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label htmlFor={'email'} className={styles.label}>E-mail</label>
                <input id={'email'} className={styles.input} autoComplete={'off'}/>
            </div>
            <div className={styles.group}>
                <label htmlFor={'password'} className={styles.label}>Password</label>
                <input id={'password'} type={'password'} autoComplete={'current-password'} className={styles.input}/>
            </div>
            <button className={styles.button}>Login</button>
            <p className={styles.newUser} onClick={onClick}>Não possui uma conta?</p>
        </form>
    )
}