import React, { useState } from 'react'
import { Inter } from '@next/font/google'
import SideBar from '@/components/SideBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/index.module.css'
import Banner from '@/components/banner'
import Aboutme from '@/components/about-me'
import Skillsrow from '@/components/skillsRow'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import Contactme from '@/components/contact-me'
import ClipLoader from 'react-spinners/ClipLoader'
import useSWR from 'swr'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Separation from '@/components/commonTitle'
import { motion, Variants } from 'framer-motion'
('use client')

const inter = Inter({ subsets: ['latin'] })
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {
    const[toggler,setToggeler]=useState(!1),[modeToggler,setModeToggler]=useState(!0),[clickCss,setClickCss]=useState(!1),setToggelerChangeHandler=()=>{setToggeler(e=>!e)},modeChangerHander=()=>{setModeToggler(!modeToggler)},clickCssHandler=()=>{setClickCss(!clickCss)};
    const { data, error } = useSWR('/api/portfolio', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data)
        return (
            <div className={styles.mainApp}> <ClipLoader color={'#000'} size={80} aria-label="Loading Spinner" data-testid="loader" />{' '} </div>
        )
    return (
        <div className={modeToggler ? '' : styles.darkMode}>
            {' '}
            <div onClick={modeChangerHander} style={{cursor: "pointer"}}><FontAwesomeIcon icon={faMoon} className={`position-fixed ${ modeToggler ? styles.modeChangerLight : styles.modeChangerDark } ${styles.bounce}`} /></div>
            <div className={`${ toggler == false && modeToggler ? styles.bgColor : styles.bgLight } ${ styles.headerResponsive } d-flex position-fixed justify-content-between container-fluid`} > <a href="#" className={`text-decoration-none text-uppercase fw-bold ${styles.responsiveLogo}`} > Abdul Hadi </a> <button onClick={(e) => { clickCssHandler(e); setToggelerChangeHandler() }} className={`display-none position-relative ${styles.navigationButton}`} > <span></span> <span className={`${styles.navToggle2} ${ clickCss ? styles.clicked : '' }`} ></span> <span className={styles.navToggle3}></span> </button> </div>
            <div className="row justify-content-center">
                <div initial={false}
                    className={`g-0 col-8 col-sm-5 col-md-4 col-lg-3  col-xl-2 col-xxl-2 position-fixed ${
                        modeToggler ? '' : styles.sideBarBgChanger 
                    } ${toggler ? styles.sideBarOuter : styles.responsiveNav}`}
                >
                    <SideBar modeToggler={modeToggler} />
                </div>
                <div className={`col-sm-12 col-xl-10 text-center container offset-xl-3 ${styles.helloSectionOuter}`} > <div className={styles.container}> <div className={`row ${styles.mainRowHead}`}> <div id="Home" className="col-md-12 col-lg-10"> <Banner modeToggler={modeToggler} /> </div> <div id="About" className={`col-md-12 col-lg-10 ${styles.aboutme}`} > <Aboutme modeToggler={modeToggler} /> </div> <Separation style={{margin: "93px 0 19px 0"}} stylesDefault={styles.separation} separationDarkMode={styles.separationDarkMode} modeToggler={modeToggler}/> <div id="Skills" className="col-md-12 col-lg-10" style={{ padding: '40px 0 52px 0' }} > <Skillsrow modeToggler={modeToggler} /> </div> <Separation stylesDefault={styles.separation} separationDarkMode={styles.separationDarkMode} modeToggler={modeToggler}/> <div id="Services" className="col-md-12 col-lg-10" > <Services modeToggler={modeToggler} /> </div> <Separation stylesDefault={styles.separation} separationDarkMode={styles.separationDarkMode} modeToggler={modeToggler}/> <div id="Portfolio" className="col-md-12 col-lg-10"> <Portfolio modeToggler={modeToggler} /> </div> <Separation stylesDefault={styles.separation} separationDarkMode={styles.separationDarkMode} modeToggler={modeToggler}/> <div id="Contact" className="col-md-12 col-lg-10"> <Contactme modeToggler={modeToggler} /> </div> <Separation style={{margin: "93px 0 19px 0 !important"}} stylesDefault={styles.separation} separationDarkMode={styles.separationDarkMode} modeToggler={modeToggler}/> <div className="col-md-12 col-lg-10"> <p style={modeToggler? {color:"#000",fontSize: "12px"}: {color:"#fff",fontSize: "12px"}}> © 2023. All rights reserved by Abdul Hadi. </p> </div> </div> </div> </div>
            </div>
        </div>
    )
}
