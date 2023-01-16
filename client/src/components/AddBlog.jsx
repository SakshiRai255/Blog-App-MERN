import React, { useState } from "react";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };

  const navigate = useNavigate();
  const initialState = {
    title: "",
    description: "",
    image: "",
  };
  const [inputs, setInputs] = useState({initialState});
  
  // set the value
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //  function to send the Data backend

  const submitData = async (type = "login") => {
    const blogData = {
      title: inputs.title,
      description: inputs.description,
      image: inputs.image,
      user:localStorage.getItem("userId")
    };

    const result = await axios.post(`/api/blog/add`, blogData)
      .catch((error) => console.log(error));

      const data = await result.data
      return data;

  };


  // Submit the data 
  const handleSubmit = (e) => {
    e.preventDefault(e);
    submitData();
    navigate("/blogs")
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        border={3}
        borderColor="green"
        borderRadius={2}
        padding={3}
        margin="auto"
        marginTop={3}
        display="flex"
        flexDirection="column"
        width="80%"
      >
        <Typography
          fontWeight="bold"
          padding={3}
          color="grey"
          variant="h4"
          textAlign="center"
        >
          Post Your Blog
        </Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name="title" onChange={handleChange}  value={inputs.title}/>

        <InputLabel sx={labelStyles}>Description</InputLabel>

        <TextField name="description" onChange={handleChange} value={inputs.description} />

        <InputLabel sx={labelStyles}>ImageURL</InputLabel>

        <TextField name="image" onChange={handleChange} value={inputs.image}  />

        <Button sx={{mt:2,borderRadius:2}} variant="contained" color="warning" type="submit">Submit</Button>
      </Box>
    </form>
  );
}

export default AddBlog;
