import React from 'react'
import useSWR from 'swr'
import styles from '../styles/portfolio.module.css'
import Image from 'next/image'
import Commontitle from './commonTitle'

const fetcher = (url) => fetch(url).then((res) => res.json())
function Portfolio() {
  const { data, error } = useSWR('/api/portfolio', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div>
      <Commontitle title={data.Portfolio.title} className="text-start" icon ={data.skills.arrowimg}/>
      <div className={`${styles.row} ${styles.portfolioContent}`}>
        {data.Portfolio.images.map((items) => {
          return (
            <div key={Math.random()} className={styles.item}>
            <div className={styles.well}> 
            <Image className={` img-thumbnail ${styles.zoom}`} src={items.src} width={items.width} height={items.height} alt="PortFolio Images" />
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Portfolio
