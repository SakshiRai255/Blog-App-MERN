import './App.css';
import Header from './components/Header';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import UserBlogs from './components/UserBlogs'
import {Routes,Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './components/store';
import { Navigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);

useEffect(()=>{
if (localStorage.getItem("userId")) {
  dispatch(authActions.login())
}
},[dispatch])

  return (
    <>
    <header>
      <Header/>
      </header>
      <main>

      <Routes>

      <Route path='/' element={isLoggedIn ?<Navigate to = "blogs"/> :<Navigate to = "auth"/> }/>
      <Route path="/auth" element={isLoggedIn ? <Navigate to="/blogs" /> : <Auth />}/>
      <Route path='/blogs' element={isLoggedIn ? <Blogs/> :<Navigate to = "/auth"/>}/>
      <Route path='/myBlogs' element={isLoggedIn ? <UserBlogs/>:<Navigate to = "/auth"/>}/>
      <Route path='/myBlogs/:id' element={isLoggedIn ? <BlogDetail/> :<Navigate to = "/auth"/>}/>
      <Route path='/blogs/add' element={isLoggedIn ? <AddBlog/> :<Navigate to = "/auth"/>}/>
      
   
     </Routes>
        </main>
    </>
  );
}

export default App;
