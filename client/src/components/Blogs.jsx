import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Blog from "./Blog";

function Blogs() {
  const [blogs, setBlogs] = useState();

  // fetch the all blog data
  const fetchBlogData = async () => {
    const resp = await axios.get(`/api/blog/`);
    if (resp.data.blogs.length > 0) {
      setBlogs(resp.data.blogs);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);


  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}  
            isUser={localStorage.getItem("userId")===blog.user._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            userName={blog.user.name}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
}

export default Blogs;
