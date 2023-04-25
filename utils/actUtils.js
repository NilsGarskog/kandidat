export function translateStringToNum() {
    if (activityType.toString() == 'Activity') {
      activityType = 0
    }
    else if (activityType.toString() == 'Lunch') {
      activityType = 1
    }
    else {
      activityType = 2
    }
    if (activityLength.toString() == 'Short') {
      activityLength = 0
    }
    else {
      activityLength = 1
    }
  }
  export function handleActButton() {
    if (actOpen === false) {
      setActOpen(true);
      setErr('')

    } else {
      setActOpen(false);
      setActivity('')
      setActDescription('')
    }
  }
  export function handleFoodButton() {
    if (foodOpen === false) {
      setFoodOpen(true);
      setErr('')

    } else {
      setFoodOpen(false);
      setActivity('')
      setActDescription('')
    }
  }
  export async function addActivity() {
   
    if (!activity) {
      setError('Please enter activity name')
    }

    else {
      if (checkedActShort == null) {
        setError('Please choose a length for your activity')
      }
      else {
        setError('')
        translateStringToNum()
        handleAddActivity()
        handleActButton()
        setActivity('')
        setCheckedActShort(null)
      }
    }


  }
  export function addFood() {
    if (!activity) {
      setError('Please enter restaurant name')
    }

    else {
      if (checkedLunch == null) {
        setError('Please choose a type of restaurant')
      }
      else {
        setError('')
        translateStringToNum()
        handleAddFood()
        handleFoodButton()
        setActivity('')
        setActDescription('')
        setCheckedLunch(null)
      }
    }

  }


export async function handleAddFood() {
  const newKey = v4()

  if (checkedLunch) {
    activityType = 1
  }
  else if (!checkedLunch) {
    activityType = 2
  }

  const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())
  const actUrl = await getUrl(activity, process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY)
  console.log(actUrl)

  const data = {
    id: newKey,
    activityName: activity,
    time: 0,
    type: activityType,
    description: actDescription,
    actImage: actUrl 


  }
  setFoodInfo([...foodInfo, data])
  await setDoc(userRef, data)
    .then((docRef) => {
      console.log('Document written with ID: ');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });


}

export async function handleAddActivity() {
  const newKey = v4()
  if (checkedActShort) {
    activityLength = 0
  }
  else if (!checkedActShort) {
    activityLength = 1
  }


  const userRef = doc(db, 'users', currentUser.uid, 'Trips', props.tripKey, 'Activities', newKey.toString())
  const actUrl = await getUrl(activity, process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY)
  const data = {
    id: newKey,
    activityName: activity,
    time: activityLength,
    type: 0,
    description: actDescription,
    actImage: actUrl
  }
  setActInfo([...actInfo, data])
  await setDoc(userRef, data)
    .then((docRef) => {
      console.log('Document written with ID: ');
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });


}