import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import NavBar from '../Components/NavBar'
import RateLimitedUi from '../Components/RateLimitedUi';
import NoteCard from '../Components/NoteCard';
import api from '../Libs/axios.js'
import { PlusIcon } from 'lucide-react';
import { Link } from "react-router"
import NoteNotFound from '../Components/NoteNotFound.jsx';


const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const res = await api.get("notes")
        setIsRateLimited(false);
        setNotes(res.data.notes);
        console.log("This is Notes after fetching", notes);
      } catch (error) {
        console.log('Error fetching data')
        console.log(error.response)
        if (error.response?.status === 429) {
          setIsRateLimited(true)
        }
        else {
          toast.error("Failed to load Notes")
        }
      }

      finally {
        setLoading(false);
      }
    }

    fetchNotes();

  }, [])

  return (
    <div className='min-h-screen'>
      <NavBar notes={notes} />
      {isRateLimited && <RateLimitedUi />}

      <div className='max-w-7xl mx-auto p-4 mt-6 '>
        {loading && <div className='text-center text-primary py-10'>Loading...</div>}
        {notes.length === 0 && !isRateLimited && !loading && (<NoteNotFound />)}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((item) =>
            (
              <NoteCard key={item._id} note={item} setNotes={setNotes} />
            )
            )}

          </div>
        )}
      </div>
    </div >
  )
}

export default HomePage
