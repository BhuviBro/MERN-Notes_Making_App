import React from 'react'
import { PenSquareIcon, Trash, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../Libs/utils'
import api from '../Libs/axios.js'
import { toast } from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault();//To prevent from navigating to NoteDetailPage

        if (!window.confirm("Are you sure want to delete this Note")) return;
        try {
            await api.delete(`/notes/${id}`)
            setNotes((prev) => prev.filter(note => note._id !== id))//Get rid of delete one from array
            toast.success("Note successfully Deleted")
        } catch (error) {
            console.log("Error in Deleting Note");
            toast.error("Failed to delete Note")

        }


    }
    return <>
        <Link to={`/note/${note._id}`}
            className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#41a780]'>
            <div className='card-body'>
                <h3 className='card-title text-base-content' >{note.title}</h3>
                <p className='text-base-content/70 line-clmap-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-small text-base-content/60'>
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className='flex items-center  gap-1'>
                        <PenSquareIcon className='size-4' />
                        <button onClick={(e) => handleDelete(e, note._id)} className="btn btn-ghost btn-xs text-error">
                            <Trash2Icon className="size-4" />
                        </button>

                    </div>
                </div>
            </div>
        </Link>
    </>


}

export default NoteCard
