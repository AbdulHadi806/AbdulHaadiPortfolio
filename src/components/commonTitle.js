import React from 'react'
import Image from 'next/image'

function Commontitle({title, icon}) {
  return (
    <h2
        className="text-uppercase"
        style={{
          textAlign: 'left',
          paddingBottom: '30px',
          letterSpacing: '7px',
          fontSize: '46px',
          fontWeight: 400,
          color: '#0b0b13',
        }}
      >
        {title}{' '}
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