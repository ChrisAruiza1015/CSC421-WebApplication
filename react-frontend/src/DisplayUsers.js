
import axios from 'axios'
import React,  {useState,useEffect } from 'react';
export const DisplayUsers = () => {
    const [userList, setUserList] = useState([]);
    
   
    useEffect(() => {
        axios.get("http://localhost:5000/userlist").then(response => {
            setUserList(response.data)
        });
     },[])
    
    
    
    return (
        <div className = "DisplayUsers">
        <h1>User List:</h1>
        {userList.map((user) => <li>{user.username} - {user.password}</li>)}
        </div>
    );
};