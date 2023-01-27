import React, { useState } from 'react'
import styles from '../styles/contactme.module.css'
import useSWR from 'swr'
import Commontitle from './commonTitle'
import Link from 'next/link'
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

;('use client')
const fetcher = (url) => fetch(url).then((res) => res.json())

const initialState = {
    name: '',
    email: '',
    message: '',
}
function Contactme() {
    const [formData, setFormData] = useState({name: '',
    email: '',
    message: '',})
    const [contactInfo, setContactInfo] = useState({})
    const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleInput = (e) => {
        e.preventDefault();
        setContactInfo({name:formData.name, email:formData.email,message:formData.message })
        console.log(contactInfo)
      }
    const { data, error } = useSWR('/api/portfolio', fetcher)
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
    return (
        <div>
            <Commontitle
                title={data.ContactMe.ContactMeTitle}
                icon={data.skills.arrowimg}
            />
            <div className="row">
                <div className="col-lg-4 text-start">
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
                <div className="col-lg-8">
                    <div className={styles.forms}>
                        <label className="fw-bold">Message me directly</label>
                        <form className={styles.forms}>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div class="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="form4Example1"
                                            class="form-control"
                                            name='name'
                                            onChange={handleInputChange}
                                            value={formData.name}
                                            placeholder="Name *"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div class="form-outline mb-4">
                                        <input
                                             type="email"
                                             id="form4Example1"
                                             class="form-control"
                                             name='email'
                                             onChange={handleInputChange}
                                             value={formData.email}
                                             placeholder="Name *"
                                             required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="form-outline mb-4">
                                <textarea
                                    class={'form-control ' + styles.textarea}
                                    id="form4Example3"
                                    onChange={handleInputChange}
                                    message="message"
                                    value={formData.message}
                                    rows="4"
                                    type="text"
                                    placeholder="Your Message *"
                                    required
                                ></textarea>
                            </div>

                            <button
                                onClick={handleInput}
                                type="submit"
                                className={styles.linkBut}
                                href={'#Portfolio'}
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
