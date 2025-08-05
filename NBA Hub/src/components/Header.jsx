import "./Header.css";
import { Link } from "react-router-dom";


function Header() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">NBA Hub 🏀</h1>
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
