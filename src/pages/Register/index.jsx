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

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const navigate = useNavigate()

  const { user, login } = useContext(AuthContext);

  const handleRegister = () => {
    event.preventDefault();
    if (password !== repeatPassword) {
        console.log("Do not correspond!")
    } else {
        // Logs in by making post request
        fetch(`${environment.apiUrl}/account/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, email, password}),
        }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => login(data));
        } else {
            console.log("Error or some")
        }
        });
    }
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
            <TextInput label="Email address" placeholder="hello@gmail.com" size="md" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <PasswordInput label="Password" placeholder="Your password" required mt="md" size="md" value={password} onChange={(e) => setPassword(e.target.value)} />
            <PasswordInput label="Repeat Password" placeholder="Your password Again" required mt="md" size="md" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            <Button fullWidth mt="xl" size="md" onClick={handleRegister}>
                Register
            </Button>

            <Text ta="center" mt="md">
                Already have an account?{' '}
                <Anchor href="#" fw={700} onClick={() => navigate("/login")}>
                    Login
                </Anchor>
            </Text>
        </Paper>
    </div>
  )
}

export default Register;