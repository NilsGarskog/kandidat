
import { useRouter } from 'next/router';
import dayjs from "dayjs"
import { doc, setDoc, deleteField, deleteDoc, updateDoc } from 'firebase/firestore'
import { useAuth } from '../context/authContext'
import { db } from '../firebase'


async function saveItineary(IT) {
    const router = useRouter()
    const { userInfo, currentUser } = useAuth()
    const { tripKey } = router.query

    console.log("algo")
    const userRef = doc(db, 'users', currentUser.uid, 'Trips', tripKey)
    await updateDoc(userRef, { itCreated: true, itineary: IT })
}


const genericLunchId = 1
const genericDinnerId = 2
const genericActId = 3


function fetchDate(arrDateRaw, depDateRaw) {
    const arrDate = dayjs(arrDateRaw)
    const depDate = dayjs(depDateRaw)
    return [depDate.diff(arrDate, 'day') + 1, arrDate.format('d')]
}



function fetchAct(actArr) {
    const act = []
    const lunch = []
    const dinner = []
    actArr.forEach((obj) => {
        if (obj.type === 0) {
            act.push(obj)
        }
        else if (obj.type === 1) {
            lunch.push(obj)
        }
        else if (obj.type === 2) {
            dinner.push(obj)
        }
    })
    return { act, lunch, dinner }

}

function randomiseActOrder(actArr) {
    const { act, lunch, dinner } = fetchAct(actArr)
    const randomAct = act.sort(() => Math.random() - 0.5)
    const randomLunch = lunch.sort(() => Math.random() - 0.5)
    const randomDinner = dinner.sort(() => Math.random() - 0.5)
    return { randomAct, randomLunch, randomDinner }
}

function createInitialOut(arrDate, depDate) {
    let [daysBetween, firstDayNumber] = fetchDate(arrDate, depDate)
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const outPut = []
    let currentDayNumber = parseInt(firstDayNumber)
    for (let i = 0; i < daysBetween; i++) {
        if (currentDayNumber > 6) {
            currentDayNumber = 0
        }
        const currentDay = weekDays[currentDayNumber]
        outPut.push({ day: currentDay, act: [null, null, null, null, null, null] })
        currentDayNumber += 1
    }
    return outPut
}

function anyShort(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].time === 0) {
            return true
        }
    }
    return false
}

export default function Algoritmen(arrDate, depDate, actArr) {
    const outPut = createInitialOut(arrDate, depDate)
    const { randomAct, randomLunch, randomDinner } = randomiseActOrder(actArr)

    outPut.forEach(day => {
        if (randomLunch.length != 0) {
            day.act[2] = randomLunch[0].id
            randomLunch.shift()
        }
        else {
            day.act[2] = genericLunchId
        }
        if (randomDinner.length != 0) {
            day.act[5] = randomDinner[0].id
            randomDinner.shift()
        }
        else {
            day.act[5] = genericDinnerId
        }
        for (let i = 0; i < 5; i++) {
            if (randomAct.length === 0 && day.act[i] === null) {
                day.act[i] = genericActId
            }
            else if (randomAct.length != 0 && day.act[i] === null) {
                if (randomAct[0].time === 0) {
                    day.act[i] = randomAct[0].id
                    randomAct.shift()
                }
                else if (randomAct[0].time === 1) {
                    if (day.act[i] === null && day.act[i + 1] === null) {
                        day.act[i] = randomAct[0].id
                        day.act[i + 1] = randomAct[0].id
                        randomAct.shift()
                        i += 2
                    }
                    else if (anyShort(randomAct) === true) {
                        randomAct.push(randomAct[0])
                        randomAct.shift()
                        i -= 1
                    }
                    else if (anyShort(randomAct) === false) {
                        day.act[i] = genericActId
                    }
                }
            }

        }
    })
    saveItineary(outPut);

    return (
        outPut

    )
}
