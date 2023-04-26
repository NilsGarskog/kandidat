import React, { useState, useEffect, useRef } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useAuth } from '../context/authContext'
import { db } from '../firebase'

export default function useFetchAct(tripKey) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [actArr, setActArr] = useState([])

    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchAct() {

            try {
                const collectionRef = collection(db, 'users/' + currentUser.uid + '/Trips/' + tripKey + '/Activities');
                const snapshot = await getDocs(collectionRef);
                let tempArr = []
                snapshot.forEach((doc) => {
                    tempArr.push(doc.data())
                });
                setActArr(tempArr)

            } catch (err) {
                setError('Failed to load activities')
                console.log(err)

            } finally {
                setLoading(false)
            }
        }
        fetchAct()
    }, [])



    return { loading, error, setError, actArr, setActArr }


}