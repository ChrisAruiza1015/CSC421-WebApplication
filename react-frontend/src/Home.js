import { useAuth } from "./context/AuthProvider";
import axios from 'axios'
import { Routes, Route, NavLink } from "react-router-dom";


export const Home = () => {
    const { value } = useAuth();
   
    async function setData(e)
    {   
        e.preventDefault();
        const form = document.getElementById("signin")
        const username = form.elements["username"].value
        const password = form.elements["password"].value
        const user = {username: username, password: password}
        try {
            const response = await axios.post('http://localhost:5000/account/login', user);
            if(response.data == true)
            {
                value.onLogin()
            }
            else
            {
                alert("User not found or password incorrect")
            }

         }
         catch (error) {
            console.log(error);
            return false;
         }
       
    }

    return (
        <div className = "home">
        <h2>Home (Public)</h2>
            <form onSubmit={setData} id = "signin">
                <label>
                    username
                    <input
                        name="username"
                        type="text"
                        
                        />
                </label>
                <label>
                    password
                    <input
                        name="password"
                        type="password"
                        
                        />
                </label>
                <label>
                    {!value.token && <input value="Sign In" type="submit"/>}
                </label>
               

            </form>
            <h3>Don't have an Account?<NavLink to="/Signup">Sign Up!</NavLink></h3>
        </div>
    );
};
    