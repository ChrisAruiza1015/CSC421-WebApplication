import { Routes, Route, NavLink } from "react-router-dom";
import {Home} from "./Home";
import {Landing} from "./Landing";
import {ProtectedRoute}  from "./utils/ProtectedRoute";
import React, { useState } from "react";
import {fakeAuth} from "./utils/FakeAuth"
import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";
import {Signup} from "./Signup"
import { DisplayUsers } from "./DisplayUsers";
import { DisplayIndividual } from "./DisplayIndividual";
export const AuthContext = React.createContext(null);  // we will use this in other components

const App = () => {
    
    const handleLogin = async () => {

        const token = await fakeAuth();
        setToken(token);
      
      };

    const handleLogout = () => {
    setToken(null);
    };
      
    const[user, setUser] = useState(null);
    const [token, setToken] = useState(null);


    return (
        
        <AuthProvider>
          <Navigation />
         
      
          <Routes>
            <Route index element={<Home />} />
            <Route
                path="landing"
                element={
                    <ProtectedRoute>
                    <Landing />
                    </ProtectedRoute>
                }
                />
            <Route path="home" element={<Home />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="DisplayUsers" element={<DisplayUsers />} />
            <Route path="DisplayIndividual" element={<DisplayIndividual />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthProvider>
    );
    };
    
const Navigation = () => {
    const { value } = useAuth();
    
    return (
        <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/landing">Landing</NavLink>
        <NavLink to="/DisplayUsers">User List</NavLink>
        <NavLink to="/DisplayIndividual">Search for User</NavLink>
        {value.token && (
            <button type="button" onClick={value.onLogout}>Sign Out</button>)
            }
        </nav>);
};




export default App;
