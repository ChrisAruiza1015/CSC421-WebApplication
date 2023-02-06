
import axios from 'axios'
import React,  {useState,useEffect } from 'react';
export const DisplayIndividual = () => {
    const [userList, setUserList] = useState([]);
    
     async function setData(e)
     {   
        e.preventDefault();
        const form = document.getElementById("search")
        const username = form.elements["username"].value
        if(!username)
        {
            alert("Please enter a username")
        }
        else
        {
            try 
            {   
                axios.get("http://localhost:5000/individualusers", {params : {username : username}}).then(response => {
                    console.log("Response.data",response.data)
                    if(response.data.length == 0)
                        alert("No users match that username!")
                    else
                        setUserList(response.data)    
                    
                });
            }
            catch (error) 
            {
                console.log(error);
                return false;
            }
        }
         
    }
    
    return (
        <div className = "DisplayIndividual">
           <form onSubmit={setData} id = "search">
              
                        <h3>Enter a username to search for:</h3>
                        <label>
                        <input
                            name="username"
                            type="text"
                            />
                        </label>
                        <label>
                        <input value="Search" type="submit"/>
                        </label>
            </form>
            {userList.map((user) => <li>{user.username} - {user.password}</li>)}
        </div>
        
    );
};