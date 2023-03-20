import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions, autctionsSignup } from "./store";

function Auth() {

  const BASE_URL = "https://blog-app-mern.vercel.app";

  // Format of user Register
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ initialState });
  const [isSignup, setIsSignup] = useState(false);

  // set the value

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //  function to send the Data backend

  const submitData = async (type = "login") => {
    const userData = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };

    const result = await axios.post(`${BASE_URL}/api/user/${type}`, userData)
      .catch((error) => console.log(error));

      const data = await result.data
      return data;

  };

  // Function to Submit the data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      submitData("signup").then((data)=>localStorage.setItem("userId",data.user._id))
      .then(() =>dispatch(authActions.login(navigate("/blogs"))))
      // .then(() =>dispatch(authActionsSignup.signup(navigate("/blogs"))));
    } else {
      submitData().then((data)=>localStorage.setItem("userId",data.user._id))
      .then(() => dispatch(authActions.login(navigate("/blogs"))))
      // .then(() => dispatch(authActions.signup(navigate("/blogs"))))
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              value={inputs.name}
              onChange={handleChange}
              name="name"
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            value={inputs.email}
            onChange={handleChange}
            name="email"
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            value={inputs.password}
            onChange={handleChange}
            name="password"
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            type="submit"
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 2 }}
          >
            Change To {isSignup ? "Signup" : "Login"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth;
