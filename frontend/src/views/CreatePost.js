import React, { useState } from "react";
import "./CreatePost.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CreatePost() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [postTitle, setPostTitle] = useState("");
  return (
    <div>
      <div className="main-create">
        <div className="center-div">
          <form className="form-div">
            <span className="">Upload Images</span>
            <span className="title-label">Title</span>
            <input className="title"></input>
            <span className="">Location</span>
            <input className="location"></input>

            <span className="category-label">Category</span>
            <select>
              <option>Custom</option>
              <option>Bath</option>
              <option>Kitchen</option>
              <option>Ceiling</option>
            </select>
            <span className="price-label">Price</span>

            <input></input>
            <span className="description-label">Description</span>
            <textarea></textarea>
            <button>Next</button>
          </form>
        </div>
      </div>

      <div className="preview">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}

export default CreatePost;
