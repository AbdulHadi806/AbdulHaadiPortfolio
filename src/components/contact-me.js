import React, { useEffect, useState } from 'react'
import styles from '../styles/contactme.module.css'
import useSWR from 'swr'
import Commontitle from './commonTitle'
import Link from 'next/link'
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sendContactForm } from 'lib/api'

const initValues = { name: '', email: '', subject: '', message: '' }
const initState = { values: initValues }
const fetcher = (url) => fetch(url).then((res) => res.json())

function Contactme() {
    const [state, setState] = useState(initState)
    const [success, setSuccess] = useState( false)
    const [failed, setFailed] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [toggle, setToggle] = useState(false)
    const { values } = state
    const toggleHandler = (e)=> {
        setToggle((prevCheck) => !prevCheck)
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
        setState((prev) => ({
            ...prev,
            isLoading: true,
        }))
        try {
            setLoading(true)
            if(values.name.length == 0 || values.email.length == 0 || values.subject.length == 0 || values.message.length == 0){
                return setFailed("Something is missing or invalid format")
            }
            const characters = values.email.slice(-4);
             if(characters !== ".com"){
              return setFailed("Incorrect Email Format. Common...")
            }
            await sendContactForm(values)
            setState(initState)
            setSuccess(true)
        } catch (error) {
            setSuccess(false)
        }
        setLoading(false)
    }
    const { data, Error } = useSWR('/api/portfolio', fetcher)
    if (Error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <div>
            <Commontitle
                title={data.ContactMe.ContactMeTitle}
                icon={data.skills.arrowimg}
            />
            <div className="row">
                <div className="col-lg-5 text-start">
                    <div className={`${styles.RightBox}`}>
                        <h4>
                            {data.ContactMe.ContactRightBox.ContactBoxIntro}
                        </h4>
                        <p style={{ color: '#555555' }}>
                            {data.ContactMe.ContactRightBox.ContactBoxDesc}
                        </p>
                        <span className="d-flex fw-bold h5">
                            <FontAwesomeIcon
                                style={{ color: 'green', paddingRight: '7px' }}
                                icon={faLocationDot}
                            />
                            {data.ContactMe.ContactRightBox.location}
                        </span>
                        <span>
                            <FontAwesomeIcon
                                style={{ color: 'green', paddingRight: '7px' }}
                                icon={faEnvelope}
                            />
                            <Link
                                className={
                                    'text-decoration-none fw-bold ' +
                                    styles.Email
                                }
                                href={
                                    'mailto:' +
                                    data.ContactMe.ContactRightBox.Email
                                }
                            >
                                {data.ContactMe.ContactRightBox.Email}
                            </Link>
                        </span>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className={styles.forms}>
                        <label className="fw-bold">Message me directly</label>
                        <form className={styles.forms}>
                            <div className="row">
                                {success ? (
                                    <div
                                        class={ toggle? styles.closeAlert : "alert alert-success alert-dismissible fade show"}
                                        data-bs-dismiss="alert"
                                        role="alert"
                                    >
                                        <strong>Success!</strong>{' '}
                                        Thank you for sending your
                                        Information. We will reply you within 24
                                        hours.
                                        <button onClick={toggleHandler} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                    
                                ) : ""}
                                {failed ? (
                                    <div
                                        class={toggle? styles.closeAlert : "alert alert-danger alert-dismissible fade show"}
                                        data-bs-dismiss="alert"
                                        role="alert"
                                    >
                                        <strong>Error!</strong>{' '}
                                        {failed}
                                    </div>
                                ) : ""}
                                <div className="col-lg-6">
                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="form4Example1"
                                            className="form-control"
                                            name="name"
                                            placeholder="Name *"
                                            onChange={handleChange}
                                            value={values.name}
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="form4Example2"
                                            name="email"
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Email *"
                                            value={values.email}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-outline mb-4">
                                    <input
                                        type="subject"
                                        id="form4Example2"
                                        name="subject"
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="subject *"
                                        value={values.subject}
                                    />
                                </div>
                            </div>
                            <div className="form-outline mb-4">
                                <textarea
                                    className={
                                        'form-control ' + styles.textarea
                                    }
                                    id="form4Example3"
                                    onChange={handleChange}
                                    value={values.message}
                                    name="message"
                                    placeholder="Enter Your Message *"
                                    rows="4"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault()
                                    onSubmit()
                                }}
                                className={styles.linkBut}
                                href={'#Portfolio'}
                                isLoading={isLoading}
                                disabled={
                                    isLoading == true
                                }
                                style={{
                                    color: '#fff',
                                    textDecoration: 'none',
                                }}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contactme
