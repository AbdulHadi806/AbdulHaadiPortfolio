import Image from 'next/image'
import useSWR from 'swr'
import React, { useEffect, useState } from 'react'
import styles from '../styles/banner.module.css'
import TextTransition, { presets } from 'react-text-transition'
import { motion } from 'framer-motion'
import { Link, animateScroll as scroll } from "react-scroll";

const fetcher = (url) => fetch(url).then((res) => res.json())

function Banner({ modeToggler }) {
    const { data, error } = useSWR('/api/portfolio', fetcher)
    const [index, setIndex] = useState(0)
    const imageAnimate = {
        offscreen: { x: -100, opacity: 0 },
        onscreen: {
            x: 0,
            opacity: 1,
            rotate: [0, 10, 0],
            transition: { type: 'spring', bounce: 0.4, duration: 1 },
        },
    }
    const labelAnimation = {
        offscreen: { x: 100, opacity: 0 },
        onscreen: {
            x: 0,
            opacity: 1,
            rotate: [0, 10, 0],
            transition: { type: 'spring', bounce: 0.4, duration: 1 },
        },
    }
    const h1Animation = {
        offscreen: { y: -100, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', bounce: 0.4, duration: 1 },
        },
    }
    const h1SpanAnimation = {
        offscreen: { x: -100, opacity: 0 },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', bounce: 0.4, duration: 1,delay:0.3 },
        },
    }
    const h3Animation = {
        offscreen: { x: -100, opacity: 0 },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', bounce: 0.4, duration: 1,delay:0.5 },
        },
    }
    const pAnimation = {
        offscreen: { x: -100, opacity: 0 },
        onscreen: {
            x: 0,
            opacity: 1,
            transition: { type: 'spring', bounce: 0.4, duration: 1,delay:0.7 },
        },
    }
    const buttonAnimation = {
        offscreen: { y: 100, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', bounce: 0.4, duration: 1,delay:0.2 },
        },
    }
    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            2500
        )
        return () => clearTimeout(intervalId)
    }, [])

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <div className={`row text-start ${styles.reverseDirectionMobile}`}>
            <motion.div initial={'offscreen'}
                    whileInView={'onscreen'}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ staggerChildren: 0.5 }} className={`col-md-6  ${styles.leftSide}`}>
                <motion.h1
                    className={`${modeToggler ? '' : styles.darkMode} ${
                        styles.helloIAm
                    }`}
                    variants={h1Animation}
                >
                    {data.Banner.titleMain}{' '}
                    <motion.span
                        className={`${modeToggler ? '' : styles.darkMode} ${
                            styles.myName
                        }`}
                        variants={h1SpanAnimation}
                    >
                        {data.Banner.titleSecondary}
                    </motion.span>
                </motion.h1>
                <motion.h3
                variants={h3Animation}
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
                </motion.h3>
                <motion.p 
                variants={pAnimation}
                    className={`${modeToggler ? '' : styles.darkMode} ${
                        styles.aboutMe
                    }`}
                >
                    {data.Banner.MyDescription}
                </motion.p>
                <motion.div variants={buttonAnimation}
                    className={` ${
                        modeToggler ? styles.goPortfolio : styles.darkModeBtn
                    } `}
                >
                    <Link to="Portfolio"
                     spy={true}
                     smooth={true}
                     offset={-70}
                     duration={400}
                        className={`text-decoration-none ${
                            modeToggler ? '' : styles.darkModeBtn
                        } ${styles.linkBut}`}
                        href={'#Portfolio'}
                        style={{ color: '#fff' }}
                    >
                        {data.Banner.ButtonPortFolio}
                    </Link>
                </motion.div>
            </motion.div>
            <div className="col-md-6">
                <motion.div
                    initial={'offscreen'}
                    whileInView={'onscreen'}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{ staggerChildren: 0.5 }}
                    className={`text-center position-relative ${styles.mainImage}`}
                >
                    <motion.div
                        variants={imageAnimate}
                    >
                        <Image
                            priority={true}
                            src={data.Banner.MyImage}
                            alt="My Avatar"
                            width={500}
                            height={500}
                            className={`img-fluid position-relative ${styles.myMainImage}`}
                            style={{ borderRadius: '40%' }}
                        ></Image>
                    </motion.div>
                    <motion.label
                        className={`text-capitalize d-block ${
                            modeToggler ? '' : styles.darkMode
                        }`}
                        style={{
                            fontWeight: 600,
                            fontSize: '19px',
                            marginTop: '3px',
                        }}
                        variants={labelAnimation}
                    >
                        My Avatar
                    </motion.label>
                </motion.div>
            </div>
        </div>
    )
}

export default Banner
