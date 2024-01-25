import React from 'react'
import { Link } from "react-router-dom"
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa"
import { motion } from "framer-motion"
const Home = () => {
    return (
        <motion.div
            initial="hidden"
            whileInView={"visible"}
            transition={{
                duration: 0.5
            }}
            viewport={{
                once: true,
                amount: 0.5
            }}
            variants={{
                hidden: {
                    opacity: 0,
                    scale: 0.5
                },
                visible: {
                    opacity: 1,
                    scale: 1
                }
            }}
        >
            <section className='heading'>
                <h1>What Do you need help with?</h1>
                <p>Please Choose from an option below!</p>
            </section>
            <Link to={"/new-ticket"} className='btn btn-reverse btn-block'>
                <FaQuestionCircle />
                Create New Ticket
            </Link>
            <Link to={"/tickets"} className='btn btn-block'>
                <FaTicketAlt />
                View My Tickets
            </Link>
        </motion.div>
    )
}

export default Home