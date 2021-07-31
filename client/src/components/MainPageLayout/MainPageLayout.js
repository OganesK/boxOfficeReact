import React from 'react';
import Navs from '../NavigationBar/Navs'; 
import Title from '../Title/Title';
// import './MainPageLayout.css'

const MainPageLayout = ({children}) => (
        <div>
            <Title title="Box Office" subtitle="Are you looking for a movie or an actor?"/>
            <Navs />
            {children}
        </div>
    );

export default MainPageLayout;
