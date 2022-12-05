import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login({saveUserData}) {
    const navigate = useNavigate()
    const [user, setUser] = useState({
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
    }
    async function sendApiData() {
        let { data } = await axios.post('https://sticky-note-fe.vercel.app/signin', user);
        setisLoading(false)
        if (data.message === 'success') {
            localStorage.setItem('userToken',data.token);
            saveUserData()
            navigate('/')
        }
        else {
            setapiMessage(data.message)
        }
    }
    function submitForm(e) {
        e.preventDefault();
        setisLoading(true)
        const schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().required()
            // .pattern(/^\w{8,}$/)
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
                <div className="text-center p-5">
                        <img className='w-25' src={require('../../images/logo.png')} alt="" />
                        <h4>Log in to GameOver</h4>
                        <form className='my-4' onSubmit={submitForm}>
                            <div className="mb-4">
                                <input onChange={getUSerData} name='email' id='email' type="text" placeholder='Email Address' className='form-control' />
                                <small className='text-danger error-form'>{joiErrors.filter((err) => err.context.label === 'email')[0]?.message}</small>
                            </div>
                            <div className="mb-4"><input onChange={getUSerData} name='password' id='password' type="password" placeholder='Password' className='form-control' />
                                <small className='text-danger error-form'>{joiErrors.filter((err) => err.context.label === 'password')[0]?'Invalid Password : must be at least 8 characters':null}</small></div>
                            <button className='btn text-white p-2 w-100'>{isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}</button>
                        </form>
                        <hr />
                        <h6>Not a member yet? <Link to={'/register'}>Create Account<i className="fas fa-chevron-right small"></i></Link></h6>
                    </div>
                </div>
            </div>
        </div>
    </>
}
