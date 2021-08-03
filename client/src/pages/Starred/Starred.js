import React from 'react';
import MainPageLayout from '../../components/MainPageLayout/MainPageLayout';
import { GetDataFromServer } from '../../misc/getDataFromServer';
import { getCookie } from '../../misc/getCookie';

const films = () => {
    GetDataFromServer('listFilms',`id=${getCookie('id')}`)
    .then(answ => answ)
}
const data = films();
console.log(data)
const Starred = () => (

        <MainPageLayout>
            Starred page
        </MainPageLayout>
    )

export default Starred
