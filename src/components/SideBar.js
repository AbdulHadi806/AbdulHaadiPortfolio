import React from 'react'
import styles from '../styles/sideBar.module.css'
import Image from 'next/image'
import {
  faGithub,
  faLinkedin,
  faSkype,
  faSquareInstagram
} from '@fortawesome/free-brands-svg-icons'
import {
  faHouse,
  faAddressCard,
  faBell,
  faFile,
  faMessage,
  faAtom,
} from '@fortawesome/free-solid-svg-icons'
import { Link, animateScroll as scroll } from "react-scroll";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SideBar({ modeToggler }) {
  const navigation = [
    {
      text: 'Home',
      link: 'Home',
      icon: faHouse,
    },
    {
      text: 'About',
      link: 'About',
      icon: faAddressCard,
    },
    {
      text: "Skills",
      link: "Skills",
      icon: faAtom
    },
    {
      text: 'Services',
      link: 'Services',
      icon: faBell,
    },
    {
      text: 'Portfolio',
      link: 'Portfolio',
      icon: faFile,
    },
    {
      text: 'Contact Me',
      link: 'Contact',
      icon: faMessage,
    },
  ]
  const socialMediaRow = [
    {
      icon: faGithub,
      link: 'https://github.com/AbdulHadi806',
    },
    {
      icon: faLinkedin,
      link: 'https://www.linkedin.com/in/abdul-hadi-kamran-a03a5124b',
    },
    {
      icon: faSkype,
      link: 'https://join.skype.com/invite/w4gMPkxmGojb',
    },
    {
      icon: faSquareInstagram,
      link: "https://www.instagram.com/abdulhadi.806/"
    }
  ] 
  return (
    <div
      className={`justify-content-between sidenav-menu d-flex flex-column ${styles.container}`}
    >
      <div className={`position-absolute ${styles.bg_img}`}></div>
      <div className={styles.sideBar_inner}>
        <div
          className={`d-flex text-center flex-column  ${styles.sideBar_top}`}
        >
          <div className={`position-relative ${styles.sideBar_logo}`}>
            <Link to="Home"  spy={true} style={{cursor: "pointer"}}
                    smooth={true}
                    offset={-70}
                    duration={500}>
              <Image
                src="/images/profile-logo.png"
                alt="Abdul Hadi"
                width={110}
                height={110}
              ></Image>
            </Link>
          </div>
          <h2
            className={`text-uppercase position-relative ${modeToggler ? "" : styles.darkMode} ${styles.sideBarTopTitle}`}
          >
            Abdul Hadi
          </h2>
        </div>
      </div>
      <nav style={{ width: '100%' }}>
        <ul className="px-0">
          {navigation &&
            navigation.map((item) => {
              return (
                <li key={Math.random()} className={`position-relative ${styles.navigationList}`}>
                  <Link activeClass={modeToggler? styles.activeLight: styles.activeDark}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    style={{cursor: "pointer"}}
                    to={item.link}
                    className={`text-capatalize d-inline-block w-100 h-100 ${modeToggler ? styles.LinksAfterEffect : styles.darkModeLinks} 
                    ${styles.Links}`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={styles.iconsSetting + styles.iconsSettingNav}
                      style={{ opacity: 0.8, paddingRight: "3px" }}
                    />{' '}
                    {item.text}
                  </Link>
                </li>
              )
            })}
        </ul>
      </nav>
      <div className={styles.socialMediaRow}>
        <ul className="d-flex justify-content-center text-center flex-wrap px-0">
          {socialMediaRow.map((item) => {
            return (
              <li key={Math.random()}>
                <a
                  href={item.link}
                  className={`${modeToggler ? "" : styles.darkMode} ${styles.Links}`}
                  rel="noreferrer"
                  target={'_blank'}
                >
                  <FontAwesomeIcon
                    style={{ fontSize: "20px" }}
                    icon={item.icon}
                    className={styles.iconsSetting}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
