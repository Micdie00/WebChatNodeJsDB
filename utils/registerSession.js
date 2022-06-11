
function registerSession(username,password,email){
    this.username = username;
    this.password = password;
    this.email = email;
    this.startTime = new Date();
    this.endTime = new Date(this.startTime.getTime() + 5*60000);
    this.status = 'active';
    this.key = '';
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = {
    registerSession,
    makeid
}

