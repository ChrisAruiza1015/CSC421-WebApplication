const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const { json } = require('express');

app.use(cors());
var users = {
    users_list:
    [
        {
            username: 'chris',
            password: 'abc123'
        }
    ]
    
}

let passwordChecker = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]+)')
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const checkTable = (new_login) => {
    for(var i = 0; i < users.users_list.length; i++)
    {
        var current_user = users.users_list[i]
        if(current_user.username == new_login.username)
            if(current_user.password == new_login.password)
                return true
    }
    return false
}
app.post("/account/login", (req, res) => {
    let new_login = req.body
    const is_authenticated = checkTable(new_login)
    console.log("is_authenticated",is_authenticated)
    res.send(is_authenticated);
    
});

app.post("/account/register", (req,res) => {
    console.log("registering user")
    
    let new_user = req.body
    console.log("new_user",new_user)
    if(passwordChecker.test(new_user.password))
    {
        users.users_list.push(new_user)
        res.send(true)  
    }
    else
    {
        res.send(false)
    }
});

app.get("/userlist", (req,res) => {
    console.log("sending userlist")
    res.send(users.users_list)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   