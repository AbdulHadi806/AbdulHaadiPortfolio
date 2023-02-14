import React from 'react'
import Image from 'next/image'
import styles from "../styles/common.module.css"

export  const  Commontitle = ({title, icon,modeToggler}) => {
  return (
    <h2 
        className={`text-uppercase text-start ${modeToggler? styles.brightMode: styles.darkMode} ${styles.commonTile}`}
      >
        {title}
        <span className={ modeToggler? "d-flex": "d-none"} style={{ marginLeft: '-7px' } }>
          <Image
            src={icon}
            width={80}
            height={16}
            alt="arrow"
          />
        </span>
      </h2>
  )
}
export const Experince = ({Width}) => {
  return (
    <div className="progress">
    <div
        className="progress-bar progress-bar-striped progress-bar-animated bg-success"
        role="progressbar"
        style={{ width: Width }}
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
    ></div>
</div>
  )
}
