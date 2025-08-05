import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // 🔍 Handle your search logic here (e.g., navigate or filter posts)
    console.log("Searching for:", searchQuery);
    // You could navigate to `/search?query=...` or trigger a callback
  };

  return (
    <div>
      <header className="header">
        <h1 className="header-title">NBA Hub 🏀</h1>
        <div className="header-center">
          <form onSubmit={handleSearchSubmit} style={{ margin: 0 }}>
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        <div className="header-right">
          <Link to="/">
            <button className="home-button">Home</button>
          </Link>
          <Link to="/new-post">
            <button className="new-post-button">Create New Post</button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
