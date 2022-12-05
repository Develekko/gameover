import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'

export default function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: ''
    })
    const [joiErrors, setJoiErrors] = useState([]);
    const [apiMessage, setapiMessage] = useState('');
    const [isLoading, setisLoading] = useState(false)

    function getUSerData(e) {
        let User = { ...user };
        User[e.target.id] = e.target.value;
        setUser(User);
        $(e.target).next().html('')
    }
    async function sendApiData() {
        let { data } = await axios.post('https://sticky-note-fe.vercel.app/signup', user);
        setisLoading(false)
        if (data.message === 'success') {
            navigate('/login')
        }
        else {
            setapiMessage(data.message)
        }
    }
    function submitForm(e) {
        e.preventDefault();
        setisLoading(true)
        const schema = Joi.object({
            first_name: Joi.string().min(3).max(20).required(),
            last_name: Joi.string().min(3).max(20).required(),
            age: Joi.number().min(16).max(80).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().required().pattern(/^\w{8,}$/),
        })
        const joiResponse = schema.validate(user, { abortEarly: false })
        if (joiResponse.error) {
            setJoiErrors(joiResponse.error.details)
            setisLoading(false)
        }
        else {
            sendApiData()
        }
    }
    return <>

        {apiMessage.length > 0 ? <div className="toast animate__animated animate__fadeInDown notification" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-body text-center notf-border position-relative ">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {apiMessage}
            </div>
        </div> : null}
        <div className="container">
            <div className="row">
                <div className="col-lg-6 d-none d-lg-block register-login-banner"></div>
                <div className="col-lg-6 form-body">
                    <div className="text-center py-5 px-2">
                        <h4>Create My Account!</h4>
                        <form className='my-4' onSubmit={submitForm}>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <input onChange={getUSerData} name='first_name' id='first_name' type="text" placeholder='First Name' className='form-control ' />
                                    <small className='text-danger error-form'>{joiErrors.filter((err) => err.context.label === 'first_name')[0]?.message}</small>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <input onChange={getUSerData} name='last_name' id='last_name' type="text" placeholder='Last Name' className='form-control' />
                                    <small className='text-danger error-form'>{joiErrors.filter((err) => err.context.label === 'last_name')[0]?.message}</small>
                                </div>
                            </div>
                            <div className="mb-4">
                                <input onChange={getUSerData} name='email' id='email' type="text" placeholder='Email Address' className='form-control' />
                                <small className='text-danger error-form'>{joiErrors.filter((err) => err.context.label === 'email')[0]?.message}</small>
                            </div>
                            <div className="mb-4">
                                <input onChange={getUSerData} name='age' id='age' type="text" placeholder='age' className='form-control ' />
                                <small className='text-danger error-form'>{joiErrors.filter((err) => err.context.label === 'age')[0]?.message}</small>
                            </div>
                            <div className="mb-4">
                                <input onChange={getUSerData} name='password' id='password' type="password" placeholder='Password' className='form-control' />
                                <small className='text-danger error-form'>{joiErrors.filter((err) => err.context.label === 'password')[0] ? 'Invalid Password : must be at least 8 characters' : null}</small>
                            </div>
                            <button className='btn text-white p-2 w-100'>{isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Create Account'}</button>
                        </form>
                        <p className='text-muted small'>This site is protected by reCAPTCHA and the Google <a className='text-muted text-decoration-underline' target={'_blank'} rel='noreferrer' href="https://policies.google.com/privacy">Privacy Policy</a>  and <a className='text-muted text-decoration-underline' target={'_blank'} rel='noreferrer' href="https://policies.google.com/terms">Terms of Service</a> apply.</p>
                        <hr />
                        <h6>Already a member? <Link to={'/login'}>Log In<i className="fas fa-chevron-right small"></i></Link></h6>
                    </div>
                </div>
            </div>
        </div>
    </>
}