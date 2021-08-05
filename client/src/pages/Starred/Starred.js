import React, { useEffect, useState } from 'react';
import {IconButton} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MainPageLayout from '../../components/MainPageLayout/MainPageLayout';
import { GetDataFromServer } from '../../misc/getDataFromServer';
import { getCookie } from '../../misc/getCookie';


const deleteClickHandler = (filmId) => {
    GetDataFromServer('deleteFilm',`id=${getCookie('id')}&filmId=${JSON.stringify(filmId)}`)
    .then(answ => answ.json())
    // eslint-disable-next-line no-alert
    .then(res => alert(res));
    window.location.reload();
}

const Starred = () => {
    
    const [loading, setLoading] = useState(true);
    const [starredFilms, setStarredFilms] = useState();

    const getStarredFilms = async () => {
        const data = await GetDataFromServer('listFilms',`id=${getCookie('id')}`)
        setStarredFilms(await data.json());
        setLoading(false);

    }

    useEffect(() => {
        setLoading(true);
        getStarredFilms();
    }, [])

    if(loading){
        return <div>Loading...</div>
    }
    return (
            <MainPageLayout>
                {starredFilms.starred.map(item => (
                    <div key={item.film.film.show.id} className='Show'>
                    <div className='Picture'>
                        {item.film.film.show.image ? <img src={item.film.film.show.image.medium} alt={item.film.film.show.name} width='200' height='200' className='showImg'/> : <strong>No image found :(</strong>}
                    </div>
                <ul>
                    <li>{item.film.film.show.name}</li>
                    <li>Genres: {item.film.film.show.genres.length ? item.film.film.show.genres.join(' ') : <strong>No genres listed</strong>}</li>
                    <li>Rating: {item.film.film.show.rating.average ? item.film.film.show.rating.average : <strong>No ratings specified</strong>}</li>
                    <li>Link: <a href={item.film.film.show.officialSite}>{item.film.film.show.officialSite ? item.film.film.show.name : <strong>No link specified</strong>}</a></li>
                    <li>
                        <IconButton onClick={() => {deleteClickHandler(item.film.film.show.id)}}>
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </li>
                </ul>
            </div>
                    ))}
            </MainPageLayout>
    )

}

export default Starred
