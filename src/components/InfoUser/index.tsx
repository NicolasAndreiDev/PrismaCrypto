import { useContext, useEffect, useState } from 'react'
import ChartInfo from '../Chart'
import styles from './InfoUser.module.scss'
import axios from 'axios';
import { UserContext } from '@/providers/userProvider';

type Coin = {
    [key: string]: {
        BRL: number;
    }
}

export default function InfoUser() {
    const { user } = useContext(UserContext)
    const [coins, setCoins] = useState<Coin>({})
    const [fav, setFav] = useState<Array<{}>>([])

    useEffect(() => {
        const fetchCoinData = async () => {
            const resultCoin = await axios.get(`http://localhost:4000/users/favcoins/${user?.id}`);
            const result = await axios.get('http://localhost:4000/coins');
            const newList = resultCoin.data.map((item: { coin: string }) => item.coin)
            setCoins(result.data);
            setFav(newList);
        };
        fetchCoinData()
        const intervalId = setInterval(fetchCoinData, 20000);
        return () => clearInterval(intervalId);
    }, [user]);

    const newCoin = Object.entries(coins)
    const date = new Date()
    const newDate = date.getTime()

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Suas moedas favoritas</h2>
            <div className={styles.layout}>
                {newCoin.map(([coinName, coinData]) => {
                    return (
                        <>
                            {fav.includes(coinName) ? <ChartInfo key={coinName} date={newDate} valor={coinData.BRL} crypto={coinName} /> : ''}
                        </>
                    )
                })}
            </div>
        </div>
    )
}