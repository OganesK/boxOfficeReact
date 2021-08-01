import {useState, useEffect, React} from 'react'

const GetDataFromServer = () => {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 8083,
                name: 'John',
                surname: 'Adams'
            })
        }).then(res => {
            setData(res);
        })
    })

    return(
        <div>
            <div>`Simple request from server: ${data}`</div>
        </div>
    )
}

export default GetDataFromServer;