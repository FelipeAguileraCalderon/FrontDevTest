import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/Main.css'
import { NewsOptions } from './NewsOptions';
import { DropDownMenu } from './DropDownMenu';
import { NewsList } from './NewsList';
import { Pagination } from './Pagination';

export const Main = () => {
  
  const [windowSelected, setWindowSelected] = useState('all')
  const [deployedNews, setDeployedNews] = useState([])
  const [dropVisibility, setDropVisibility] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function setData(){
      const selected = localStorage.getItem('selected')
      const faves = localStorage.getItem('faves')

      if(faves === null){
        const faves = {
          faves: []
        }
        localStorage.setItem('faves', JSON.stringify(faves))
      }
      if(selected === null){
        localStorage.setItem('selected', 'all')
      }

      const angular = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=angular&page=${currentPage - 1}`)
      const react = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${currentPage - 1}`)
      const vue = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${currentPage - 1}`)

      if(localStorage.getItem('selected') === 'all'){
        setDeployedNews([])
      }
      else if(localStorage.getItem('selected') === 'angular'){
        setDeployedNews(angular.data.hits)
      }
      else if(localStorage.getItem('selected') === 'react'){
        setDeployedNews(react.data.hits)
      }
      else if(localStorage.getItem('selected') === 'vue'){
        setDeployedNews(vue.data.hits)
      }
    }
    setData()
  }, []);

  function dropDownVisibility(value){
    setDropVisibility(value)
  }

  return(
      <div className='newsMain'>
        <NewsOptions 
          dropDownVisibility={dropDownVisibility}
          setDeployedNews={setDeployedNews}
          setWindowSelected={setWindowSelected}
          currentPage={currentPage} 
        />
        {dropVisibility === true 
        ? <DropDownMenu currentPage={currentPage} setDeployedNews={setDeployedNews}/>
        : null}
        <NewsList deployedNews={deployedNews} windowSelected={windowSelected} setDeployedNews={setDeployedNews}/>
        {
          dropVisibility === true
          ? (deployedNews.length === 0 
            ? null
            : <Pagination setDeployedNews={setDeployedNews} currentPage={currentPage} setCurrentPage={setCurrentPage}/>)
          : null
        }
      </div>
  );
};
