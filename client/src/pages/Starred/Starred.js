import React, {  useState } from 'react';
import {IconButton} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MainPageLayout from '../../components/MainPageLayout/MainPageLayout';
import { GetDataFromServer } from '../../misc/getDataFromServer';
import { getCookie } from '../../misc/getCookie';


const Starred = () => {
    
    const [loading, setLoading] = useState(true);
    const [starredFilms, setStarredFilms] = useState();

    const getStarredFilms = async () => {
        await GetDataFromServer('listFilms',`id=${getCookie('id')}`)
        .then(data => data.json())
        .then(res => setStarredFilms(res))
        .then(setLoading(false))
    }
    
    getStarredFilms();

    if(loading){
        return <div>Loading...</div>
    }

    return (
            <MainPageLayout>
                {console.log(JSON.stringify(starredFilms.starred[0].film.show.image))}
                {
                    starredFilms.starred.map(item => (
                        <div key={item.film.show.id} className='Show'>
                                <div className='Picture'>
                                    {item.film.show.image ? <img src={item.film.show.image.medium} alt={item.film.show.name} width='200' height='200' className='showImg'/> : <strong>No image found :(</strong>}
                                </div>
                            <ul>
                                <li>{item.film.show.name}</li>
                                <li>Genres: {item.film.show.genres.length ? item.film.show.genres.join(' ') : <strong>No genres listed</strong>}</li>
                                <li>Rating: {item.show.film.rating.average ? item.film.show.rating.average : <strong>No ratings specified</strong>}</li>
                                <li>Link: <a href={item.film.show.officialSite}>{item.film.show.officialSite ? item.film.show.name : <strong>No link specified</strong>}</a></li>
                                <li>
                                    <IconButton>
                                        <StarBorderIcon />
                                    </IconButton>
                                </li>
                            </ul>
                        </div>
                    ))
                }
                
            </MainPageLayout>
    )

}

export default Starred
