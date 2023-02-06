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
            password: 'Abc123!'
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
    res.send(is_authenticated);
    
});

app.post("/account/register", (req,res) => {
    
    let new_user = req.body
    console.log("new_user",new_user)
    console.log("users.users_list", users.users_list)
    var current_user = ""
    var user_not_found = true
    for(let i = 0; i < users.users_list.length; i++)
    {
        current_user = users.users_list[i]
        if(new_user.username === current_user.username && new_user.password === current_user.password)
        {
            user_not_found = false
            res.send("User/Password exists already!")
    
        }
    }
    if(user_not_found)
    {
        if(passwordChecker.test(new_user.password))
        {
            users.users_list.push(new_user)
            res.send(true)  
        }
        else
        {
            res.send(false)
        }
    }
    
    
  
});

app.get("/userlist", (req,res) => {
        res.send(users.users_list)
});

app.get("/individualusers", (req,res) => {
    let requested_username = req.query.username
    var users_to_return =[]

    var current_user = ""
    for(let i = 0; i < users.users_list.length; i++)
    {
        current_user = users.users_list[i]
        if(requested_username === current_user.username)
        {
            users_to_return.push(current_user)
        }
    }
  
    res.send(users_to_return)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   