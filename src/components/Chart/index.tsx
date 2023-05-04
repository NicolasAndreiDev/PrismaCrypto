import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Chart.module.scss'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  date: number,
  valor: number,
  crypto: string
}

function ChartInfo({ date, valor, crypto }: Props) {
  const [data, setData] = useState<Array<{ [0]: number, [1]: number }>>([]);

  useEffect(() => {
    async function fetched() {
      const historico = await axios.get(`http://localhost:4000/coins/historico/${crypto}`);
      const array = historico.data
      const corr = array.map((item: any) => [item[0], item[1]]);
      setData(corr)
    }
    fetched();
  }, []);

  useEffect(() => {
    setData(prev => [...prev, [date, valor]])
  }, [date, valor, crypto])


  const options = {
    chart: {
      toolbar: false
    },
    series: [{
      name: crypto,
      data: data
    }],
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value: any) {
          const Hours = `${new Date(value).getHours().toString().padStart(2, '0')}`
          const Minute = `${new Date(value).getMinutes().toString().padStart(2, '0')}`
          const Seconds = `${new Date(value).getSeconds().toString().padStart(2, '0')}`
          return `${Hours}:${Minute}:${Seconds}`
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return `R$ ${value.toFixed(2)}`
        }
      }
    },
    colors: ['#410CD9'],
    tooltip: {
      y: {
        formatter: function (value: any) {
          return `R$ ${value}`
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.coin}>
        <img src={`/${crypto}.png`} className={styles.image}/>
        <h2>{crypto}</h2>
      </div>
      {/* @ts-ignore */}
      <Chart options={options} series={options.series} type={"line"} className={styles.grafico}/>
    </div>
  );
}

export default ChartInfo;
