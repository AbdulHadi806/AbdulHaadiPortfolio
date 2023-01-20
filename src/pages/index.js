import { Inter } from '@next/font/google'
import SideBar from 'components/SideBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../styles/index.module.css"
import HelloSection from 'components/helloSection';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='row'>
        <div  className={"col-lg-2 g-0 " + styles.sideBarOuter}>
        <SideBar/>
        </div>
        <div className={`col-lg-10 offset-lg-3 ${styles.helloSectionOuter}`}>
          <HelloSection />
        </div>
      </div>
    </>
  )
}
