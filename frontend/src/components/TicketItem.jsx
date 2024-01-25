import React from 'react'
import { Link } from "react-router-dom"


const TicketItem = ({ ticket }) => {
    return (
        <div className='ticket'>
            <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
            <div>{ticket.product}</div>
            <div className={`status status-${ticket.status}`}>
                {ticket.status}
            </div>
            <Link className='btn btn-reverse btn-sm' to={`/ticket/${ticket._id}`}>
                View Ticket
            </Link>
        </div>
    )
}

export default TicketItem