const uppercaseName = (str:string) => {
  const convertToArray = str.toLowerCase().split(' ')
  const result = convertToArray.map(val => {
    return val.replace(val.charAt(0), val.charAt(0).toUpperCase())
  })
  return result.join(' ')
}
export { uppercaseName }