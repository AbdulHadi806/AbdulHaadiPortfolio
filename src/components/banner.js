import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import React from 'react'
import styles from '../styles/banner.module.css'
const fetcher = (url) => fetch(url).then((res) => res.json())

function Banner() {
  const { data, error } = useSWR('/api/portfolio', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
        <div className={`row text-start ${styles.reverseDirectionMobile}`}>
            <div className={`col-md-6  ${styles.leftSide}`}>
                <h1 className={styles.helloIAm}>{data.Banner.titleMain} <span className={styles.myName}>{data.Banner.titleSecondarytitleSecondary}</span></h1>
                <h3 className={`text-capitalize`}>{data.Banner.TitleIAm}</h3>
                <p className={` ${styles.aboutMe}`}>
                {data.Banner.MyDescription}
                </p>
                  <div className={` ${styles.goPortfolio}`}>
                  <Link className={`text-decoration-none ` + styles.linkBut} href={"#Portfolio"} style={{color:"#fff"}}>{data.Banner.ButtonPortFolio}</Link>
                  </div>
            </div>
            <div className="col-md-6">
                <div className={`text-center ${styles.mainImage}`}>
                    <Image priority  src={data.Banner.MyImage}
              alt="Abdul Hadi"
              width={500}
              height={500}
              className={`img-fluid ${styles.myMainImage}`}
              style={{borderRadius:"50%"}}></Image>
                </div>
            </div>
        </div>
  )
}

export default Banner