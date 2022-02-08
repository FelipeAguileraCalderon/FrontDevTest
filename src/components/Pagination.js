import axios from 'axios';
import React, {useState, useEffect} from 'react';
import '../styles/Pagination.css'

export const Pagination = (props) => {

    const { setCurrentPage, setDeployedNews, currentPage } = props

    

    const [currentButton, setCurrentButton] = useState(currentPage)
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])
    
    const numberOfPages = []
    
    for (let i = 1; i <= 50; i++) {
        numberOfPages.push(i)
    }

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrButtons]
    
        let dotsInitial = '...'
        let dotsLeft = '... '
        let dotsRight = ' ...'
    
        if (numberOfPages.length < 6) {
          tempNumberOfPages = numberOfPages
        }
    
        else if (currentButton >= 1 && currentButton <= 3) {
          tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
        }
    
        else if (currentButton === 4) {
          const sliced = numberOfPages.slice(0, 5)
          tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
        }
    
        else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
            const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5] 
            const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]               // from 5 to 8 -> (10 - 2)
        }
        
        else if (currentButton > numberOfPages.length - 3) {                 // > 7
          const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4) 
          tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
        }
        
        else if (currentButton === dotsInitial) {
          // [1, 2, 3, 4, "...", 10].length = 6 - 3  = 3 
          // arrOfCurrButtons[3] = 4 + 1 = 5
          // or 
          // [1, 2, 3, 4, 5, "...", 10].length = 7 - 3 = 4
          // [1, 2, 3, 4, 5, "...", 10][4] = 5 + 1 = 6
          setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
        }
        else if (currentButton === dotsRight) {
          setCurrentButton(arrOfCurrButtons[3] + 2)
        }
    
        else if (currentButton === dotsLeft) {
          setCurrentButton(arrOfCurrButtons[3] - 2)
        }
    
        setArrOfCurrButtons(tempNumberOfPages)
        setCurrentPage(currentButton)
    }, [currentButton])

    async function setNews(page){
        const newsSelected = localStorage.getItem('selected')
        if(page !== ' ...' && page !== '... ' && page !== '...'){
            if(newsSelected === 'angular'){
                const data = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=angular&page=${parseInt(page) - 1}`)
                setDeployedNews(data.data.hits)
            }
            else if(newsSelected === 'react'){
                const data = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=${parseInt(page) - 1}`)
                setDeployedNews(data.data.hits)
            }
            else if(newsSelected === 'vue'){
                const data = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page=${parseInt(page) - 1}`)
                setDeployedNews(data.data.hits)
            }
        }
    }

    return (
        <div className="pagination-container">
            <button
                href="#"
                className={`${currentButton === 1 ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
            >
                {'<'}
            </button>

            {arrOfCurrButtons.map(((item, index) => {
            return <button
                    href="#"
                    key={index}
                    className={`${currentButton === item ? 'active' : ''}`}
                    onClick={() => {
                        setCurrentButton(item)
                        setNews(item)
                    }}
                >
                    {item}
                </button>
            }))}

            <button
                href="#"
                className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
                onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
            >
                {'>'}
            </button>
        </div>
    );
};
