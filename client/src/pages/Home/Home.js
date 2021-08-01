import React,{useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {IconButton} from '@material-ui/core'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MainPageLayout from '../../components/MainPageLayout/MainPageLayout';
import { apiGet } from '../../misc/config';
import './Home.css';
import { GetDataFromServer } from '../../misc/getDataFromServer';
import { getCookie } from '../../misc/getCookie';




const Home = () => {

    // if(!document.cookie.id){
    //     document.cookie = `id=${uuidv4()}`
    // }else{
    //     console.log(document.cookie.id)
    // }
    console.log(getCookie("id"))

    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const [data, setData] = useState(null);

    const isShows = searchOption === 'shows';


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
                            <IconButton onClick={GetDataFromServer(setData, '80')}>
                                <StarBorderIcon />
                            </IconButton>
                        </li>
                        <li>
                            {!data ? 'Nothing to see' : data}
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
                            <li>
                                <IconButton>
                                    <StarBorderIcon />
                                </IconButton>
                            </li>
                            <li>
                                {!data ? 'Nothing to see' : data}
                            </li>
                        </ul>
                    </div>));
        }

        return null;
    }

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value)
    }

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
