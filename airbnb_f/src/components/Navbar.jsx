import { FaSearch } from "react-icons/fa";
import { IoGlobeOutline } from "react-icons/io5";
import { BiMenu } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("stays");

  return (
    <nav className="navbar">
      <div className="logo">airbnb</div>
      <div className="nav-tabs">
        <span
          className={activeTab === "stays" ? "active" : ""}
          onClick={() => setActiveTab("stays")}
        >
          Stays
        </span>
        <span
          className={activeTab === "experiences" ? "active" : ""}
          onClick={() => setActiveTab("experiences")}
        >
          Experiences
        </span>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Where" />
        <input type="text" placeholder="Check in" />
        <input type="text" placeholder="Check out" />
        <input type="text" placeholder="Who" />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>
      <div className="nav-icons">
        <span>Airbnb your home</span>
        <IoGlobeOutline />
        <div className="user-menu">
          <BiMenu />
          <AiOutlineUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
