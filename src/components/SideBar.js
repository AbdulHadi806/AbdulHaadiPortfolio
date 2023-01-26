import React from 'react'
import styles from '../styles/Navigation.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { faGithub, faLinkedin, faSkype, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faHouse, faAddressCard, faBell, faFile, faMessage } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function SideBar() {
  const navigation = [{
    link: "Home",
    icon: faHouse
  },
  {
    link: "About",
    icon: faAddressCard
  },
  {
    link: "Services",
    icon: faBell
  },
  {
    link: "Portfolio",
    icon: faFile
  },
  {
    link: "Contact Me",
    icon: faMessage
  }
  ]
  const socialMediaRow = [{
    icon: faGithub,
    link: "https://github.com/AbdulHadi806",
  },
  {
    icon: faLinkedin,
    link: "linkedin.com/in/abdul-hadi-kamran-a03a5124b"
  },
  {
    icon: faSkype,
    link: "https://join.skype.com/invite/w4gMPkxmGojb"
  }, {
    icon: faFacebook,
    link:"none"
  }]
  return (
    <div className={`justify-content-between d-flex flex-column ${styles.container}`}>
      <div className={`position-absolute ${styles.bg_img}`}></div>
      <div className={styles.sideBar_inner}>
        <div className={`d-flex text-center flex-column  ${styles.sideBar_top}`}>
          <div className={`position-relative ${styles.sideBar_logo}`}>
            <a href="#">
              <Image
                src="/images/profile-logo.png"
                alt="Abdul Hadi"
                width={110}
                height={110}>
              </Image>
            </a>
          </div>
          <h2 className={`text-uppercase position-relative ${styles.sideBarTopTitle}`}>Abdul Hadi</h2>
        </div>
      </div>
      <nav style={{ "width": "244px" }}>
        <ul className='px-0'>
          {navigation && navigation.map(item => {
            return <li key={Math.random()} className={styles.navigationList}><Link href={"/" + item.link} className={`text-uppercase ${styles.Links}`}>
              <FontAwesomeIcon icon={item.icon} className={styles.iconsSetting} /> {item.link}</Link></li>

          })}
        </ul>
      </nav>
      <div className={styles.socialMediaRow}>
        <ul className="d-flex justify-content-center text-center flex-wrap px-0">

          {socialMediaRow.map(item => {
            return <li key={Math.random()}><a href={item.link} className={styles.Links} target={"_blank"}><FontAwesomeIcon icon={item.icon} className={styles.iconsSetting} /></a></li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default SideBar