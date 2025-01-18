import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../hooks";
import { useState, useEffect } from "react";
import Profile from "../pages/My-profile";

function Navbar ()  {
    const navigate = useNavigate('');
    const username = localStorage.getItem('name');
    const axios = api();
    const name = localStorage.getItem('username')
    const [user, setUser] = useState();
    const token = localStorage.getItem('token');


    useEffect(() => {
        axios
        .get('users')
        .then((res) => {
            setUser(res.data.username);

        }).catch((err) => {
            console.log(err);
        });
    });

    const HandleDetail = (username) => {
        navigate(`/profile/${username}`)
    }

    
    function Handlelogout() {

        axios
        .post('auth/logout', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        })
        .then((res) => {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            alert(res.data.message);
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        });


        
    }



    return (
        <>
         <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="/home">Facegram</a>
                    <div className="navbar-nav">
                        <a className="nav-link" onClick={() => HandleDetail(username)}>{name}</a>
                        <a className="nav-link" onClick={Handlelogout}>Logout</a>
                    </div>
                </div>
            </nav>
        </>
    )

}
export default Navbar;