import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/authContext'
import TripCard from './TripCard'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import { db } from '../firebase'
import useFetchTodos from '../hooks/FetchTodos'

export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth()
  const [todo, setTodo] = useState('')

  const { todos, setTodos, loading, error } = useFetchTodos()

  async function handleAddTrip() {
    if (!todo) { return }
    const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
    setTodos({ ...todos, [newKey]: todo })
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      'todos': {
        [newKey]: todo
      }
    }, { merge: true })
    setTodo('')

  }

  function handleDelete(todoKey) {
    return async () => {
      const tempObj = { ...todos }
      delete tempObj[todoKey]

      setTodos(tempObj)
      const userRef = doc(db, 'users', currentUser.uid)
      await setDoc(userRef, {
        'todos': {
          [todoKey]: deleteField()
        }
      }, { merge: true })

    }
  }

  return (
    <div className='w-full max-w-[65ch] mx-auto flex flex-col gap-3 sm:gap-5
    text-xs sm:text-sm'>
      <div className="flex items-stretch">
        <input type="text" placeholder='Enter todo' value={todo}
          onChange={(e) => setTodo(e.target.value)} className="outline-none p-3 
      text-base sm:text-lg text-slate-900 flex-1"/>
        <button onClick={handleAddTrip} className='w-fit px-4 sm:px-6 py-2 sm:py-3 
      bg-black text-white font-medium text-base duration-300 
      hover:opacity-40'>
          ADD
        </button>
      </div>

      {(loading) && (<div className='flex-1 grid place-items-center '>
        <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
      </div>)}


      {(!loading) && (
        <>
          {Object.keys(todos).map((todo, i) => {
            return (
              <TripCard key={i} todoKey={todo} handleDelete={handleDelete}>
                {todos[todo]}
              </TripCard>
            )
          })}
        </>
      )}
      {/*!addTodo && <button onClick={() => setAddTodo(true)} className='text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase 
       text-lg duration-300 hover:opacity-30'>ADD TODO</button>*/}
    </div>
  )
}