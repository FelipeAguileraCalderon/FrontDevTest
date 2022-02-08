import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { NewsItem } from '../components/NewsItem'

test('Render content', () => {

    const news = `{"created_at":"2022-02-08T12:56:44.000Z","title":null,"url":null,"author":"yostrovs","points":null,"story_text":null,"comment_text":"I\u0026#x27;m of the opinion that being a musician shouldn\u0026#x27;t imply that there should be money in it. It\u0026#x27;s a fun hobby for many and the reason it\u0026#x27;s so popular to try to be professional. 99 percent of musicians don\u0026#x27;t make any money off of it, and so crying about the ones that want to live off of their hobby doesn\u0026#x27;t achieve anything. I have musician friends. They all have regular jobs like I do. I\u0026#x27;m a juggler. I don\u0026#x27;t expect to live off of juggling.","num_comments":null,"story_id":30255382,"story_title":"Reasons to Abandon Spotify That Have Nothing to Do with Joe Rogan","story_url":"https://www.newyorker.com/culture/cultural-comment/imagine-a-world-without-spotify","parent_id":30256605,"created_at_i":1644325004,"_tags":["comment","author_yostrovs","story_30255382"],"objectID":"30257815","_highlightResult":{"author":{"value":"yostrovs","matchLevel":"none","matchedWords":[]},"comment_text":{"value":"I'm of the opinion that being a musician shouldn't imply that there should be money in it. It's a fun hobby for many and the reason it's so popular to try to be professional. 99 percent of musicians don't make any money off of it, and so crying about the ones that want to live off of their hobby doesn't achieve anything. I have musician friends. They all have \u003cem\u003eregular\u003c/em\u003e jobs like I do. I'm a juggler. I don't expect to live off of juggling.","matchLevel":"full","fullyHighlighted":false,"matchedWords":["angular"]},"story_title":{"value":"Reasons to Abandon Spotify That Have Nothing to Do with Joe Rogan","matchLevel":"none","matchedWords":[]},"story_url":{"value":"https://www.newyorker.com/culture/cultural-comment/imagine-a-world-without-spotify","matchLevel":"none","matchedWords":[]}}}`
    const json = {'faves': [news]}
    if(localStorage.getItem('faves') === null){
        localStorage.setItem('faves', JSON.stringify(json))
    }

    let hours = Math.round(Math.abs((new Date()) - (new Date(JSON.parse(news).created_at))) / 36e5);

    if(hours === 0){
        hours = 'Now by'
    }
    else if(hours === 1){
        hours = `${hours} hour ago by`
    }
    else{
        hours = `${hours} hours ago by`
    }

    const component = render(<NewsItem element={JSON.parse(news)}/>)

    component.getByText(`${hours} ${JSON.parse(news).author}`)
    component.getByText(JSON.parse(news).story_title)
})