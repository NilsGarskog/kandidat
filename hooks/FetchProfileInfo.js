import React, { useState, useEffect, useRef } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/authContext'
import { db } from '../firebase'

export default function useFetchProfileInfo() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [profileData, setProfileData] = useState(null)

    const { currentUser } = useAuth()

    useEffect(() => {
        async function fetchData() {

            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setProfileData(docSnap.data())
                } else {
                    setProfileData({})
                }

            } catch (err) {
                setError('Failed to load profile data')
                

            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])



    return { loading, error, profileData, setProfileData }

}