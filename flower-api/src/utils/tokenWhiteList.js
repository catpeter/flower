const whiteList = [/\/login$/
]

function checkWhiteList (path) {
  let flag = true
  for (var i = 0; i < whiteList.length; i++) {
    if (!new RegExp(whiteList[i]).test(path)) {
      continue
    } else {
      flag = false
      break
    }
  }
  return flag
}
export default {checkWhiteList, whiteList}
