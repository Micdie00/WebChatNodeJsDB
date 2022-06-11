const path = require('path')
const http = require('http')
const express = require('express');
const socketio = require('socket.io');

const  db = require('./utils/database.js');

const rs = require('./utils/registerSession');

const mail = require('./utils/email.js');
const sendEmail = mail.sendEmail;
const getUsernames = db.getUsernames;
const getEmails = db.getEmails
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const router = express.Router();

const registerSession = rs.registerSession;
const makeid = rs.makeid;

const listOfUsernames = [];
const listOfEmails = [];

const listOfRegisterSessions = [];


// set static folder
app.use(express.static('public'));

app.post('/registerReq', async (req, res) => {
    console.log(req.query);
    if(req.query.username && req.query.password && req.query.email){
        let actualRegisterSession =new registerSession(req.query.username,req.query.password,req.query.email);
        actualRegisterSession.key = makeid(6);
        listOfRegisterSessions.push(actualRegisterSession);
        await sendEmail(req.query.email)
        res.sendFile(path.join(__dirname, 'public/index.html'));
       
        

    }
});

 app.get('/usernames', async (req,res) => {
    await getUsernames(listOfUsernames);
    let isUnique = true;
    for(let i = 0; i < listOfUsernames.length; i++){
        if(listOfUsernames[i].username=== req.query.username){
            isUnique= false;
            break;
        }
    }
    res.json({username : `${isUnique}`});
})  

app.get('/emails', async (req,res) => {
    await getEmails(listOfEmails);
    let isUnique = true;
    for(let i =0; i < listOfEmails.length; i++){
        if(listOfEmails[i].email === req.query.email){
            console.log(listOfEmails[i].email)
            isUnique = false;
            break;
        }
    }
    res.json({email : `${isUnique}`});
})




console.log(__dirname);
//determine port
const PORT = 3000 || process.env.PORT;
// start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



