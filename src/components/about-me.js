import useSWR from 'swr'
import Image from 'next/image'
import styles from '../styles/aboutme.module.css'
import { Commontitle } from './commonTitle'
import { motion } from 'framer-motion'
import { Link, animateScroll as scroll } from "react-scroll";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Aboutme({ modeToggler }) {
    const { data, error } = useSWR('/api/portfolio', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    const imageAnimation = {
        offscreen: { opacity: 0, y: 100 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
              type: "scale",
                bounce: 0.9,
                duration: 2,
                delay: 0.3,
            },
        },
    }
    const mainHeadingAnimation = {
      offscreen: { opacity: 0,x: -100 },
      onscreen: {
          x: 0,
          opacity: 1,
      },
  }
  const buttonAnimation = {
    offscreen: { opacity: 0, y: 100 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
              type: "bounce",
                bounce: 0.9,
                duration: 0.3,
                delay: 0.2,
            },
        },
  }
    return (
        <motion.div initial={'offscreen'} whileInView={'onscreen'} viewport={{ once: true, amount: 0.3 }} className="row justify-content-sm-center justify-content-lg-between" > <motion.div variants={imageAnimation} className={`col-sm-6 col-lg-5 d-flex ${styles.imgColLeft}`} > <Image src={data.AboutMe.img1} width={357} alt="My Image" height={441} className={`img-fluid ${styles.imges}`} /> </motion.div> <motion.div transition={{ staggerChildren: 0.5 }} className="col-md-12 col-lg-7 text-start"> <div className={styles.titleRow}> <Commontitle mainHeadingAnimation={mainHeadingAnimation} title={data.AboutMe.titleMain} modeToggler={modeToggler} icon={data.skills.arrowimg} /> <motion.h3 transition={{ bounce: 0.9, duration: 0.4, delay: 0.3, }} variants={mainHeadingAnimation} className={`${modeToggler ? '' : styles.darkMode} ${ styles.mainHeadingAboutme }`} > {data.AboutMe.titleSecondary} </motion.h3> <motion.p transition={{ bounce: 0.9, duration: 0.4, delay: 0.4, }} variants={mainHeadingAnimation} className={`${modeToggler ? '' : styles.darkMode} ${ styles.aboutMeDecription }`} > {data.AboutMe.description} </motion.p> </div> <div className={`d-flex ${styles.buttonRow}`}> <motion.div variants={buttonAnimation} className={`text-center ${ modeToggler ? '' : styles.darkModeBtnMain } ${styles.btns}`} > <Link to ="Contact" spy={true} smooth={true} offset={-70} duration={400} className={`text-decoration-none d-block ${ modeToggler ? '' : styles.darkModeBtn } ${styles.links}`} > {data.AboutMe.contactBtn} </Link> </motion.div> <motion.div variants={buttonAnimation} className={`text-center ${ modeToggler ? '' : styles.darkModeBtnMain } ${styles.btns}`} > <Link spy={true} smooth={true} offset={-70} duration={400} to="Portfolio" className={`text-decoration-none d-block ${ modeToggler ? '' : styles.darkModeBtn } ${styles.links}`} > {data.AboutMe.portfolioBtn} </Link> </motion.div> </div> </motion.div > </motion.div>
    )
}
