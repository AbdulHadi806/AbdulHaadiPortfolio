import React, { useState, useEffect } from 'react'
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
import BeatLoader from "react-spinners/BeatLoader";

('use client')
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [toggler, setToggeler] = useState(false)
    const [loading, setLoading] = useState(true)
    const setToggelerChangeHandler = () => {
        setToggeler((prevCheck) => !prevCheck)
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])
    return (
        <div className={loading ? styles.mainApp : ""}>{loading ? <BeatLoader
            color={"#000"}
            loading={loading}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> : <><div
            className={`${toggler == false ? styles.bgColor : ''}  ${styles.headerResponsive
                } d-flex position-fixed justify-content-between container-fluid`}
        >
            <a
                href="#"
                className={`text-decoration-none text-uppercase fw-bold ${styles.responsiveLogo}`}
            >
                Abdul Hadi
            </a>
            <button
                onClick={setToggelerChangeHandler}
                className={`display-none position-relative ${styles.navigationButton}`}
            >
                <span></span>
                <span className={styles.navToggle2}></span>
                <span className={styles.navToggle3}></span>
            </button>
        </div>
            <div className="row justify-content-center">
                <div
                    className={`g-0 col-8 col-sm-5 col-md-4 col-lg-3  col-xl-2 col-xxl-2 position-fixed ${toggler ? styles.sideBarOuter : styles.responsiveNav
                        }`}
                >
                    <SideBar />
                </div>
                <div
                    className={`col-sm-12 col-xl-10 text-center container offset-xl-3  ${styles.helloSectionOuter}`}
                >
                    <div className={styles.container}>
                        <div className={`row ${styles.mainRowHead}`}>
                            <div id="Home" className="col-md-12 col-lg-10">
                                <Banner />
                            </div>
                            <div
                                id="About"
                                className={`col-md-12 col-lg-10 ${styles.aboutme}`}
                            >
                                <Aboutme />
                            </div>
                            <div className={styles.separation}></div>
                            <div
                                id="Skills"
                                className="col-md-12 col-lg-10"
                                style={{ padding: '40px 0 52px 0' }}
                            >
                                <Skillsrow />
                            </div>
                            <div className={styles.separation}></div>
                            <div
                                id="Services"
                                className="col-md-12 col-lg-10"
                                style={{ paddingTop: '50px' }}
                            >
                                <Services />
                            </div>
                            <div className={styles.separation}></div>
                            <div id="Portfolio" className="col-md-12 col-lg-10">
                                <Portfolio />
                            </div>
                            <div className={styles.separation}></div>
                            <div id="Contact" className="col-md-12 col-lg-10">
                                <Contactme />
                            </div>
                        </div>
                    </div>
                </div>
            </div> </>}

        </div>
    )
}
