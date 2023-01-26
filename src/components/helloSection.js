import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/helloSection.module.css'

function HelloSection() {
  return (
        <div className="row text-start">
            <div className={`col-md-12 col-lg-5 ${styles.leftSide}`}>
                <h1 className={styles.helloIAm}>Hello, I am <span className={styles.myName}>Abdul Hadi</span></h1>
                <h3 className={`text-capitalize`}>I Am a Passionate Developer</h3>
                <p className={` ${styles.aboutMe}`}>
                I design and develop services for customers of all sizes, specializing in creating stylish, modern websites,
                 web services and online stores.
                </p>
                  <div className={` ${styles.goPortfolio}`}>
                  <Link className={styles.linkBut} href={"/PortFolio"} style={{color:"#fff", textDecoration:"none"}}>Go to PortFolio</Link>
                  </div>
            </div>
            <div className="col-md-12 col-lg-7">
                <div className={`text-center ${styles.mainImage}`}>
                    <Image src="/images/hello-img.png"
              alt="Abdul Hadi"
              width={500}
              height={500}
              className="img-fluid"
              style={{borderRadius:"50%"}}></Image>
                </div>
            </div>
        </div>
  )
}

export default HelloSection