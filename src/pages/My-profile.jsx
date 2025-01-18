import { useEffect, useState } from "react";
import { api } from "../hooks";
import Navbar from "../components/Navbar";
import { useBeforeUnload, useFetcher, useNavigate } from "react-router-dom";

function Profile() {

    const daxios = api();
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const name =localStorage.getItem('name');
    console.log('name');

    useEffect(() => {
        daxios.get(`/users/${name}`).then((res) => {
            setData(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err)
        })
    }, [name])

    // const redirect = () => {
    //     navigate('/');
    // }



    useEffect(() => {
        daxios.get(`/users/${name}/followers`).then((res) => {
            setFollowers(res.data.followers);
            console.log(res.data.followers);

        }).catch((err) => {
            console.log(err)
        })
    }, [name])

    useEffect(() => {
      daxios.get(`/users/${name}/following`).then((res) => {
        setFollowing(res.data.followers)

      }).catch((err) => {
        console.log(err);
      })
    }, [ name])
    return (
            
        <main className="mt-5">
    <div className="container py-5">
        {data ? (
            <>
            <Navbar/>
        <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
            <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <h5 className="mb-0"></h5>
                    <span>@{data.full_name}</span>
                </div>
                <small className="mb-0 text-muted">
                   {data.bio}
                </small>
            </div>
            <div>
                <a href="/create-post" className="btn btn-primary w-100 mb-2">
                    + Create new post
                </a>
                <div className="d-flex gap-3">
                    <div>
                        <div className="profile-label"><b>{data.posts_count}</b>posts</div>
                    </div>
                    <div className="profile-dropdown">
                        <div className="profile-label"><b>{data.followers_count}</b> followers</div>
                        {followers && followers.length > 0 && (

                        <div className="profile-list">
                            <div className="card">
                                <div className="card-body">
                                    {followers &&followers.map((followers, i) => (
                                        
                                    <div className="profile-user">
                                        <a href="user-profile-private.html">@{followers.full_name}</a>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                    {following && following.length > 0 && (

                        <div className="profile-dropdown">
                            <div className="profile-label"><b>{data.following_count}</b> following</div>
                            <div className="profile-list">
                                <div className="card">
                                    <div className="card-body">

                                        {following && following.map((following, i) => (

                                        <div className="profile-user">
                                            <a href="user-profile-private.html">@{following.full_name}</a>
                                        </div>
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>

        {data.posts && data.posts.length > 0 ? (
        <div className="row">
            {data.posts.map((post, index) => (
                <div className="col-md-4" key={index}>
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="card-images mb-2">
                                <img src={`http://localhost:8000/storage/${post.attachments[0].storage_path}`} alt="image1" className="w-100" />
                            </div>
                            <p className="mb-0 text-muted">{post.caption}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
    <p>No posts available.</p>
)}

            </>
        ) : (
            <p>Loading User data....</p>
        )}
    </div>
</main>
            
    )
}

export default Profile;