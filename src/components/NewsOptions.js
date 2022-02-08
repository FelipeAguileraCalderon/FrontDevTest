import axios from 'axios';
import React from 'react';
import '../styles/NewsOptions.css'

export const NewsOptions = (props) => {

  const { dropDownVisibility, setDeployedNews, setWindowSelected, currentPage } = props

  function clickAll(){
    document.getElementById('all').classList.add('clicked') 
    document.getElementById('all').classList.remove('notClicked')
    document.getElementById('faves').classList.add('notClicked')
    document.getElementById('faves').classList.remove('clicked')
  }

  async function allBottomSetNews(){
    const currentNews = localStorage.getItem('selected')
    if(currentNews === 'all'){
      setDeployedNews([])
    }
    else if(currentNews === 'angular'){
      const data = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=angular&page=${currentPage - 1}`)
      setDeployedNews(data.data.hits)
    }
    else if(currentNews === 'react'){
      const data = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${currentPage - 1}`)
      setDeployedNews(data.data.hits)
    }
    else if(currentNews === 'vue'){
      const data = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${currentPage - 1}`)
      setDeployedNews(data.data.hits)
    }
    setWindowSelected('all')
  }

  function clickFaves(){
    document.getElementById('faves').classList.add('clicked') 
    document.getElementById('faves').classList.remove('notClicked')
    document.getElementById('all').classList.add('notClicked')
    document.getElementById('all').classList.remove('clicked')
  }

  function favesButtonSetNews(){
    const favesNews = localStorage.getItem('faves')
    if(favesNews === null){
      setDeployedNews([])
    }
    else{
      const data = JSON.parse(favesNews)
      setDeployedNews(data.faves)
    }
    setWindowSelected('faves')
  }

  return (
    <div className='containerOptions'>
        <div id='all' className='clicked' onClick={() => 
          {
            clickAll()
            dropDownVisibility(true)
            allBottomSetNews()
          }
        }>All</div>
        <div id='faves' className='notClicked' onClick={() => 
          {
            clickFaves()
            dropDownVisibility(false)
            favesButtonSetNews()
          }
        }>My faves</div>
    </div>
  );
};
