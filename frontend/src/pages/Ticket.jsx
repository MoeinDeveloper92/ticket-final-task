import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getNotes, createNote, reset as notesReset } from '../features/notes/notesSlice'
import NoteItem from '../components/NoteItem'
import Modal from "react-modal"
import { motion } from "framer-motion"



import { FaPlus } from "react-icons/fa"
const customStyle = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%,-50%)',
        position: 'relative'
    }
}

Modal.setAppElement("#root")

const Ticket = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState("")

    const { isLoading, isSuccess, isError, message, ticket } = useSelector((state) => state.ticket)
    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.note)

    const params = useParams()
    const { ticketId } = params

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [isError, message, dispatch, ticketId])

    const handleClick = () => {
        //Close Ticket
        dispatch(closeTicket(ticketId))
        toast.success("Ticket has been closed!")
        navigate("/tickets")
    }
    //open/clsoe Modal
    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const handleNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({ noteText, ticketId }))
        closeModal()
        setNoteText("")
    }
    if (isLoading || notesIsLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h3>Something went wrong!!!!</h3>
    }

    return (
        <div className='ticket-page'>
            <header className="ticket_header">
                <BackButton url={"/tickets"} />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleDateString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of issu</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            {ticket.status !== "closed" && (
                <button className='btn ' onClick={openModal}>
                    <FaPlus />
                    Add Note</button>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyle}
                contentLabel='Add Note'
            >
                <h2>Add Note </h2>
                <button onClick={closeModal} className='btn btn-close'>X</button>
                <form onSubmit={handleNoteSubmit}>
                    <div className="form-group">
                        <textarea
                            name="noteText "
                            className='form-control'
                            placeholder='Note Text'
                            id="noteText"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        >

                        </textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type='submit'>
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>
            {notes.map((note) => (
                <NoteItem
                    key={note._id}
                    note={note}
                />
            ))}
            {ticket.status !== 'closed' && (
                <button onClick={handleClick} className='btn btn-block btn-danger '>Close Ticket</button>
            )}
        </div>
    )
}

export default Ticket