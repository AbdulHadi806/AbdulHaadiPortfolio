import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import styles from '../styles/banner.module.css'
import TextTransition, { presets } from 'react-text-transition'
import BeatLoader from "react-spinners/BeatLoader";

const fetcher = (url) => fetch(url).then((res) => res.json())
const TEXTS = ['Forest', 'Building', 'Tree', 'Color']
function Banner() {
    const { data, error } = useSWR('/api/portfolio', fetcher)

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            2100 
        )
        return () => clearTimeout(intervalId)
    }, [])
    if (error) return <div>Failed to load</div>
    if (!data) return <BeatLoader
        color={"#000"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
    />
    return (
        <div className={`row text-start ${styles.reverseDirectionMobile}`}>
            <div className={`col-md-6  ${styles.leftSide}`}>
                <h1 className={styles.helloIAm}>
                    {data.Banner.titleMain}{' '}
                    <span className={styles.myName}>
                        {data.Banner.titleSecondary}
                    </span>
                </h1>
                <h3 className={`text-capitalize d-flex`} style={{gap:"12px", flexWrap:"wrap"}}>
                    {data.Banner.TitleIAm}{' '}
                    <span className={styles.changeTextLoop}>
                        <TextTransition springConfig={presets.wobbly}>
                            {
                                data.Banner.UpdateTitleLoop[
                                    index % data.Banner.UpdateTitleLoop.length
                                ]
                            }
                        </TextTransition>
                    </span>
                </h3>
                <p className={` ${styles.aboutMe}`}>
                    {data.Banner.MyDescription}
                </p>
                <div className={` ${styles.goPortfolio}`}>
                    <Link
                        className={`text-decoration-none ` + styles.linkBut}
                        href={'#Portfolio'}
                        style={{ color: '#fff' }}
                    >
                        {data.Banner.ButtonPortFolio}
                    </Link>
                </div>
            </div>
            <div className="col-md-6">
                <div className={`text-center ${styles.mainImage}`}>
                    <Image
                        priority
                        src={data.Banner.MyImage}
                        alt="Abdul Hadi"
                        width={500}
                        height={500}
                        className={`img-fluid ${styles.myMainImage}`}
                        style={{ borderRadius: '50%' }}
                    ></Image>
                </div>
            </div>
        </div>
    )
}

export default Banner
