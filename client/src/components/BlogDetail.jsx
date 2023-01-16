import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BlogDetail() {

  const navigate = useNavigate();

  const labelStyles = { mb: 1, mt: 2, fontSize: "20px", fontWeight: "bold" };
  const id = useParams().id;
  const [blogs, setBlogs] = useState();
  const [inputs, setInputs] = useState();

  // set the value
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetching the deatils of blog
  const fetchDetails = async () => {
    const result = await axios.get(`/api/blog/${id}`);

    const data = await result.data;
    return data;
  };

  // Edit the fetching details of blog
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlogs(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);


//  Updating the data in backend
const sendRequest = async() =>{
  const updatedData = {
    title : inputs.title,
    description : inputs.description
  }
  const resp = await axios.put(`/api/blog/update/${id}`,updatedData);
}


  // Submit the data in backend
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
    navigate('/myBlogs/')
  };

  return (
    <div>
      {inputs && (
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
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />

            <InputLabel sx={labelStyles}>Description</InputLabel>

            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
            />

            <Button
              sx={{ mt: 2, borderRadius: 2 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}

export default BlogDetail;
