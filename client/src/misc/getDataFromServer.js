export const GetDataFromServer = (setData, params) => () => {
    fetch(`http://localhost:3001/home?${params}`)
    .then(res => res.json())
    .then(newData => {setData(newData.name)});
}