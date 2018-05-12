const papa = require('papaparse')

const organize = ([
  city, cityCode, office, officeCode, district, districtCode
]) => [{
  id: cityCode,
  type: 'city',
  name: city
}, {
  id: officeCode,
  type: 'office',
  name: office,
  parent: cityCode
}, {
  id: districtCode,
  type: 'district',
  name: district,
  parent: officeCode
}]

const distinct = items => {
  const data = Object.assign(...items.map(it => ({[it.id]: it})))
  return Object.values(data)
}

const convert = content => {
  const {data} = papa.parse(content)
  return distinct([].concat(...data.slice(1).map(organize)))
}

module.exports = convert
