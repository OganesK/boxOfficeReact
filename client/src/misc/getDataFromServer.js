export const GetDataFromServer = async (method,params) => {
    
    const res = await fetch(`http://localhost:3001/api?${params}&method=${method}`);
    return res.json();
}
