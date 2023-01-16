import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Blog from "./Blog";

function UserBlogs() {
  const id = localStorage.getItem("userId");
  const [user, setUser] = useState();

  const BASE_URL = "https://blog-app-mern.vercel.app";

  // fetching blogs by id
  const fetchBlogData = async () => {
    const resp = await axios.get(`${BASE_URL}/api/blog/user/${id}`);
    if (resp.data.user.blogs.length > 0) {
      setUser(resp.data.user);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div>
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={user.name}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
}

export default UserBlogs;
