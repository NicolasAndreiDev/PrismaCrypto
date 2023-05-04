import Login from './Login'
import Cadastro from './Cadastro'
import { useState } from 'react'

export default function Formulario() {
    const [form, setForm] = useState(true);

    function handleClick() {
        setForm(prev => !prev)
    }

    return (
        <div>
            { form ? <Login onClick={handleClick}/> : <Cadastro onClick={handleClick}/>}            
        </div>
    )
}