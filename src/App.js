import logo from './logo.svg';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/My-profile';
import Create from './pages/CreatePost';
import Priv from './pages/Private-Account';
import Request from './pages/Requested-Form';
import UserProfile from './pages/User-Profile';
// import UserProfile from './pages/User-Profile';

function App() {
  return (
      
      <BrowserRouter>
      <Routes>
        <Route path="/"element={<Login/>}></Route>
        <Route path="/home"element={<Home/>}></Route>
        <Route path="/Register"element={<Register/>}></Route>
        <Route path="/profile/:user"element={<Profile/>}></Route>
        <Route path="/create-post"element={<Create/>}></Route>
        <Route path="/private/:user"element={<Priv/>}></Route>
        <Route path="/requested/:user/requested"element={<Request/>}></Route>
        <Route path="/request/:user"element={<Request/>}></Route>
        <Route path="/user-profile/:name"element={<UserProfile/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
