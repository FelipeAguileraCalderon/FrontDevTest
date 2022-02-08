import React from 'react';
import '../styles/NewsList.css'
import { NewsItem } from './NewsItem';

export const NewsList = (props) => {

    const { deployedNews, windowSelected, setDeployedNews } = props

    const newsWihtOutDuplicates = deployedNews.reduce((acc, el) => {
        if (!acc.find(element => element.story_id === el.story_id)){
            acc.push(el)
        }
        return acc
    },[])


    return(
        <div className='newsListContainer'>
            {deployedNews.lenght === 0
            ? null
            : newsWihtOutDuplicates.sort((act, pos) => {
                    const day1 = new Date(act.created_at)
                    const day2 = new Date(pos.created_at)
                    return day2.valueOf() - day1.valueOf()
            }).map(element => {
                if(element.author !== null && element.created_at !== null 
                    && element.story_title !== null && element.story_url !== null && element.story_id !== null){
                        return <NewsItem key={element.story_id} element={element} windowSelected={windowSelected} setDeployedNews={setDeployedNews}/>
                }
                else return null
            })}
        </div>
    );
};
