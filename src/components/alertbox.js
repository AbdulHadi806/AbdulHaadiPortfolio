import React from 'react'
// resuable alert box
export const Alertbox1 = ({ toggleHandler, toggle, message }) => {
    return (
        <div
            className={toggle ? "d-none" : "alert alert-success alert-dismissible fade show"}
            data-bs-dismiss="alert"
            role="alert"
        >
            <strong>Message sent</strong>{' '}
            {message}
            <button onClick={toggleHandler} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
export const Alertbox2 = ({ toggleHandler, message, toggle }) => {
    return (
        <div
            className={toggle ? "d-none" : "alert alert-danger alert-dismissible fade show"}
            data-bs-dismiss="alert"
            role="alert"
        >
            <strong>Opps!</strong>{' '}
            {message}
            <button onClick={toggleHandler} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
