import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import styles from '../styles/banner.module.css'
import TextTransition, { presets } from 'react-text-transition'
import AOS from 'aos';
import 'aos/dist/aos.css';

const fetcher = (url) => fetch(url).then((res) => res.json())

function Banner({ modeToggler }) {
    const { data, error } = useSWR('/api/portfolio', fetcher)
    const [index, setIndex] = useState(0)
    const [reloader, setReloader] = useState(1)
    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            2500
        )
        return () => clearTimeout(intervalId)
    }, [])
    useEffect(() => {
        AOS.init({duration : 1500,disable: window.innerWidth < 1024});
      }, [reloader])
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <div  className={`row text-start ${styles.reverseDirectionMobile}`}>
            <div data-aos="fade-up" className={`col-md-6  ${styles.leftSide}`}>
                <h1
                    className={`${modeToggler ? '' : styles.darkMode} ${
                        styles.helloIAm
                    }`}
                >
                    {data.Banner.titleMain}{' '}
                    <span
                        className={`${modeToggler ? '' : styles.darkMode} ${
                            styles.myName
                        }`}
                    >
                        {data.Banner.titleSecondary}
                    </span>
                </h1>
                <h3
                    className={`d-flex ${modeToggler ? '' : styles.darkMode}`}
                    style={{ gap: '12px', flexWrap: 'wrap' }}
                >
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
                <p
                    className={`${modeToggler ? '' : styles.darkMode} ${
                        styles.aboutMe
                    }`}
                >
                    {data.Banner.MyDescription}
                </p>
                <div
                    className={` ${
                        modeToggler ? styles.goPortfolio : styles.darkModeBtn
                    } `}
                >
                    <Link 
                        className={`text-decoration-none ${
                            modeToggler ? '' : styles.darkModeBtn
                        } ${styles.linkBut}`}
                        href={'#Portfolio'}
                        style={{ color: '#fff' }}
                    >
                        {data.Banner.ButtonPortFolio}
                    </Link>
                </div>
            </div>
            <div data-aos="fade-down" className="col-md-6">
                <div className={`text-center position-relative ${styles.mainImage}`}>
                    <Image
                        priority={true}
                        src={data.Banner.MyImage}
                        alt="My Avatar"
                        width={500}
                        height={500}
                        className={`img-fluid position-relative ${styles.myMainImage}`}
                        style={{ borderRadius: '40%' }}
                    ></Image>
                    <label data-aos-duration="2000" data-aos="fade-right"
                        className={`text-capitalize d-block ${
                            modeToggler ? '' : styles.darkMode
                        }`}
                        style={{ fontWeight: 600, fontSize: '19px', marginTop: "3px" }}
                    >
                        My Avatar
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Banner
