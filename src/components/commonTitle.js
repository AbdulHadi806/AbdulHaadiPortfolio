import React from 'react'
import Image from 'next/image'
import styles from "../styles/common.module.css"
import { motion } from 'framer-motion'

export  const  Commontitle = ({title, icon,modeToggler,mainHeadingAnimation}) => {
  return (
    <motion.h2 transition={{ bounce: 0.9, duration: 0.4, delay: 0.1, }} variants={mainHeadingAnimation} className={`text-uppercase text-start ${modeToggler? styles.brightMode: styles.darkMode} ${styles.commonTile}`} > {title} <span className={ modeToggler? "d-flex": "d-none"} style={{ marginLeft: '-7px' } }> <Image src={icon} width={80} height={16} alt="arrow" /> </span> </motion.h2>
  )
}
export const Experince = ({Width}) => {
  return (
    <div className="progress"> <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{ width: Width }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" ></div></div>
  )
}

export default function Separation({separationDarkMode,stylesDefault,modeToggler}) {
  return (
    <div className={`${modeToggler ? "": separationDarkMode} ${stylesDefault} `}></div>
  )
}
