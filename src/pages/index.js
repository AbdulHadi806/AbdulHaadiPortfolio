import { Inter } from '@next/font/google'
import SideBar from '@/components/SideBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/index.module.css'
import Banner from '@/components/banner'
import Aboutme from '@/components/about-me'
import Skillsrow from '@/components/skillsRow'
import Services from '@/components/services'
import Portfolio from '@/components/portfolio'
import Contactme from '@/components/contact-me'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <div className="row">
                <div className={'col-md-2 g-0 ' + styles.sideBarOuter}>
                    <SideBar />
                </div>
                <div
                    className={`col-lg-10 text-center offset-lg-3 position-relative ${styles.helloSectionOuter}`}
                >
                    <div className="row">
                        <div id="Home" className="col-sm-10">
                            <Banner />
                        </div>
                        <div
                            id="About"
                            className={`col-lg-10 ${styles.aboutme}`}
                        >
                            <Aboutme />
                        </div>
                        <div className={styles.separation}></div>
                        <div id="Skills"
                            className="col-lg-10"
                            style={{ padding: '40px 0 52px 0' }}
                        >
                            <Skillsrow />
                        </div>
                        <div className={styles.separation}></div>
                        <div id='Services' className="col-lg-10">
                            <Services />
                        </div>
                        <div className={styles.separation}></div>
                        <div id='Portfolio' className="col-lg-10">
                            <Portfolio />
                        </div>
                        <div className={styles.separation}></div>
                        <div id='Contact' className="col-lg-10">
                            <Contactme />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
