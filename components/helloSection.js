import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../src/styles/helloSection.module.css'

function HelloSection() {
  return (
    <div className={styles.container}>
        <div className="row">
            <div className={`col-lg-6 ${styles.leftSide}`}>
                <h1 className={styles.helloIAm}>Hello, I am <span className={styles.myName}>Abdul Hadi</span></h1>
                <h3 className={`text-capitalize`}>I Am Passionate Developer</h3>
                <p className={styles.aboutMe}>
                I design and develop services for customers of all sizes, specializing in creating stylish, modern websites,
                 web services and online stores.
                </p>
                  <div className={styles.goPortfolio}>
                  <Link className={styles.linkBut} href={"/PortFolio"} style={{color:"#fff", textDecoration:"none"}}>Go to PortFolio</Link>
                  </div>
            </div>
            <div className="col-lg-6">
                <div>
                    <Image src="/images/profile-logo.png"
              alt="Abdul Hadi"
              width={444}
              height={444}></Image>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HelloSection