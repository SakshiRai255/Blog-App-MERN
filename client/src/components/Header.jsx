import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { authActions } from "./store";

function Header() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  const [value, setValue] = useState();

  return (
    <AppBar sx={{ backgroundColor: "#1e8185" }} position="sticky">
      <Toolbar>
        <Typography variant="h5">Blogs App</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(value) => setValue(value)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All blog" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 0.5, borderRadius: 2 }}
                color="warning"
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 0.5, borderRadius: 2 }}
                color="warning"
              >
                SignUp
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: 0.5, borderRadius: 2 }}
              color="warning"
              onClick={()=>dispatch(authActions.logout())}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
