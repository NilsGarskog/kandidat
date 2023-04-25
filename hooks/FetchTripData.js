import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../context/authContext";
import { db } from "../firebase";

export default function useFetchTripData(tripKey) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tripData, setTripData] = useState(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, "users", currentUser.uid, "Trips", tripKey);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTripData(docSnap.data());
        } else {
          setTripData({});
        }
      } catch (err) {
        setError("Failed to load trip data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { loading, error, tripData, setTripData };
}
