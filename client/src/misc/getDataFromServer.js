export const GetDataFromServer = async (method,params) => fetch(`/api?${params}&method=${method}`)
