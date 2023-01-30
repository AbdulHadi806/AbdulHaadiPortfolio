import React from 'react'
import Image from 'next/image'
import styles from "../styles/common.module.css"

function Commontitle({title, icon}) {
  return (
    <h2 
        className={`text-uppercase text-start ${styles.commonTile}`}
      >
        {title}
        <span className="d-flex" style={{ marginLeft: '-7px' }}>
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

export default Commontitle