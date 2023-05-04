import { useEffect, useState } from "react";
import ChartInfo from "../Chart";
import axios from "axios";
import styles from './Tabelas.module.scss'

type Coin = {
    [key: string]: {
        BRL: number;
    }
}

export default function Tabelas() {
    const [coin, setCoin] = useState<Coin>({});
    
    useEffect(() => {
        const fetchCoinData = async () => {
            const result = await axios.get('http://localhost:4000/coins');
            setCoin(result.data);
        };
        fetchCoinData()
        // const intervalId = setInterval(fetchCoinData, 20000);
        // return () => clearInterval(intervalId);
    }, []);

    const newCoin = Object.entries(coin)
    const date = new Date()
    const newDate = date.getTime()

    return (
        <div className={styles.container}>
            {newCoin.map(([coinName, coinData]) => (
                <div key={coinName}>
                    <ChartInfo date={newDate} valor={coinData.BRL} crypto={coinName}/>
                </div>
            ))}
        </div>
    )
}
