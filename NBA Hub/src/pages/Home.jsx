import "./Home.css";
import Post from "../components/Post";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useState } from "react";

const Home = ({ data }) => {
  const [order, setOrder] = useState("new");

  const handleOrder = (type) => {
    setOrder(type);
  };

  const sortedData =
    data && data.length > 0
      ? [...data].sort((a, b) => {
          if (order === "new") {
            return b.id - a.id;
          } else {
            return b.upvotes - a.upvotes;
          }
        })
      : [];

  return (
    <div className="home-container">
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
      <div className="posts-container">
        {sortedData.length > 0 ? (
          sortedData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              time={formatDistanceToNow(parseISO(post.created_at), { addSuffix: true })}
              title={post.title}
              upvotes={post.upvotes}
            />
          ))
        ) : (
          <h2 className="no-posts-text">{"There are currently no posts."}</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
