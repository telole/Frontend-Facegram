import { useState } from "react"
import { api } from "../hooks";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";




function Login() {
    const axios = api();
    const [data, setdata] = useState({username: '', password: '' });
    const [Alert, setAlert] = useState(null);
    const navigate = useNavigate();

    function handleChange(e) {
        setdata({...data, [e.target.name]: e.target.value});
    }

    function HandleSubmit(e) {
        e.preventDefault();

        axios
        .post('http://localhost:8000/api/v1/auth/login', data)
        .then((res) => {
            console.log('Login Successfull', res.data);
            if(res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.user[0].username);
                localStorage.setItem('username', res.data.user[0].full_name);
                console.log(res.data.token)
                navigate('/home')
            } else {
                setAlert('invalid Credentials');
            }
        })
        .catch((err) => {
            console.error("Error fetching Data");
            setAlert(err.response?.data?.message || 'Error');
        });
    }
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div className="container">
        <a className="navbar-brand m-auto" href="index.html">Facegram</a>
    </div>
</nav>

<main className="mt-5">
    <div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                        <h5 className="mb-0">Login</h5>
                    </div>
                    <div className="card-body">
                        <form 
                        onSubmit={HandleSubmit}>
                            <div className="mb-2">
                                <label for="username">Username</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="username" 
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label for="password">Password</label>
                                <input type="password" 
                                className="form-control" 
                                id="password" 
                                name="password"
                                value={data.password}
                                onChange={handleChange}/>
                            </div>
                            {Alert && <div className="alert alert-danger">{Alert}</div>}

                            <button type="submit" className="btn btn-primary w-100">
                                Login
                            </button>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-4">
                    Don't have account? <a href="register">Register</a>
                </div>

            </div>


        </div>
    </div>
</main></>
    )
}

export default Login;