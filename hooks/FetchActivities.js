import { collection, doc, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../context/authContext'

export default function useFetchAct(tripKey) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actArr, setActArr] = useState([])

  const { currentUser } = useAuth()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', currentUser.uid, 'Trips', tripKey, 'Activities')
      ),
      (snapshot) => {
        const tempArr = []
        snapshot.forEach((doc) => {
          tempArr.push(doc.data())
        })
        setActArr(tempArr)
        setLoading(false)
      },
      (err) => {
        setError('Failed to load activities')
        console.log(err)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [tripKey, currentUser.uid])

  return { loading, error, actArr }
}
