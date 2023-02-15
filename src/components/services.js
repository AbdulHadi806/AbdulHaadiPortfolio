import React from 'react'
import useSWR from 'swr'
import styles from '../styles/services.module.css'
import {Commontitle} from './commonTitle'

const fetcher = (url) => fetch(url).then((res) => res.json())

function Services({modeToggler}) {
  const { data, error } = useSWR('/api/portfolio', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div>
      <Commontitle  title={data.WhatIDoTitle} modeToggler={modeToggler} className="text-start" icon ={data.skills.arrowimg}/>
      <div className="whatIDoInner">
        <div className="row">
          {data.WhatIDo.map((items) => {
            return (
              <div key={Math.random()} className="col-6 col-sm-4 col-xl-3">
                <div className={`${modeToggler? "" : styles.darkMode} ${styles.skillBox}`}>
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
