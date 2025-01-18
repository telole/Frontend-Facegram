import { useEffect, useState } from "react";
import { api } from "../hooks";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
    const [people, setPeople] = useState([]);
    const [posts, setPosts] = useState([]);
    const [followers, setFollowers] = useState([]);
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const beaxios = api();

    useEffect(() => {
        beaxios.get("posts").then(res => {
            setPosts(res.data.post);
        }).catch(err => {
            console.log("Error fetching posts:", err.response);
        });
    }, []);

    useEffect(() => {
        beaxios.get('users').then((res) => {
            setPeople(res.data.user);
        }).catch(err => {
            console.log('Error fetching users:', err.response);
        });
    }, []);

    useEffect(() => {
        beaxios.get(`users/${name}/followers`).then((res) => {
            setFollowers(res.data.followers); 
        }).catch(err => {
            console.log('Error fetching followers:', err.response);
        });
    }, []);

    const HandleProfile = (user) => {
        if (user.is_private === 0) {
            navigate(`/user-profile/${user.username}`);
        } else {
            navigate(`/private/${user.username}`);
        }
    };

    const HandleAccept = (username) => {
        beaxios.put(`users/${username}/accept`).then((res) => {
            console.log(res.data);

            setFollowers((prevFollowers) => {
                prevFollowers.filter((followers) => followers.username !== username)
            });
        }).catch((err) => {
            console.log('Error Accpeting Users', err.message);
        })
    }

    

    const followRequests = followers.filter(follower => follower.is_requested === true);

    return (
        <>
            <Navbar />
            <main className="mt-5">
                <div className="container py-5">
                    <div className="row justify-content-between">
                        <div className="col-md-8">
                            <h5 className="mb-3">News Feed</h5>
                            {posts && posts.map((post, i) => (
                                <div key={i} className="card mb-4">
                                    <div className="card-header d-flex align-items-center justify-content-between bg-transparent py-3">
                                        <h6 className="mb-0">{post.user.full_name}</h6>
                                        <small className="text-muted">{post.created_at}</small>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-images mb-2">
                                            {post.attachments.length > 0 && (
                                                <img
                                                    src={`http://localhost:8000/storage/${post.attachments[0].storage_path}`}
                                                    alt="image"
                                                    className="w-100"
                                                />
                                            )}
                                        </div>
                                        <p className="mb-0 text-muted">
                                            <b>
                                                <a href="#!" onClick={() => HandleProfile(post.user)}>
                                                    {post.user.username}
                                                </a>
                                            </b>
                                            {post.caption}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-4">
                            <div className="request-follow mb-4">
                                <h6 className="mb-3">Follow Requests</h6>
                                <div className="request-follow-list">
                                    {followRequests.length > 0 ? (
                                        followRequests.map((request, i) => (
                                            <div key={i} className="card mb-2">
                                                <div className="card-body d-flex align-items-center justify-content-between p-2">
                                                    <a href="#!" onClick={() => HandleProfile(request)}>
                                                        @{request.username}
                                                    </a>
                                                    <button className="btn btn-primary btn-sm" onClick={() => HandleAccept(request.username)}>
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No follow requests.</p>
                                    )}
                                </div>
                            </div>
                            <div className="explore-people">
                                <h6 className="mb-3">Explore People</h6>
                                {people && people.map((user, i) => (
                                    <div key={i} className="explore-people-list">
                                        <div className="card mb-2">
                                            <div className="card-body p-2">
                                                <a href="#!" onClick={() => HandleProfile(user)}>{user.full_name}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Home;