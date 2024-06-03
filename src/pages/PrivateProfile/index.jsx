import { environment } from "../../environments/environments";
import { useContext, useEffect, useState } from "react";

import { Card, Avatar, Text, Group, Anchor } from '@mantine/core';
import classes from './styles.module.css';
import { AuthContext } from "../../App";

export default function PrivateProfile() {
    let { user } = useContext(AuthContext)
    const [profile, setProfile] = useState()

    const gender = [
        "Unspecified",
        "Male",
        "Female",
        "Other"
    ]

    const mainLinks = [
        { link: '#', label: 'Activities' },
        { link: '#', label: 'Goals' },
        { link: '#', label: 'Personal Bests' }
      ];

    const profileView = [
        <div key={"Activity"} />,
        <div key={"Goal"} />,
        <div key={"PB"}/>
    ]

    useEffect(() => {
        fetch(`${environment.apiUrl}/profile/user/private/${user.id}`, {
            Method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            if (response.status === 200) {
              response.json().then(setProfile);
            } else {
              console.log("Error or some")
              setProfile()
            }
          }); 
      }, [user]);

      const [active, setActive] = useState(0);
      const mainItems = mainLinks.map((item, index) => (
        <Anchor
          key={item.label}
          className={classes.mainLink}
          data-active={index === active || undefined}
          onClick={(event) => {
            event.preventDefault();
            setActive(index);
          }}
          style={{textDecoration: "none", fontWeight: "600"}}
        >
          {item.label}
        </Anchor>
      ));

    if (!profile) {
        return (
            <div>
                <h1>No profile</h1>
            </div>
        )
    } else {
        return (
            <div>
                
                <Card padding="xl" radius="md" className={classes.card} bg={"#242424"} style={{color: "rgba(255, 255, 255, 0.87)"}}>
                    <Card.Section
                        h={200}
                        style={{
                        backgroundImage:`url(${profile.bgImg})`,
                        backgroundSize: "cover",
                        }}
                    />
                    <div style={{display: "flex", flexDirection: "row", gap: "30px", flexWrap: "wrap"}}>

                    <Avatar
                        src={profile.profileImg}
                        size={200}
                        radius={100}
                        
                        mt={-30}
                        className={classes.avatar}
                    />
                    <div>
                    <Text fz="lg" fw={500} mt="sm">
                        {profile.name}
                    </Text>
                        <Group mt="md" justify="center" gap={30}>
                            <div>
                                <Text ta="center" fz="lg" fw={500}>
                                    {profile.age}
                                </Text>
                                <Text ta="center" fz="sm" c="dimmed" lh={1}>
                                    Age
                                </Text>
                            </div>
                            <div>
                                <Text ta="center" fz="lg" fw={500}>
                                    {gender[profile.gender]}
                                </Text>
                                <Text ta="center" fz="sm" c="dimmed" lh={1}>
                                    Gender
                                </Text>
                            </div>
                            <div>
                                <Text ta="center" fz="lg" fw={500}>
                                    {profile.height} cm
                                </Text>
                                <Text ta="center" fz="sm" c="dimmed" lh={1}>
                                    Height
                                </Text>
                            </div>
                            <div>
                                <Text ta="center" fz="lg" fw={500}>
                                    {profile.weight} kg
                                </Text>
                                <Text ta="center" fz="sm" c="dimmed" lh={1}>
                                    Weight
                                </Text>
                            </div>
                        </Group>
                        </div>
                        <div>
                        <Text fz="lg" fw={500} mt="sm">
                            About me
                        </Text>
                        <Group mt="md" justify="center" style={{color: "rgba(255, 255, 255, 0.87)"}}>
                            <Text fz="sm" fw={400}>
                                {profile.bio}
                            </Text>
                        </Group>
                        </div>
                    </div>
                </Card>
                <Group gap={30} justify="center" className={classes.mainLinks}>
                    {mainItems}
                </Group>
               {profileView[active]}
            </div>
        )
    }
}