import React, { useState, useEffect } from 'react';
import '../styles/NewsItem.css'

export const NewsItem = (props) => {

    const [isFave, setIsFave] = useState(false)

    const { element , windowSelected, setDeployedNews } = props

    useEffect(() => {
        const favesData = JSON.parse(localStorage.getItem('faves')).faves
        const findNew = favesData.filter(el => el.story_id === element.story_id)
        if(findNew.length === 1){
            setIsFave(true)
        }
    },[]);
    

    function clickFave(element, windowSelected){
        setIsFave(false)
        let getData = JSON.parse(localStorage.getItem('faves'))
        const newData = getData.faves
        const filtredData = newData.filter(el => el.story_id !== element.story_id)
        getData['faves'] = filtredData
        localStorage.setItem('faves', JSON.stringify(getData))
        if(windowSelected === 'faves'){
            setDeployedNews(filtredData)
        }
    }

    function clickUnFave(element){
        setIsFave(true)
        let getData = JSON.parse(localStorage.getItem('faves'))
        const newData = getData.faves
        newData.push(element)
        getData['faves'] = newData
        localStorage.setItem('faves', JSON.stringify(getData))
    }

    function openNews(){
        window.open(element.story_url,'_blank')
    }

    let hours = Math.round(Math.abs((new Date()) - (new Date(element.created_at))) / 36e5);

    if(hours === 0){
        hours = 'Now by'
    }
    else if(hours === 1){
        hours = `${hours} hour ago by`
    }
    else{
        hours = `${hours} hours ago by`
    }

    return(
        <div className='newsItemContainer'>
            <div className='generalTextNewsItemContainer' onClick={() => openNews()}>
                <div className='timeNewsItemContainer'>
                    <img className='clockImg' alt='clock' src='./img/clock.png'/>
                    <span className='timeTextNewsItem'>{hours} {element.author}</span>
                </div>
                <div className='titleNewsItemContainer'>
                    <span>{element.story_title}</span>
                </div>
            </div>
            <div className='kokorosContainer'>
                {isFave === false
                ? <img alt='notFave' className='isFaveImg' src='./img/unfave.png' onClick={()=>clickUnFave(element)}/>
                : <img alt='Fave' className='isFaveImg' src='./img/fave.png' onClick={()=>clickFave(element, windowSelected)}/>}
            </div>
        </div>
    );
};