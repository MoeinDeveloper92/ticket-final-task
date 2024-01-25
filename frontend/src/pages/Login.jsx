import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from "react-toastify"
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, reset } from '../features/auth/authSlice'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Spinner from '../components/Spinner'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            dispatch(reset())
            navigate("/")
        }

        dispatch(reset())
    }, [message, user, isSuccess, isError, message, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }

        dispatch(loginUser(userData))

    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <motion.div
            initial="hidden"
            whileInView={"visible"}
            transition={{
                duration: 0.5
            }}
            variants={{
                hidden: {
                    opacity: 0,
                    x: -100
                },
                visible: {
                    x: 0,
                    opacity: 1
                }
            }}
        >
            <section className='heading'>
                <h1>
                    <FaSignInAlt />
                    Login
                </h1>
                <p>Pleas Login Into Account and create Submit your Ticket!</p>
            </section>
            <section className='form'>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input
                            type="email"
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            id='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter your Password'
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <button
                            className='btn btn-block'
                            type='submit'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </motion.div>
    )
}

export default Login