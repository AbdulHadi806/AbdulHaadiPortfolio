import React from 'react'
import useSWR from 'swr'
import styles from '../styles/skillsrow.module.css'
import Image from 'next/image'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Skillsrow = () => {
  const { data, error } = useSWR('/api/portfolio', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={`text-start ${styles.skillsRow}`}>
      <h2
        className="fw-normal"
        style={{ color: '#0b0b13', fontSize: '46px', letterSpacing: '7px' }}
      >
        {data.skills.heading}{' '}
        <span style={{ marginLeft: '-7px', display: 'block' }}>
          <Image
            src={data.skills.arrowimg}
            width={80}
            height={16}
            alt="arrow"
          />
        </span>
      </h2>
      <p style={{ color: '#555555', paddingTop: '15px' }}>
        {data.skills.description}
      </p>
      <div className={styles.skillsInner} style={{maxWidth: "1344px"}}>
        {data.skills.expertise.map((item) => {
          return (
            <div style={{ paddingTop: '15px' }} key={Math.random()}>
              <h4
                style={{ fontSize: '17px', color: '#0b0b13', fontWeight: 400 }}
              >
                {item.skill}
              </h4>
              <div class="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                  role="progressbar" animated
                  style={{ width: item.experince }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Skillsrow
