
import dayjs from "dayjs"

const genericLunchId = 10
const genericDinnerId = 20
const genericActId = 30

function fetchDate() {
    const arrDate = dayjs("2023-04-19")
    const depDate = dayjs("2023-04-22")
    return [depDate.diff(arrDate, 'day') + 1, arrDate.format('d')]
}

function fetchAct() {
    const act = [{ id: 1, type: 0, time: 0 }, { id: 2, type: 0, time: 0 }, { id: 3, type: 0, time: 0 }, { id: 50, type: 0, time: 1 }]
    const lunch = [{ id: 4, type: 1, time: 0 }, { id: 5, type: 1, time: 0 }, { id: 6, type: 1, time: 0 }]
    const dinner = [{ id: 7, type: 2, time: 0 }, { id: 8, type: 2, time: 0 }, { id: 9, type: 2, time: 0 }]
    return { act, lunch, dinner }

}

function randomiseActOrder() {
    const { act, lunch, dinner } = fetchAct()
    const randomAct = act.sort(() => Math.random() - 0.5)
    const randomLunch = lunch.sort(() => Math.random() - 0.5)
    const randomDinner = dinner.sort(() => Math.random() - 0.5)
    return { randomAct, randomLunch, randomDinner }
}

function createInitialOut() {
    const weekDays = ['sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const [daysBetween, firstDayNumber] = fetchDate()
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

export default function Algoritmen() {
    const outPut = createInitialOut()
    const { randomAct, randomLunch, randomDinner } = randomiseActOrder()

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

    return (
        console.log(outPut)

    )
}
