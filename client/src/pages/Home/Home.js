import React,{useEffect, useState} from 'react';
import {IconButton} from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MainPageLayout from '../../components/MainPageLayout/MainPageLayout';
import { apiGet } from '../../misc/config';
import './Home.css';
import { GetDataFromServer } from '../../misc/getDataFromServer';
import { getCookie } from '../../misc/getCookie';




const Home = () => {
    

    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const [loading, setLoading] = useState(true);


    const isShows = searchOption === 'shows';


    const loadData = async () => {
        const id = await GetDataFromServer('blabla','id=null');
        document.cookie = `id=${id}`;
        setLoading(false);
    }
    useEffect(() => {
        if(getCookie("id") === undefined){
            loadData()
            // eslint-disable-next-line no-console
            console.log('Trying to get id')
        }else{
            // eslint-disable-next-line no-console
            console.log(`Куки есть ${document.cookie}`);
            setLoading(false);
        }
    }, [])


    const onInputChange = ev => {
        setInput(ev.target.value);
    }

    const onSearch = () => {

        apiGet(`/search/${searchOption}?q=${input}`).then(result => {
            setResults(result);
        });
    }

    const onKeyDown = ev => {
        if (ev.keyCode === 13) {
            onSearch(input);
        }
    }

    const starredClickHandler = (item) => {
        GetDataFromServer('newFilm',`id=${getCookie('id')}&data=${JSON.stringify(item)}`)
        .then(answ => answ.json())
        // eslint-disable-next-line no-alert
        .then(res => alert(res));
    }


    const renderResults = () => {
        if (results && results.length === 0) {
            return <div>No results :(</div>
        } if (results && results.length > 0) {
            return results[0].show ? results.map(item => (
                <div key={item.show.id} className='Show'>
                        <div className='Picture'>
                            {item.show.image ? <img src={item.show.image.medium} alt={item.show.name} width='200' height='200' className='showImg'/> : <strong>No image found :(</strong>}
                        </div>
                    <ul>
                        <li>{item.show.name}</li>
                        <li>Genres: {item.show.genres.length ? item.show.genres.join(' ') : <strong>No genres listed</strong>}</li>
                        <li>Rating: {item.show.rating.average ? item.show.rating.average : <strong>No ratings specified</strong>}</li>
                        <li>Link: <a href={item.show.officialSite}>{item.show.officialSite ? item.show.name : <strong>No link specified</strong>}</a></li>
                        <li>
                            <IconButton onClick={() => {starredClickHandler(item)}}>
                                <StarBorderIcon />
                            </IconButton>
                        </li>
                    </ul>
                </div>
            ))
                : results.map(item => (
                    <div key={item.person.id} className='Person'>
                        <div className='Picture'>
                            {item.person.image ? <img src={item.person.image.medium} alt={item.person.name} className='personImg'/> : <strong>No image found :(</strong>}
                        </div>
                        <ul>
                            <li>{item.person.name}</li>
                            <li>Birthday:{item.person.birthday} | Deathday: {item.person.deathday}</li>
                            <li>Country: {item.person.country ? item.person.country.name : null}</li>
                            <li>Gender: {item.person.gender}</li>
                            <li>Link: <a href={item.person.url}>{item.person.name}</a></li>
                        </ul>
                    </div>));
        }

        return null;
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value)
    }

    if(loading) return <div>Loading...</div>

    return(
        <MainPageLayout>
            <input type='text' 
            onChange={onInputChange} 
            onKeyDown={onKeyDown} 
            value={input}
            placeholder='Search for something'/>
            
            <div>
                <label htmlFor='shows-search'>
                    Shows
                    <input id='shows-search' type='radio'
                     value='shows'
                     checked={isShows}
                     onChange={onRadioChange}/>
                </label>

                <label htmlFor='actors-search'>
                    Actors
                    <input id='actors-search' type='radio' 
                    value='people'
                    checked={!isShows}
                    onChange={onRadioChange}/>
                </label>
            </div>

            <button type="button" onClick={onSearch}>Search</button>
            {renderResults()}
        </MainPageLayout>
    )
}
export default Home;
