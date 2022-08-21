import React from "react";
import plus from "../assets/plus.svg";

const AddImage = (props) => {
  const handleChange = (e) => {
    const loadedImage = URL.createObjectURL(e.target.files[0]);
    const element = document.querySelector(
      `label[for='image${props.imageId}']`
    );
    element.style.backgroundImage = "url(" + loadedImage + ")";
    if (element.children[0]) {
      element.removeChild(element.children[0]);
    }
  };

  return (
    <div>
      <input
        id={`image${props.imageId}`}
        type="file"
        accept="image/*"
        className="images"
        onChange={handleChange}
      />
      <label className="image-buttons" htmlFor={`image${props.imageId}`}>
        <img src={plus} alt={`Add ${1}`} />
      </label>
    </div>
  );
};

export default AddImage;
