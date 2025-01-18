import { useEffect, useState } from "react";
import { api } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Priv() {
    const [data, setData] = useState('');
    const axios = api();
    const navigate = useNavigate();
    const { user } = useParams();
    console.log(user);

    useEffect(() => {
        axios
            .get(`users/${user}`)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [user]);
    function HandleSubmit(e) {
        e.preventDefault(); 

        axios
            .post(`users/${user}/follow`)
            .then((res) => {
                console.log("success", res.data);
                navigate(`/requested/${user}/requested`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    return (
        <main className="mt-5">
            <div className="container py-5">
                <Navbar />
                {data ? (
                    <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <h5 className="mb-0">{data.full_name}</h5>
                                <span>@{data.username}</span>
                            </div>
                            <small className="mb-0 text-muted">{data.bio}</small>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary w-100 mb-2"
                                onClick={HandleSubmit} 
                            >
                                Follow
                            </button>
                            <div className="d-flex gap-3">
                                <div>
                                    <div className="profile-label">
                                        <b>{data.posts_count}</b> posts
                                    </div>
                                </div>
                                <div className="profile-dropdown">
                                    <div className="profile-label">
                                        <b>{data.followers_count}</b> followers
                                    </div>
                                </div>
                                <div className="profile-dropdown">
                                    <div className="profile-label">
                                        <b>{data.following_count}</b> following
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="card py-4">
                    <div className="card-body text-center">
                        &#128274; This account is Private
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Priv;
