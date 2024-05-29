import {
    Group,
    Button,
    Box,
  } from '@mantine/core';

  import classes from './Header.module.css';
import { useContext } from 'react';
import { AuthContext } from "../App";
import { Link, useNavigate } from 'react-router-dom';
  
  export default function Header() {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate()
  
    return (
      <Box bg={"#353535"}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            
  
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to="/" className={classes.link}>
                Home
              </Link>
              <a href="#" className={classes.link}>
                Learn
              </a>
              <a href="#" className={classes.link}>
                Academy
              </a>
            </Group>

            {!user ? (
            <Group visibleFrom="sm">
              <Button variant="default" onClick={() => navigate("/login")}>Log in</Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </Group>
          ) :
          (
            <Group visibleFrom="sm">
              <Button variant="default" onClick={() => logout()}>Log out</Button>
              <Button onClick={() => navigate("/profile/"+user.userName.toLowerCase())}>{user.userName}</Button>
            </Group>
          )
          }
            
          </Group>
        </header>
      </Box>
    );
  }