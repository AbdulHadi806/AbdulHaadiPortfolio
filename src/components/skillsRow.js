import React from 'react'
import useSWR from 'swr'
import styles from '../styles/skillsrow.module.css'
import {Commontitle, Experince } from './commonTitle'
import { motion } from 'framer-motion'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Skillsrow = ({modeToggler}) => {
    const { data, error } = useSWR('/api/portfolio', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    const mainHeadingAnimation = {
        offscreen: { opacity: 0,x: -100 },
        onscreen: {
            x: 0,
            opacity: 1,
        },
    }
    const pAnimation = {
        offscreen: { opacity: 0,y: 100 },
        onscreen: {
            y: 0,
            opacity: 1,
        },
    }
    const skillsAnimation = {
        offscreen: { opacity: 0},
        onscreen: { opacity:1},
        transition: { delay: 0.2,duration:0.4}
    }
    return (
        <motion.div initial={'offscreen'} whileInView={'onscreen'} viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.3 }} className={`text-start ${styles.skillsRow}`}> <Commontitle mainHeadingAnimation={mainHeadingAnimation} title={data.skills.heading + '.'} icon={data.skills.arrowimg} modeToggler={modeToggler} /> <motion.p transition={{ delay: 0.5,}} variants={pAnimation} className={`${modeToggler? "" : styles.darkMode}`} style={{ color: '#555555' }}> {data.skills.description} </motion.p> <motion.div variants={skillsAnimation} className={styles.skillsInner}> {data.skills.expertise.map((item) => { return ( <div style={{ paddingTop: '15px' }} key={Math.random()}> <h4 className={modeToggler? "" : styles.darkMode} style={{ fontSize: '17px', color: '#0b0b13', fontWeight: 600, letterSpacing: "1px" }} > {item.skill} </h4> <Experince Width = {item.experince} /> </div> ) })} </motion.div> </motion.div>
    )
}

export default Skillsrow
