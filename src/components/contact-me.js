import React, { useState } from 'react'
import styles from '../styles/contactme.module.css'
import useSWR from 'swr'
import {Commontitle} from './commonTitle'
import Link from 'next/link'
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sendContactForm } from 'lib/api'
import { Alertbox1, Alertbox2 } from './alertbox'
import ClipLoader from 'react-spinners/ClipLoader'
import { motion } from 'framer-motion'
('use client')

const initValues = { name: '', email: '', subject: '', message: '' }
const initState = { values: initValues }
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Contactme({modeToggler}) {
    const[state,setState]=useState(initState),[success,setSuccess]=useState(!1),[isloading,setIsLoading]=useState(!1),[message,setMessage]=useState(""),[error,setError]=useState(!1),[toggle,setToggle]=useState(!0),rightFormAnimation={offscreen:{opacity:0,x:-250},onscreen:{opacity:1,x:0,transition:{type:"spring",bounce:.4,duration:.8,delay:.9}}},leftFormAnimation={offscreen:{opacity:0,x:250},onscreen:{opacity:1,x:0,transition:{type:"spring",bounce:.4,duration:.4,delay:.3}}},contactAnimation={offscreen:{opacity:0},onscreen:{opacity:1,transition:{type:"ease",bounce:.4,duration:.4,delay:.3}}};
    const { values } = state

    const closeHandler = ({modeToggler}) => {
        setToggle(true)
        setSuccess(false)
        setError(false)
    }
    const handleChange = ({ target }) =>
        setState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [target.name]: target.value,
            },
        }))

    const onSubmit = async () => {
        if (
            values.name.length == 0 ||
            values.email.length == 0 ||
            values.subject.length == 0 ||
            values.message.length == 0
        ) {
            setMessage('Something is missing or invalid format')
            setError(true)
            setToggle(false)
            return
        }
        setIsLoading(true)
        try {
            setIsLoading(true)
            setSuccess(true)
            setMessage(
                'We will reply to you through your email within 24 hours.'
            )
            await sendContactForm(values)
            setState(initState)
            setToggle(false)
            setSuccess(true)
        } catch (error) {
            setMessage('Something went wrong please try again.')
            setError(true)
            setToggle(false)
            setSuccess(false)
        }

        setIsLoading(false)
    }

    const { data, Error } = useSWR('/api/portfolio', fetcher)
    if (Error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <motion.div initial={'offscreen'} whileInView={'onscreen'} viewport={{ once: false, amount: 0.3 }}>
            <Commontitle title={data.ContactMe.ContactMeTitle} icon={data.skills.arrowimg} modeToggler={modeToggler} />
            <div className="row">
                <motion.div contactAnimation={contactAnimation} variants={rightFormAnimation} className="col-lg-6 col-xl-5 text-start">
                <div style={{borderRadius: "11px"}} className={`${modeToggler? "" : styles.darkMode} ${styles.RightBox}`}> <h4 style={{whiteSpace: 'pre-line'}}> {data.ContactMe.ContactRightBox.ContactBoxIntro} </h4> <p className={modeToggler? "" : styles.darkMode} style={{ color: '#555555',padding: "10px 0 5px 0" }}> {data.ContactMe.ContactRightBox.ContactBoxDesc} </p> <span className="d-flex" style={{fontSize: "16px" ,whiteSpace: "pre", lineHeight:"26px", fontWeight:400}}> <FontAwesomeIcon style={{ color: 'green', paddingRight: '7px',marginTop: "5px"}} icon={faLocationDot} /> {data.ContactMe.ContactRightBox.location} </span> <span className="d-flex align-items-center"> <FontAwesomeIcon style={{ color: 'green', paddingRight: '7px',marginTop: "5px", fontSize: "14px" }} icon={faEnvelope} /> <Link className={` text-decoration-none ${styles.Email} ${modeToggler? "" : styles.darkMode}` } href={ 'mailto:' + data.ContactMe.ContactRightBox.Email } > {data.ContactMe.ContactRightBox.Email} </Link> </span> </div>
                </motion.div>
                <motion.div contactAnimation={contactAnimation} variants={leftFormAnimation} className="col-lg-6 col-xl-7"> <div className={`d-flex justify-content-center ${modeToggler? "" : styles.darkMode} ${styles.formsMain}`}> <label className={`fw-bold ${modeToggler? "" : styles.darkMode}`} style={{fontSize: "20px"}}>Get In Touch With Me Directly</label> <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className={`${modeToggler? "" : styles.darkMode} ${styles.forms}`} > <div className="row"> {success ? ( <Alertbox1 message={message} toggle={toggle} toggleHandler={closeHandler} /> ) : ( '' )} {error ? ( <Alertbox2 message={message} toggle={toggle} toggleHandler={closeHandler} /> ) : ( '' )} <div className="col-lg-6" > <div className="form-outline mb-2"> <input type="text" id="form4Example1" className={`form-control ${modeToggler? "" : styles.InputDarkMode}`} name="name" placeholder="Name *" onChange={handleChange} value={values.name} autoComplete="off" /> </div> </div> <div className={`col-lg-6 ${styles.paddAjust} `} > <div className="form-outline mb-2"> <input type="email" id="form4Example2" name="email" onChange={handleChange} className={`form-control ${modeToggler? "" : styles.InputDarkMode}`} placeholder="Email *" value={values && values.email} autoComplete="off" /> </div> </div> </div> <div className="col-lg-12"> <div className="form-outline mb-2"> <input type="subject" id="form4Example2" name="subject" onChange={handleChange} className={`form-control ${modeToggler? "" : styles.InputDarkMode}`} placeholder="subject *" value={values && values.subject} autoComplete="off" /> </div> </div> <div className="form-outline mb-4"> <textarea className={ `form-control ${styles.textarea} ${modeToggler? "" : styles.InputDarkMode}` } id="form4Example3" onChange={handleChange} value={values && values.message} name="message" placeholder="Enter Your Message *" rows="4" autoComplete="off" ></textarea> </div><button type="submit" style={ isloading == false ? { backgroundColor: '#2fbf71' } : { backgroundColor: 'rgb(47, 162, 91)', } } className={styles.linkBut} href={'#Portfolio'} isloading={isloading} disabled={isloading} > {isloading ? <ClipLoader color={'#fff'} size={20} aria-label="Loading Spinner" data-testid="loader" />: "Send"} </button> </form> </div> </motion.div>
            </div>
        </motion.div>
    )
}
