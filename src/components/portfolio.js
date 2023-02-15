import React from 'react'
import useSWR from 'swr'
import styles from '../styles/portfolio.module.css'
import Image from 'next/image'
import { Commontitle } from './commonTitle'
import { useState } from 'react'
import { motion, Variants } from 'framer-motion'

;('use client')
const fetcher = (url) => fetch(url).then((res) => res.json())
function Portfolio({ modeToggler }) {
    const [isOpen, setOpen] = useState(true)
    const [fullImage, setFullImage] = useState()
    const mainHeadingAnimation = {
        offscreen: { opacity: 0, x: -100 },
        onscreen: {
            x: 0,
            opacity: 1,
        },
    }
    const popUpAnimation = {
      offscreen:{ opacity: 0, y:50 },
      onscreen: { opacity: 1, y:0 },
      transition:{
        ease: [0, 0.71, 0.2, 1.01]
      }
    }
    const openHander = (items) => {
        setFullImage(items)
        setOpen(false)
    }
    const closeHander = () => {
        setFullImage()
        setOpen(true)
    }
    const { data, error } = useSWR('/api/portfolio', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <motion.div
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
        >
            <Commontitle
                mainHeadingAnimation={mainHeadingAnimation}
                modeToggler={modeToggler}
                title={data.Portfolio.title}
                className="text-start"
                icon={data.skills.arrowimg}
            />
            {isOpen ? (
                <div className={`${styles.row} ${styles.portfolioContent}`}>
                    {data.Portfolio.images.map((items) => {
                        return (
                            <motion.div variants={popUpAnimation} key={Math.random()} className={styles.item}>
                                <div className={styles.well}>
                                    <button
                                        style={{
                                            border: 'transparent',
                                            width: '100%',
                                            background: 'transparent',
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            openHander(items)
                                        }}
                                    >
                                        <Image
                                            className={`${
                                                modeToggler
                                                    ? 'img-thumbnail'
                                                    : styles.backgroundNone
                                            } ${styles.zoom}`}
                                            src={items.src}
                                            width={items.width}
                                            height={items.height}
                                            alt="PortFolio Images"
                                        />
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            ) : (
                <>
                    <button
                        className="position-relative"
                        style={{
                            border: 'transparent',
                            backgroundColor: 'transparent',
                        }}
                        onClick={closeHander}
                    >
                        <Image
                            width={700}
                            height={700}
                            className={styles.fullscreenImg}
                            src={fullImage && fullImage.src}
                            alt="portfolio-fullscreen"
                        />
                        <span className={styles.animatedOverlayTxt}>Close</span>
                    </button>
                </>
            )}
        </motion.div>
    )
}

export default Portfolio
