export const GetDataFromServer = async (method,params) => fetch(`http://localhost:3001/api?${params}&method=${method}`)
