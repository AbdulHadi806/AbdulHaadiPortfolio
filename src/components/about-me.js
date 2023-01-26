import useSWR from 'swr'
import Image from 'next/image'
import styles from '../styles/aboutme.module.css'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Aboutme() {
  const { data, error } = useSWR('/api/portfolio', fetcher)
  console.log(data)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className="row">
      <div className="col-md-6 col-lg-5">
        <div className="row">
          <div className={`col-lg-5 ${styles.imgColLeft}`}>
            <Image
              src={data.AboutMe.img1}
              width={270}
              height={300}
              className={`img-fluid ${styles.imges}`}
            />
            <Image
              src={data.AboutMe.img1}
              width={270}
              height={300}
              className={`img-fluid ${styles.imges}`}
            />
          </div>
          <div className={`col-lg-5`}>
            <Image
              src={data.AboutMe.img1}
              width={270}
              height={300}
              className={`img-fluid ${styles.imges}`}
            />
            <Image
              src={data.AboutMe.img1}
              width={270}
              height={300}
              className={`img-fluid ${styles.imges}`}
            />
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-7 text-start">
        <div className={styles.titleRow}>
          <h2 className='fw-normal' style={{color: '#0b0b13', fontSize: '46px', letterSpacing: "7px"}}>
            {data.AboutMe.titleMain}{' '}
            <span style={{ marginLeft: '-7px', display: 'block' }}>
              <Image src={data.AboutMe.arrowimg} width={56} height={16} />
            </span>
          </h2>
          <h3 style={{ fontSize: '24px', fontWeight: '600' }}>
            {data.AboutMe.titleSecondary}
          </h3>
          <p className={styles.aboutMeDecription}>{data.AboutMe.description}</p>
        </div>
        <div className={`d-flex ${styles.buttonRow}`}>
          <div className={`${styles.btns}`}>
            <Link href="#" className={`text-decoration-none ${styles.links}`}>
              {data.AboutMe.contactBtn}
            </Link>
          </div>
          <div className={`${styles.btns}`}>
            <Link href="#" className={`text-decoration-none ${styles.links}`}>
              {data.AboutMe.portfolioBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
