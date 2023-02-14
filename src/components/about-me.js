import useSWR from 'swr'
import Image from 'next/image'
import styles from '../styles/aboutme.module.css'
import Link from 'next/link'
import {Commontitle} from './commonTitle'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Aboutme({modeToggler}) {
  const { data, error } = useSWR('/api/portfolio', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className="row">
      <div className="col-md-12 col-lg-5">
        <div className="row">
          <div className={`col-md-12 col-lg-5 ${styles.imgColLeft}`}>
            <Image
              src={data.AboutMe.img1}
              width={270}
              alt="My Image"
              height={300}
              className={`img-fluid ${styles.imges}`}
            />
            <Image
              src={data.AboutMe.img1}
              width={270}
              alt="My Image"
              height={300}
              className={`img-fluid ${styles.imges}`}
            />
          </div>
          <div className={`col-lg-5`}>
            <Image
              src={data.AboutMe.img1}
              width={270}
              alt="My Image"
              height={300}
              className={`img-fluid ${styles.imges}`}
            />
            <Image
              src={data.AboutMe.img1}
              width={270}
              height={300}
              alt="My Image"
              className={`img-fluid ${styles.imges}`}
            />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-7 text-start">
        <div className={styles.titleRow}>
          <Commontitle title={data.AboutMe.titleMain} modeToggler={modeToggler} icon ={data.skills.arrowimg}/>
          <h3 className={`${modeToggler? "" : styles.darkMode} ${styles.mainHeadingAboutme}`}>
            {data.AboutMe.titleSecondary}
          </h3>
          <p className={`${modeToggler? "" : styles.darkMode} ${styles.aboutMeDecription}`}>{data.AboutMe.description}</p>
        </div>
        <div className={`d-flex ${styles.buttonRow}`}>
          <div className={`text-center ${styles.btns}`}>
            <Link href="#Contact" className={`text-decoration-none d-block ${modeToggler? "": styles.darkModeBtn} ${styles.links}`}>
              {data.AboutMe.contactBtn}
            </Link>
          </div>
          <div className={`text-center ${styles.btns}`}>
            <Link href="#Portfolio" className={`text-decoration-none d-block ${modeToggler? "": styles.darkModeBtn} ${styles.links}`}>
              {data.AboutMe.portfolioBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}