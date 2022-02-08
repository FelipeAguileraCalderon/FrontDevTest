import React from 'react';
import '../styles/DropDownOptions.css'

export const DropDownOptions = (props) => {

    const {setDeployedNews,setVisible,setSelectedNews} = props

    function setAngular(){
        const newsSelected = localStorage.getItem('selected')
        if(newsSelected === 'angular'){
            localStorage.setItem('selected', 'all')
            setDeployedNews([])
            setSelectedNews('all')
        }
        else{
            localStorage.setItem('selected', 'angular')
            setSelectedNews('angular')
            window.location.reload();    
        }
    }

    function setReact(){
        const newsSelected = localStorage.getItem('selected')
        if(newsSelected === 'react'){
            localStorage.setItem('selected', 'all')
            setDeployedNews([])
            setSelectedNews('all')
        }
        else{
            localStorage.setItem('selected', 'react')
            setSelectedNews('react')
            window.location.reload();     
        }
    }

    function setVue(){
        const newsSelected = localStorage.getItem('selected')
        if(newsSelected === 'vue'){
            localStorage.setItem('selected', 'all')
            setDeployedNews([])
            setSelectedNews('all')
        }
        else{
            localStorage.setItem('selected', 'vue')
            setSelectedNews('vue')
            window.location.reload();     
        }
    }

    return(
        <div className='dropDownOptions'>
            <div className='dropDownOptionsContainer' onClick={()=>{
                setVisible()
                setAngular()
            }}>
                <img alt='angular' className='imgDropDownOptions' src='./img/angular.png'/>
                <span className='dropDownOptionsText'>Angular</span>    
            </div>
            <div className='dropDownOptionsContainer' onClick={()=>{
                setVisible()
                setReact()
            }}>
                <img alt='react' className='imgDropDownOptions' src='./img/react.png'/>
                <span className='dropDownOptionsText'>React</span> 
            </div>
            <div className='dropDownOptionsContainer' onClick={()=>{
                setVisible()
                setVue()   
            }}>
                <img alt='vue' className='imgDropDownOptions' src='./img/vue.png'/>
                <span className='dropDownOptionsText'>VueJs</span> 
            </div>
        </div>
    );
};
