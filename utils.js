const capitalize = s => s.replace(/(^|-)[a-z]/g, it => it.toUpperCase())

const entriesToObject = q =>
Object.assign(
  {},
  ...Array.from(q.entries(), ([key, value]) => ({
    [capitalize(key)]: value
  }))
)

Object.assign(exports, {
  entriesToObject
})
