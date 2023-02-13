import React, { useState } from 'react'
import styles from '../styles/contactme.module.css'
import useSWR from 'swr'
import {Commontitle} from './commonTitle'
import Link from 'next/link'
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sendContactForm } from 'lib/api'
import { Alertbox1, Alertbox2 } from './alertbox'

const initValues = { name: '', email: '', subject: '', message: '' }
const initState = { values: initValues }
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Contactme() {
    const [state, setState] = useState(initState)
    const [success, setSuccess] = useState(false)
    const [isloading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [toggle, setToggle] = useState(true)

    const { values } = state

    const closeHandler = () => {
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
        <div>
            <Commontitle
                title={data.ContactMe.ContactMeTitle}
                icon={data.skills.arrowimg}
            />
            <div className="row">
                <div className="col-lg-6 col-xl-5 text-start">
                    <div className={`${styles.RightBox}`}>
                        <h4 style={{whiteSpace: 'pre-line'}}>
                            {data.ContactMe.ContactRightBox.ContactBoxIntro}
                        </h4>
                        <p style={{ color: '#555555' }}>
                            {data.ContactMe.ContactRightBox.ContactBoxDesc}
                        </p>
                        <span className="d-flex h5">
                            <FontAwesomeIcon
                                style={{ color: 'green', paddingRight: '7px' }}
                                icon={faLocationDot}
                            />
                            {data.ContactMe.ContactRightBox.location}
                        </span>
                        <span className="d-flex h5  align-items-center">
                            <FontAwesomeIcon
                                style={{ color: 'green', paddingRight: '7px' }}
                                icon={faEnvelope}
                            />
                            <Link
                                className={
                                    'text-decoration-none  ' +
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
                <div className="col-lg-6 col-xl-7">
                    <div className={`d-flex justify-content-center ${styles.forms}`}>
                        <label className="fw-bold" style={{fontSize: "20px"}}>Get In Touch With Me Directly</label>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                onSubmit()
                            }}
                            className={styles.forms}
                        >
                            <div className="row">
                                {success ? (
                                    <Alertbox1
                                        message={message}
                                        toggle={toggle}
                                        toggleHandler={closeHandler}
                                    />
                                ) : (
                                    ''
                                )}
                                {error ? (
                                    <Alertbox2
                                        message={message}
                                        toggle={toggle}
                                        toggleHandler={closeHandler}
                                    />
                                ) : (
                                    ''
                                )}
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
                                            autoComplete="off"
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
                                            value={values && values.email}
                                            autoComplete="off"
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
                                        value={values && values.subject}
                                        autoComplete="off"
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
                                    value={values && values.message}
                                    name="message"
                                    placeholder="Enter Your Message *"
                                    rows="4"
                                    autoComplete="off"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                style={
                                    isloading == false
                                        ? { backgroundColor: '#2fbf71' }
                                        : {
                                              backgroundColor:
                                                  'rgb(47, 162, 91)',
                                          }
                                }
                                className={styles.linkBut}
                                href={'#Portfolio'}
                                isloading={isloading}
                                disabled={isloading}
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
