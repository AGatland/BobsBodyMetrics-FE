import { useParams } from "react-router-dom"
import { environment } from "../../environments/environments";
import { useEffect, useState } from "react";

export default function PublicProfile() {
    let { username } = useParams()
    const [profile, setProfile] = useState({})

    useEffect(() => {
        fetch(`${environment.apiUrl}/profile/user/${username}`, {
            Method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(setProfile)
              
      }, [username]);

    if (!profile) {
        return (
            <div>
                <h1>No profile</h1>
            </div>
        )
    }
    return (
        <div>
            <h1>Wowzies, profile</h1>
            <h2>{profile.name}</h2>
        </div>
    )
}