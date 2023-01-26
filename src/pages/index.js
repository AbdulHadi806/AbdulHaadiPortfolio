import { Inter } from '@next/font/google'
import SideBar from '@/components/SideBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/index.module.css"
import HelloSection from '@/components/helloSection';
import Aboutme from '@/components/about-me';
import Skillsrow from '@/components/skillsRow';
import WhatIdo from '@/components/WhatIdo';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='row'>
        <div className={"col-md-2 g-0 " + styles.sideBarOuter}>
          <SideBar />
        </div>
        <div className={`col-lg-10 text-center offset-lg-3 position-relative ${styles.helloSectionOuter}`}>
          <div className="row">
            <div className="col-sm-10">
              <HelloSection />
            </div>
            <div className={`col-lg-10 ${styles.aboutme}`}>
              <Aboutme />
            </div>
            <div className={styles.separation}></div>
            <div className='col-lg-10' style={{padding: "40px 0 52px 0"}}><Skillsrow /></div>
            <div className={styles.separation}></div>
            <div className="col-lg-10">
              <WhatIdo />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
