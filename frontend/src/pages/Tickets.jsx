import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTicekts, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

const Tickets = () => {
    const { tickets, isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTicekts())

        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }

    }, [dispatch, isSuccess])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={"/"} />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Products</div>
                    <div>Status</div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem
                        key={ticket._id}
                        ticket={ticket}
                    />
                ))}
            </div>
        </>
    )
}

export default Tickets