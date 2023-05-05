import axios from 'axios';
import styles from './Login.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setCookie } from 'nookies';

interface User {
    email: string,
    password: string,
}

export default function Login({ onClick }: { onClick: () => void }) {
    const router = useRouter();
    const [values, setValues] = useState<User>({ email: '', password: '' });

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const users = await axios.post('http://localhost:4000/login', {
                email: values.email,
                password: values.password
            })
            if (users) {
                setCookie(null, 'token', users.data, { path: '/' });
                router.push('/')
            }
        } catch {
            alert('Erro com o servidor')
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label htmlFor={'email'} className={styles.label}>E-mail</label>
                <input id={'email'} className={styles.input} autoComplete={'off'} name={'email'} value={values.email} onChange={handleChange} />
            </div>
            <div className={styles.group}>
                <label htmlFor={'password'} className={styles.label}>Password</label>
                <input id={'password'} type={'password'} autoComplete={'current-password'} name={'password'} value={values.password} className={styles.input} onChange={handleChange} />
            </div>
            <button className={styles.button}>Login</button>
            <p className={styles.newUser} onClick={onClick}>Não possui uma conta?</p>
        </form>
    )
}