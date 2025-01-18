import { data, useNavigate, useParams } from "react-router-dom";
import { api } from "../hooks"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Request() {

    const axios = api();
    const navigate = useNavigate();
    const [Data, setData] = useState('');
    const {user} = useParams();

    useEffect(() => {
        axios.get(`users/${user}`)
        .then((res)=> {
            setData(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log('Error fetch data', err.message);
        })
        }, [])
        

    return (
       
                <main class="mt-5">
            <div class="container py-5">
                { Data  ? (
                    <>
                    <Navbar/>
                <div class="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <div class="d-flex align-items-center gap-2 mb-1">
                            <h5 class="mb-0">{Data.full_name}</h5>
                            <span>@{Data.username}</span>
                        </div>
                        <small class="mb-0 text-muted">
                           {Data.bio}
                        </small>
                    </div>
                    <div>
                        <a href="user-profile-private.html" class="btn btn-secondary w-100 mb-2">
                            Requested
                        </a>
                        <div class="d-flex gap-3">
                            <div>
                                <div class="profile-label">
                                    <b>{data.posts_count}</b> posts
                                </div>
                            </div>
                            <div class="profile-dropdown">
                                <div class="profile-label">
                                    <b>{Data.followers_count}</b> followers
                                </div>
                            </div>
                            <div class="profile-dropdown">
                                <div class="profile-label">
                                    <b>{Data.following_count}</b> following
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                ) : (
                    <p>Loading...........</p>

                )}
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="card py-4">
                            <div class="card-body text-center">
                                &#128274; This account is private
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  
    )
}

export default Request;