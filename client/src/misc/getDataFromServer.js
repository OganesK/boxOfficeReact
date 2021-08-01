export const GetDataFromServer = (method,params, document) => {
    fetch(`http://localhost:3001/api?${params}`)
    .then(res => res.json())
    .then(data => {
        // eslint-disable-next-line no-param-reassign
        document.cookie = `id=${data}`
    })
}