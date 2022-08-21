import React from "react";
import { useNavigate } from "react-router-dom";
import AddImage from "../components/AddImage";

import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const mapRouteChange = () => {
    const path = "/map";
    navigate(path);
  };

  return (
    <div className="main-create">
      <p className="warepair">Warepair</p>
      <div className="center-div">
        <form className="post-form">
          <span className="images-label">Upload Images</span>
          <div className="images-container">
            <AddImage imageId="1" />
            <AddImage imageId="2" />
            <AddImage imageId="3" />
            <AddImage imageId="4" />
          </div>
          <span className="title-label">Title</span>
          <input className="title"></input>
          <span className="">Location</span>
          <input className="location"></input>

          <span className="category-label">Category</span>
          <select>
            <option>Select</option>
            <option>Bath</option>
            <option>Kitchen</option>
            <option>Ceiling</option>
          </select>
          <span className="phone-number-label">Phone Number</span>
          <input className="phone-number"></input>
          <span className="price-label">Price</span>
          <input className="price"></input>
          <span className="description-label">Description</span>
          <textarea className="description"></textarea>
          <div className="button-container">
            <button classname="cancel-button" onClick={mapRouteChange}>
              Cancel
            </button>
            <button className="next-button">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
