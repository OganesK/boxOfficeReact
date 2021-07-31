import {useState, useEffect, React} from 'react'

const GetDataFromServer = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/home", {
            method: 'get',
        })
        .then((res) => res.json())
        // eslint-disable-next-line no-shadow
        .then((data) => {setData(data); setLoading(false)})
    }, [])
    
    
    if(loading){
        return <div>Loading...</div>
    }

    return(
        <div>
            <div>{!data.name ? "Loading..." : data.name}</div>
            <div>{!data.age ? "Loading..." : data.age}</div>
        </div>
    )
}

export default GetDataFromServer;