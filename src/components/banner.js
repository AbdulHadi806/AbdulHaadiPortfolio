import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/banner.module.css'

function Banner() {
  return (
        <div className={`row text-start ${styles.reverseDirectionMobile}`}>
            <div className={`col-md-6  ${styles.leftSide}`}>
                <h1 className={styles.helloIAm}>Hello, I am <span className={styles.myName}>Abdul Hadi</span></h1>
                <h3 className={`text-capitalize`}>I Am a Passionate Developer</h3>
                <p className={` ${styles.aboutMe}`}>
                I design and develop services for customers of all sizes, specializing in creating stylish, modern websites,
                 web services and online stores.
                </p>
                  <div className={` ${styles.goPortfolio}`}>
                  <Link className={`text-decoration-none ` + styles.linkBut} href={"#Portfolio"} style={{color:"#fff"}}>Go to PortFolio</Link>
                  </div>
            </div>
            <div className="col-md-6">
                <div className={`text-center ${styles.mainImage}`}>
                    <Image src="/images/hello-img.png"
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