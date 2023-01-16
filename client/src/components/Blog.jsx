import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { format } from "timeago.js";
import { Box } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Blog({ title, description, image, userName, time, isUser, id }) {

  const BASE_URL = "https://blog-app-mern.vercel.app";

  const navigate = useNavigate();

  // Blog Edit function
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  // delete blog data request

  const deleteRequest = async () => {
    const deleteBlog = await axios.delete(`${BASE_URL}/api/blog/${id}`);
  };

  // Blog Delete function
  const handleDelete = () => {
    deleteRequest();
    navigate("/");
    navigate("/blogs");
  };

  return (
    <div>
      {" "}
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon color="warning"/>
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error"/>
            </IconButton>
          </Box>
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
          subheader={format(time)}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b> {userName}</b>
            {" : "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Blog;
