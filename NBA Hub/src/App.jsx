import { useState, useEffect } from 'react'
import './App.css'
import { useRoutes, useParams } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import PostPage from './pages/Post-Page'
import CreatePost from './pages/Create-Post'
import EditPost from './pages/Edit-Post'
import { supabase } from "./client";

function App() {

  function PostDetailsWrapper() {
    const { id } = useParams();
    const post = posts.find(c => c.id === Number(id));
    return <PostPage {...post} />;
  }

  function EditPostWrapper() {
    const { id } = useParams();
    const post = posts.find(c => c.id === Number(id));

    if (!post) return <p>Loading post info...</p>;

    return <EditPost {...post} image={post.image_url} />;
  }

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select();
    console.log("Supabase data:", data);
    console.log("Supabase error:", error);
    setPosts(data || []);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const element = useRoutes([
    {
      path: '/',
      element: <Home data={posts}/>
    },
    {
      path: '/post/:id',
      element: <PostDetailsWrapper />
    },
    {
      path: '/new-post',
      element: <CreatePost />
    },
    {
      path: '/post/:id/edit',
      element: <EditPostWrapper />
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
