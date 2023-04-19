import React from 'react'

export default function ActivityCard(actArr) {
    const { act, lunch, dinner } = sortAct(actArr)



    if (actArr.type === 'showAct') {
        return (
            <>
                {act.map((x) => (
                    <div key={String(x)}>
                        <div className="text-black">
                            Name: {x.activityName}
                        </div>
                    </div>
                ))}
            </>
        )
    }
    else if (actArr.type === 'showFood') {
        return (
            <>
                {lunch.map((x) => (
                    <div key={String(x)}>
                        <div className="text-black">
                            Name: {x.activityName}
                        </div>
                    </div>
                ))}
                <>
                    {dinner.map((x) => (
                        <div key={String(x)}>
                            <div className="text-black">
                                Name: {x.activityName}
                            </div>
                        </div>
                    ))}
                </>
            </>
        )
    }



}

function sortAct(actArr) {

    const act = []
    const lunch = []
    const dinner = []
    actArr.actData.forEach((obj) => {
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

