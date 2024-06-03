import { useContext, useEffect, useState } from 'react';
import { environment } from "../../environments/environments";
import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
  } from '@mantine/core';
  import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { user, login } = useContext(AuthContext);

  /*
  const handleLogin = async () => {
    const response = await fetch(environment.apiUrl+'/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include' // Include cookies in requests
    })

    if (response.ok) {
      const user = await response.json();
      login(user)
    } else {
      console.error('Login failed');
    }
  }*/

  const handleLogin = () => {
    event.preventDefault();
    // Logs in by making post request
    fetch(`${environment.apiUrl}/account/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, password}),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => login(data));
      } else {
        console.log("Error or some")
      }
    });
  }

  useEffect(() => {
    if (user) {
      navigate("/dashboard")
    }
          
  }, [user]);

  return (
    <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30} bg={"#242424"}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                Welcome back to Bob&apos;s Body Metrics!
            </Title>

            <TextInput label="Username" placeholder="Your username" required size="md" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <PasswordInput label="Password" placeholder="Your password" required mt="md" size="md" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button fullWidth mt="xl" size="md" onClick={handleLogin}>
                Login
            </Button>

            <Text ta="center" mt="md">
                Don&apos;t have an account?{' '}
                <Anchor href="#" fw={700} onClick={() => navigate("/register")}>
                    Register
                </Anchor>
            </Text>
        </Paper>
    </div>
  )
}

export default Login;