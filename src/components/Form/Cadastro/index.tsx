import { useState } from 'react';
import styles from './Cadastro.module.scss';
import { useRouter } from 'next/router';
import axios from 'axios';
import bcrypt from 'bcryptjs';

interface FormValues {
    email: string,
    password: string,
    confirmPassword: string,
}

export default function Cadastro({onClick}: {onClick: () => void}) {
    const router = useRouter();
    const [values, setValues] = useState<FormValues>({email: '', password: '', confirmPassword: ''});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        const hashedPassword = await bcrypt.hash(values.password, 10);

        try{
            await axios.post('http://localhost:4000/users', {
                email: values.email,
                password: hashedPassword
            })
            router.push('/')
        }
        catch{
            alert('Não conseguiu cadastrar')
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setValues((prev) => ({...prev, [name]: value}))
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label htmlFor={'email'} className={styles.label}>E-mail</label>
                <input id={'email'} className={styles.input} type={'email'} name={'email'} value={values.email} autoComplete={'off'} onChange={handleChange}/>
            </div>
            <div className={styles.group}>
                <label htmlFor={'password'} className={styles.label}>Password</label>
                <input id={'password'} type={'password'} name={'password'} value={values.password} autoComplete={'current-password'} className={styles.input} onChange={handleChange}/>
            </div>
            <div className={styles.group}>
                <label htmlFor={'confirm-password'} className={styles.label}>Confirm Password</label>
                <input id={'confirm-password'} name={'confirmPassword'} type={'password'} value={values.confirmPassword} autoComplete={'current-password'} className={styles.input} onChange={handleChange}/>
            </div>
            <button className={styles.button}>Cadastro</button>
            <p className={styles.newUser} onClick={onClick}>Já possui uma conta?</p>
        </form>
    )
}