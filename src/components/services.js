import React,{useState} from 'react'
import useSWR from 'swr'
import styles from '../styles/services.module.css'
import Image from 'next/image'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Services() {
  const { data, error } = useSWR('/api/portfolio', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div>
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
        What I do?{' '}
        <span className='d-flex' style={{ marginLeft: '-7px'}}>
          <Image
            src={data.skills.arrowimg}
            width={80}
            height={16}
            alt="arrow"
          />
        </span>
      </h2>
      <div className="whatIDoInner">
        <div className="row">
          {data.WhatIDo.map((items) => {
            return (
              <div key={Math.random()} className="col-sm-4">
                <div className={styles.skillBox}>
                  <h4
                    className={styles.whatIdoType}
                  >
                    {items}
                  </h4>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Services
