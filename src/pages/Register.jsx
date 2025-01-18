import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Register() {
    const [data, setdata] = useState({full_name : '', username: '', password: '', bio : '', is_private: false});
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    function handleChange (e) {
        const {name, value, type, checked} = e.target;
        setdata({
            ...data, [name]: type === 'checkbox' ? checked : value,
        });

    }

    function HandleSubmit(e) {
        e.preventDefault();

        axios
        .post('http://localhost:8000/api/v1/auth/register', data)
        .then((res) => {
            const token = res.data.token;

            if(token) {
                localStorage.setItem('token', token);
                // alert('account created successfully');
                navigate('/home')
            }else {
                setAlert('A token not found please try again')
            }
        })
        .catch((err) => {
            console.error("Error Response:", err.response?.data); // Cek detail error dari API
            const message = err.response?.data?.message || 'Error occurred during registration';
            setAlert(message)
        })
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
                        <h5 className="mb-0">Register</h5>
                    </div>
                    <div className="card-body">
                        <form action="homepage.html" onSubmit={HandleSubmit} >
                            <div className="mb-2">
                                <label for="full_name">Full Name</label>
                                <input type="text" 
                                className="form-control" 
                                id="full_name" 
                                name="full_name"
                                value={data.full_name}
                                onChange={handleChange}/>
                                
                            </div>

                            <div className="mb-2">
                                <label for="username">Username</label>
                                <input 
                                type="text" 
                                className="form-control"
                                 id="username" 
                                 name="username"
                                 value={data.username}
                                 onChange={handleChange}/>
                            </div>

                            <div className="mb-3">
                                <label for="password">Password</label>
                                <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                name="password"
                                value={data.password}
                                onChange={handleChange}/>
                            </div>

                            <div className="mb-3">
                                <label for="bio">Bio</label>
                                <textarea name="bio" 
                                id="bio" cols="30" rows="3" 
                                className="form-control"
                                value={data.bio}
                                onChange={handleChange}></textarea>
                            </div>

                            <div className="mb-3 d-flex align-items-center gap-2">
                                <input type="checkbox"
                                id="is_private" 
                                name="is_private"
                                value={data.is_private}
                                onChange={handleChange}
                                />
                                <label for="is_private">Private Account</label>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" onSubmit={HandleSubmit}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-4">
                    Already have an account? <a href="index.html">Login</a>
                </div>

            </div>
        </div>
    </div>
</main>
        </>
    )
}

export default Register;