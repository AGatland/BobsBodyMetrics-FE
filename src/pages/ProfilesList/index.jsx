import { Avatar, Badge, Table, Group, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { environment } from '../../environments/environments';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const gender = [
    "Unspecified",
    "Male",
    "Female",
    "Other"
]

export function ProfileList() {
    let { user } = useContext(AuthContext)
    const [profiles, setProfiles] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${environment.apiUrl}/profile/list/${user.id}`, {
            Method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => {
            if (response.status === 200) {
              response.json().then(setProfiles);
            } else {
              console.log("Error or some")
              setProfiles()
            }
          }); 
      }, [user]);

    if (!profiles) {
        return (
            <div>
                <h1>No profile</h1>
            </div>
        )}

  const rows = profiles.map((item) => (
    <Table.Tr key={item.userName} onClick={() => navigate("/profile/"+item.userName)} className={classes.row}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={item.profileImg} radius={40} />
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.userName}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm" fw={500}>{item.age}</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm" fw={500}>{gender[item.gender]}</Text>
      </Table.Td>

      {item.userId != user.id ? (
      <Table.Td>
        {item.friendStatus == 2 ? (
          <Badge fullWidth variant="light">
            Friends
          </Badge>
        ) : item.friendStatus == 1 ? (
            <Badge  color="green" fullWidth variant="light">
              Pending
            </Badge>
          ) : (
            <Badge color="gray" fullWidth variant="light" onClick={() => console.log("FRIENDING")} className={classes.sendFRButton}>
              Send Request
            </Badge>
          )}
      </Table.Td>) : (
      <Table.Td>
          <Badge color="red" fullWidth variant="light">
            THIS IS ME
          </Badge>
      </Table.Td>)}
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800} style={{color: "rgba(255, 255, 255, 0.87)"}}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Users</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Gender</Table.Th>
            <Table.Th>Friend Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}