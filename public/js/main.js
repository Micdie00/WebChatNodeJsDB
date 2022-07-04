let usernameFld = document.getElementById('usernameFld');
let passwordFld = document.getElementById('passwordFld');
let emailFld = document.getElementById('emailFld'); 
let emailVerificationFld = document.getElementById('emailVerificationFld');

//tooltip spans
let tooltipTextUsername = document.getElementById('tooltipTextUsername');
let tooltipTextPassword = document.getElementById('tooltipTextPassword');
let tooltipTextEmail = document.getElementById('tooltipTextEmail');
let tooltipTextEmailVerification = document.getElementById('tooltipTextEmailVerification');

const regexUsername = /^\S{5,30}$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// contains timeoutID
let typingTimerUsername;
let typingTimerPassword;
let typingTimerEmail;
let typingTimerEmailVerification;

let regexUsernameBol = true;
let regexPasswordBol = true;
let regexEmailBol = true;
let regexEmailVerificationBol = true;



usernameFld.addEventListener('keyup',  ()=>{
    //clear text of tooltip span
    tooltipTextUsername.textContent = "";
    //stops previous timeout
    clearTimeout(typingTimerUsername);
    if(usernameFld.classList.contains('inputFieldsRed')){
        usernameFld.classList.remove('inputFieldsRed')
        tooltipTextUsername.classList.remove('tooltiptext');
    }
    typingTimerUsername =setTimeout(() => {
        fetch('http://localhost:3000/usernames?' + new URLSearchParams({
            username: `${usernameFld.value}`
            }),{method: 'GET'}).then(response => {return response.json()})
            .then(uniqueUsername => 
        {
       
        if(!regexUsername.test(usernameFld.value)|| uniqueUsername.username === "false"){
            usernameFld.classList.add('inputFieldsRed');
            tooltipTextUsername.classList.add('tooltiptext');
           
            if(uniqueUsername.username === "true"){
            tooltipTextUsername.textContent = 'Your username must be between 5 and 30 characters long';
            }else if(uniqueUsername.username === "false"){
                tooltipTextUsername.textContent = 'Your username is already taken';
            }
            regexUsernameBol=false;
        } else if(regexUsername.test(usernameFld.value) && uniqueUsername.username ==="true") {
            if(usernameFld.classList.contains('inputFieldsRed')){
                usernameFld.classList.remove('inputFieldsRed')
                regexUsernameBol = true;
            }
            regexUsernameBol = true;
        }
        });
    },750)
  
});

passwordFld.addEventListener('keyup', () =>{

    tooltipTextPassword.textContent = "";
    clearTimeout(typingTimerPassword);

    if(passwordFld.classList.contains('inputFieldsRed')){
        passwordFld.classList.remove('inputFieldsRed');
        tooltipTextPassword.classList.remove('tooltiptext');
    }

    typingTimerPassword =setTimeout(() => {
        if(!regexPassword.test(passwordFld.value)){
            passwordFld.classList.add('inputFieldsRed');
            tooltipTextPassword.classList.add('tooltiptext');
            tooltipTextPassword.textContent = 'your password must be at least 8 characters long, contain one uppercase letter, one lowercase letter and one special character!'
            regexPasswordBol=false;
        } else if(regexPassword.test(passwordFld.value)){
            tooltipTextPassword.classList.remove('tooltiptext');
            passwordFld.classList.remove('inputFieldsRed');
            tooltipTextPassword.textContent = '';
            regexPasswordBol = true;
        }
    },750)
    
});



emailFld.addEventListener('keyup', () => {
    
    tooltipTextEmail.textContent = "";
    clearTimeout(typingTimerEmail);

    if(emailFld.classList.contains('inputFieldsRed')){
        emailFld.classList.remove('inputFieldsRed');
        tooltipTextEmail.classList.remove('tooltiptext');
    }

    typingTimerEmail =setTimeout(() => {
        fetch('http://localhost:3000/emails?' + new URLSearchParams({
            email : `${emailFld.value}`
        }),{method : 'GET'}).then(response => {return response.json()}).then(uniqueEmail =>
            {
                console.log(uniqueEmail);
        if(uniqueEmail.email === "false"){
            emailFld.classList.add('inputFieldsRed');
            emailFld.style="font-size: 12px;";
            tooltipTextEmail.classList.add('tooltiptext');
            tooltipTextEmail.textContent = 'your email is already in use'
            regexEmailBol=false;
        } else if(uniqueEmail.email === "true"){
            tooltipTextEmail.classList.remove('tooltiptext');
            emailFld.classList.remove('inputFieldsRed');
            tooltipTextEmail.textContent = '';
            regexEmailBol = true;
        }
        }

    )},750)
})

emailVerificationFld.addEventListener('keyup', ()=>{

    tooltipTextEmailVerification.textContent = "";
    clearTimeout(typingTimerEmailVerification);

    if(emailVerificationFld.classList.contains('inputFieldsRed')){
        emailVerificationFld.classList.remove('inputFieldsRed');
        tooltipTextEmailVerification.classList.remove('tooltiptext');
    }

    typingTimerEmailVerification =setTimeout(() => {
       
            
        if(!(emailFld.value === emailVerificationFld.value) || !regexEmailBol){
            emailVerificationFld.classList.add('inputFieldsRed');
            emailVerificationFld.style="font-size: 12px;";
            tooltipTextEmailVerification.classList.add('tooltiptext');
            if(regexEmailBol){
            tooltipTextEmailVerification.textContent = 'Your entered email differentiate'
            } else {
            tooltipTextEmailVerification.textContent = 'your email is already in use'  
            }
            regexEmailVerificationBol=false;
        } else if(emailFld.value === emailVerificationFld.value && regexEmailBol){
            console.log(regexEmailBol);
            tooltipTextEmailVerification.classList.remove('tooltiptext');
            emailVerificationFld.classList.remove('inputFieldsRed');
            tooltipTextEmailVerification.textContent = '';
            regexEmailVerificationBol = true;
        }
        

    },750)

})


const registerReq = () => {
   console.log("in reg req")
    console.log(regexEmailBol,regexUsernameBol,regexPasswordBol,regexEmailVerificationBol)
    if(regexPasswordBol == true && regexUsernameBol == true
       && regexEmailBol == true && regexEmailVerificationBol == true
       && emailFld.value === emailVerificationFld.value
       && emailFld.value !== "" && emailVerificationFld !==""
       ){
    
    fetch('http://localhost:3000/registerReq?' + new URLSearchParams({
    username: `${usernameFld.value}`,
    password: `${passwordFld.value}`,
    email: `${emailFld.value}`,
    emailVerification: `${emailVerificationFld.value}`
    }),{method: 'POST'}).then(response => {return response.text()}).then((html)=>{
    document.body.innerHTML = html;
        });
       }else {
           console.log('doesnt work')
       }
}

const checkUsername = (bool) => {
    console.log('hiho')
    fetch('http://localhost:3000/usernames?' + new URLSearchParams({
    username: `${usernameFld.value}`
    }),{method: 'GET'}).then(response => {return response.json()})
    .then(data => {console.log(data.username); bool = data.username});
    
    
}


