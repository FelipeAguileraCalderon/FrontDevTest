import React, { useState, useEffect } from 'react';
import '../styles/DropDownMenu.css'
import { DropDownOptions } from './DropDownOptions';

export const DropDownMenu = (props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [selectedNews, setSelectedNews] = useState('')

    const {setDeployedNews} = props
    
    useEffect(() => {
        const newsSelected = localStorage.getItem('selected')
        setSelectedNews(newsSelected)
    }, []);

    function setVisible(){
        setIsVisible(!isVisible)
    } 

    return(
        <div className='generalDropDownContainer'>
            <div className='dropDownContainer'>
                <div id='dropDown' className='dropDown' onClick={()=>setVisible()}>
                    <div className='dropTextDiv'>
                    <span className='dropText'>Select your news</span>
                    </div>
                    <img alt='bottomArrow' className='dropImg' src='./img/bottomArrow.png'></img>
                </div>
                { isVisible === true 
                ? <DropDownOptions setSelectedNews={setSelectedNews} setDeployedNews={setDeployedNews} setVisible={setVisible}/> 
                : null 
                }    
            </div>
            {selectedNews === 'all'
            ? null
            : <img alt={selectedNews} src={`./img/${selectedNews}.png`} className='newsImg'/>}
        </div>
    );
};
