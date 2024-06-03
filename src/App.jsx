import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PublicProfile from './pages/PublicProfile'
import PrivateProfile from './pages/PrivateProfile'
import Header from './components/Header'
import { createContext, useState } from 'react'
import '@mantine/core/styles.css';
import { MantineProvider, createTheme, virtualColor } from '@mantine/core';
import Dashboard from './pages/Dashboard'
import { ProfileList } from './pages/ProfilesList'
import AddActivity from './pages/AddActivity'

const AuthContext = createContext();

const loadUserDataFromStorage = () => {
  const userVal = localStorage.getItem("authUser");
  if (userVal !== undefined || userVal !== null) return JSON.parse(userVal);
  return null;
};

const theme = createTheme({
  colors: {
    primary: virtualColor({ name: 'primary', light: 'red', dark: 'red' }),
  },
});

function App() {
  const [user, setUser] = useState(loadUserDataFromStorage());

  const navigate = useNavigate();

  // called when we successfully log in
  const login = (user) => {
    setUser(user);
    // update local storage
    localStorage.setItem("authUser", JSON.stringify(user));
    // redirect to home page after login
    navigate("/");
  };

  // called to logout: clear local storage + reset local state
  const logout = () => {
    // reset local user auth state
    setUser(null);
    // clear local storage
    localStorage.removeItem("authUser");
    // redirect to login page
    navigate("/login");
  };

  return (
    <MantineProvider theme={theme}>
      <AuthContext.Provider value={{ user, login, logout }}>
          <Header />
          <div className='app-container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addactivity" element={<AddActivity />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateProfile />} />
            <Route path="/profile/:username" element={<PublicProfile />} />
            <Route path="/profiles" element={<ProfileList />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </MantineProvider>
  )
}

export { App, AuthContext }
