import React from "react";
import AddImage from "../components/AddImage";

import "./CreatePost.css";

function CreatePost() {
  return (
    <div className="main-create">
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
          <button className="next-button">Next</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
