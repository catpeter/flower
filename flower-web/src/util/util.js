export function copyProperties (src, target, ignoreProperties = []) {
  for (let p in src) {
    if (src.hasOwnProperty(p) && ignoreProperties.indexOf(p) < 0) {
      target[p] = src[p]
    }
  }
  return target
}
export function clearProperties (target) {
  if (typeof target !== 'object') {
    return
  }
  for (const prop in target) {
    if (target.hasOwnProperty(prop)) {
      if (target[prop] instanceof Array) {
        target[prop] = []
      } else if (target[prop] instanceof Object) {
        target[prop] = {}
      } else {
        target[prop] = ''
      }
    }
  }
}
export default {
  copyProperties,
  clearProperties
}
