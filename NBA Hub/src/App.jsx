import { useState } from 'react'
import './App.css'
import { useRoutes, useParams } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import DetailedPost from './pages/Detailed-Post'

function App() {

  function PostDetailsWrapper() {
    const { id } = useParams();
    const post = posts.find(c => c.id === Number(id));
    return <DetailedPost {...post} />;
  }

  const posts = [
    {
      id: 1, 
      time: '2 hours', 
      title: 'NBA Finals Recap', 
      upvotes: 120, 
      content: 'The NBA Finals were intense this year!', 
      image: 'https://static01.nyt.com/athletic/uploads/wp/2025/06/06025630/GettyImages-2218140923-scaled-e1749193014850.jpg?width=1200&height=675&fit=cover', 
      comments: ['Great game!', 'Can\'t believe the outcome!', 'What a season!']
    },
    {
      id: 2, 
      time: '5 hours', 
      title: 'Lakers Trade Rumors', 
      upvotes: 36, 
      content: 'What will the Lakers do this offseason?', 
      image: 'https://ca-times.brightspotcdn.com/dims4/default/f1c750a/2147483647/strip/true/crop/2000x1333+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fbd%2Ff6%2Ff10f5f0d4dac9efe9da9dcff194c%2Fluka.jpg', 
      comments: ['Will they keep Luka?', 'They need a center.']
    },
  ]

  const element = useRoutes([
    {
      path: '/',
      element: <Home data={posts}/>
    },
    {
      path: '/post/:id',
      element: <PostDetailsWrapper />
    }
  ])

  return (
    <>
     <Header></Header> 
     <div className="main-content">
      {element}
    </div>
    </>
  )
}

export default App
