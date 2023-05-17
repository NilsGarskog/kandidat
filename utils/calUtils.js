export function removeDuplicates(arr) {
    let newArr = []
    arr.forEach(item => {
      if (!newArr.includes(item) || item == 3 || item == 2 || item == 1) {
        newArr.push(item)
      }
    })
    return newArr
  }
  
  export function getActName(id, actArr) {
    let name = ""
    let length = null;
    let type = null;
    let img = null;
    let description = null;
    actArr.forEach(act => {
      if (act.id === id) {
        name = act.activityName
        length = act.time
        type = act.type
        img = act.actImage
        description = act.description
      }
    })
    return { name: name, length: length, type: type, img: img, description: description }
  }