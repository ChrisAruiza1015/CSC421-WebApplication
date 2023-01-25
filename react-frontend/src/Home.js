import { useAuth } from "./context/AuthProvider";



export const Home = () => {
    const { value } = useAuth();
    const fixedUser = {username: "bj", password: "pass424"}
   
    const setData = e =>
    {   
        e.preventDefault();
        const form = document.getElementById("signin")
        const username = form.elements["username"].value
        const password = form.elements["password"].value
        const user = {username: username, password: password}
       
        if(JSON.stringify(fixedUser) === JSON.stringify(user))
            value.onLogin()
        else
            alert("Unauthenticated user")
    }

    return (
        <>
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

                </label>
                {!value.token && <input name="Sign In" type="submit"/>}

            </form>
            
        </>
    );
};
    