import "./Home.css";
import Post from "../components/Post";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useLocation } from "react-router-dom"; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [order, setOrder] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();  

 
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
  };

 
  useEffect(() => {
    fetchPosts();
  }, []);

 
  useEffect(() => {
    if (location.state?.refresh) {
      fetchPosts();
      
    }
  }, [location.state]);

  const handleOrder = (type) => {
    setOrder(type);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

 
  const sortedData =
    filteredPosts && filteredPosts.length > 0
      ? [...filteredPosts].sort((a, b) => {
          if (order === "new") {
            return new Date(b.created_at) - new Date(a.created_at);
          } else {
            return b.upvotes - a.upvotes;
          }
        })
      : [];

  return (
    <div className="home-page-wrapper">
      <div className="search-order-wrapper">
        <form onSubmit={handleSearchSubmit} style={{ margin: 0 }}>
          <input
            type="text"
            placeholder="Search Posts..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="order-container">
          <p className="order-text">Order by:</p>
          <button
            className={`new-button${order === "new" ? " selected" : ""}`}
            onClick={() => handleOrder("new")}
          >
            Newest
          </button>
          <button
            className={`popular-button${order === "popular" ? " selected" : ""}`}
            onClick={() => handleOrder("popular")}
          >
            Most Popular
          </button>
        </div>
      </div>

      <div className="posts-container">
        {sortedData.length > 0 ? (
          sortedData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              time={formatDistanceToNow(parseISO(post.created_at), {
                addSuffix: true,
              })}
              title={post.title}
              upvotes={post.upvotes}
            />
          ))
        ) : (
          <h2 className="no-posts-text">No posts have been found.</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
