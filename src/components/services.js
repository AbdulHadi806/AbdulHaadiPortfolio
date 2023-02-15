import React from 'react'
import useSWR from 'swr'
import styles from '../styles/services.module.css'
import {Commontitle} from './commonTitle'
import { motion, Variants } from 'framer-motion'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Services({modeToggler}) {
  const { data, error } = useSWR('/api/portfolio', fetcher)
  const popUpAnimation = {
    offscreen:{ opacity: 0, scale: 1 },
    onscreen: { opacity: 1, scale: 1 },
    transition:{
      duration: 0.7,
      delay: 0.1,
      ease: [0, 0.71, 0.2, 1.01]
    }
  }
  const mainHeadingAnimation = {
    offscreen: { opacity: 0,x: -100 },
    onscreen: {
        x: 0,
        opacity: 1,
    },
}
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <motion.div initial={'offscreen'}
    whileInView={'onscreen'}
    viewport={{ once: false, amount: 0.3 }}
    transition={{ staggerChildren: 0.5 }}>
      <Commontitle initial={'offscreen'}
              whileInView={'onscreen'}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ staggerChildren: 0.5 }} mainHeadingAnimation={mainHeadingAnimation} title={data.WhatIDoTitle} modeToggler={modeToggler} className="text-start" icon ={data.skills.arrowimg}/>
      <div className="whatIDoInner">
        <div  className="row">
          {data.WhatIDo.map((items) => {
            return (
              <motion.div variants={popUpAnimation}  key={Math.random()} className="col-6 col-sm-4 col-xl-3">
                <div  className={`${modeToggler? "" : styles.darkMode} ${styles.skillBox}`}>
                  <h4
                    className={styles.whatIdoType}
                  >
                    {items}
                  </h4>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default Services
