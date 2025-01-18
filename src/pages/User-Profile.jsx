import { useEffect, useState } from "react"
import { api } from "../hooks";
import { useParams } from "react-router-dom";

function UserProfile() {

    const [User, setUser] = useState('');
    const [following, setFolllowing] = useState('');
    const [followers, setFollowers] = useState('');
    const axios = api();
    const {name} = useParams();
    console.log(name);


    useEffect(() => {
        axios.get(`users/${name}`).then((res) => {
            setUser(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log('Error fetch Data', err.message);
        })
    }, [name])

    useEffect(() => {
        axios.get(`users/${name}/following`).then((res) => {
            setFolllowing(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [name])
    useEffect(() => {
        axios.get(`users/${name}/followers`).then((res) => {
            setFollowers(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [name])

    // function acceptrequest() => {

    // }

    return (


        <>
        
  {User ? (

        <main className="mt-5">
            <div className="container py-5">
                <div className="px-5 py-4 bg-light mb-4 d-flex align-items-center justify-content-between">
                    <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                            <h5 className="mb-0">{User.username}</h5>
                            <span>@{User.full_name}</span>
                        </div>
                        <small className="mb-0 text-muted">
                          {User.bio}
                        </small>
                    </div>
                        <div>
                            <a href="user-profile-following.html" className="btn btn-primary w-100 mb-2">
                            {User === 'not-following' ? 'Follow' : 'Unfollow'}
                            </a>
                        <div className="d-flex gap-3">
                            <div>
                                <div className="profile-label"><b>{User.posts_count}</b>posts</div>
                            </div>
                            <div className="profile-dropdown">
                                <div className="profile-label"><b>{User.followers_count}</b> followers</div>
                                <div className="profile-list">
                                    {following.followers && following.followers.length > 0 && (

                                    <div className="card">
                                        <div className="card-body">
                                    {following && following.followers.map((following, i) => (

                                            <div className="profile-user">
                                                <a href="user-profile-private.html">@{following.full_name}</a>
                                            </div>
                                    ))}
                                             
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div className="profile-dropdown">
                                <div className="profile-label"><b>{User.following_count}</b> following</div>
                                <div className="profile-list">
                                    {followers.followers && following.followers.length > 0 &&  (

                                    <div className="card">
                                        <div className="card-body">
                                            {followers && followers.followers.map((follower, i) => (
                                                
                                            <div className="profile-user">
                                                <a href="user-profile-private.html">@{follower.full_name}</a>
                                            </div>
                                            )) }
                                        </div>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {User.posts && User.posts.length > 0 && (
                <div className="row justify-content-center">
                    {User && User.posts.map((posts, i) => (

                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="card-images mb-2">
                                    <img src={`http://localhost:8000/storage/${posts.attachments[0].storage_path}`} alt="image" className="w-100"/>
                                </div>
                                <p className="mb-0 text-muted">{posts.caption}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                )}
            </div>
        </main>
  ) : (
    <p>Loading....</p>
  )}
 </>
    )
}

export default UserProfile;