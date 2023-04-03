import React, { useState, useEffect, useRef } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useAuth } from '../context/authContext'
import { db } from '../firebase'

export default function useFetchTrips() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [trips, setTrips] = useState(null)

    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {

            try {
                const tripNames = {};
                const collectionRef = collection(db, 'users/' + currentUser.uid + '/Trips');
                const snapshot = await getDocs(collectionRef);
                snapshot.forEach((doc) => {
                    const id = doc.id;
                    const name = doc.data().Name;
                    tripNames[id] = name;
                });
                if (true) {
                    console.log(tripNames)
                    setTrips(tripNames)
                    //console.log(tripNames)
                } else {
                    setTrips({})
                }

            } catch (err) {
                setError('Failed to load trips')

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])



    return { loading, error, trips, setTrips }


}