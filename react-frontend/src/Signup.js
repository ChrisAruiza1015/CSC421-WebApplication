
import axios from 'axios'

export const Signup = () =>{

    async function setData(e)
    {   
        e.preventDefault();
        const form = document.getElementById("signup")
        const username = form.elements["username"].value
        const password = form.elements["password"].value
        const second_password = form.elements["second_password"].value
        const user = {username: username, password: password}
        if(username === '' || password === '' || second_password === '')
        {
            alert("One or more fields are empty")
        }
        else
        {
            if(password === second_password)
            {
                try {
                    const response = await axios.post('http://localhost:5000/account/register', user);
                    if(response.data === true)
                    {
                        alert("Signed up!")
                    }
                    else if(response.data == "User/Password exists already!")
                    {
                        alert(response.data)
                    }
                    else
                    {
                        alert("Password must contain at least one capital letter,one number, and one symbol!")
                    }
        
                 }
                 catch (error) {
                    console.log(error);
                    return false;
                 }
            }
            else
            {
                alert("The password's do not match!")
            }
        }
        
       
       
    }

    return (
        <div className = "home">
        <h2>Signup</h2>
        <form onSubmit={setData} id = "signup">
                <label for="username">username</label>
                    <input
                        id= "username"
                        name="username"
                        type="text"
                        />
                
                <label for="password"> password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        />
                
                <label for ="second_password"> re-enter password</label>
                    <input
                        id="second_password"
                        name="second_password"
                        type="password"
                        />

                    <br></br>


                <input value="Sign Up" type="submit"/>
                
            </form>
        </div>
    );
};