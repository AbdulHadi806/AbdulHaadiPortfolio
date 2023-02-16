import React from 'react'
import useSWR from 'swr'
import styles from '../styles/portfolio.module.css'
import Image from 'next/image'
import { Commontitle } from './commonTitle'
import { useState } from 'react'
import { motion } from 'framer-motion'

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
    const itemVariants = {
        open: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
      };
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
        <motion.div initial={'offscreen'} whileInView={'onscreen'} viewport={{ once: true, amount: 0.1 }} transition={{ staggerChildren: 0.1 }} > <Commontitle mainHeadingAnimation={mainHeadingAnimation} modeToggler={modeToggler} title={data.Portfolio.title} className="text-start" icon={data.skills.arrowimg} /> {isOpen ? ( <div className={`${styles.row} ${styles.portfolioContent}`}> {data.Portfolio.images.map((items) => { return ( <motion.div animate={itemVariants} key={Math.random()} className={styles.item}> <div className={styles.well}> <button style={{ border: 'transparent', width: '100%', background: 'transparent', }} onClick={(e) => { e.preventDefault(); openHander(items) }} > <Image priority={true} className={`${ modeToggler ? 'img-thumbnail' : styles.backgroundNone } ${styles.zoom}`} src={items.src} width={items.width} height={items.height} alt="PortFolio Images" /> </button> </div> </motion.div> ) })} </div> ) : ( <> <button className="position-relative" style={{ border: 'transparent', backgroundColor: 'transparent', }} onClick={closeHander} > <Image priority={true} width={700} height={700} className={styles.fullscreenImg} src={fullImage && fullImage.src} alt="portfolio-fullscreen" /> <span className={styles.animatedOverlayTxt}>Close</span> </button> </> )} </motion.div>
    )
}

export default Portfolio
