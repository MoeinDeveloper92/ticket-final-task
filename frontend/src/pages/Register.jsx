import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from "react-redux"
import { registerUser, reset } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom"
const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password1: ""
    })
    const { name, email, password, password1 } = formData
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        if (isError) {
            //if there is an error from server we show a toast message to the user
            //this message is set in the Redux, and we grab it from Redux
            toast.error(message)
        }
        //Redirect to logged in
        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate, dispatch])


    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== password1) {
            toast.error("Passwords do not match.")
        } else {
            //bundle the userdata in one object and send to the authSlice for further processing
            const userData = {
                name,
                email,
                password
            }
            dispatch(registerUser(userData))
        }

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
                    x: 100
                },
                visible: {
                    opacity: 1,
                    x: 0
                }
            }}
        >
            <section className='heading'>
                <h1>
                    <FaUser />
                    Register
                </h1>
                <p>Please Create An Account</p>
            </section>
            <section className='form'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className='form-control'
                            id='name'
                            value={name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <input
                            type="password"
                            className='form-control'
                            id='password1'
                            value={password1}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <button
                            className='btn btn-block'
                            type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </motion.div>
    )
}

export default Register