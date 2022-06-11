const sql = require('mssql');




async function getUsernames(listOfUsernames) {
    try {
      listOfUsernames.length =0;
    await sql.connect('Server=DESKTOP-6E1PAOT,1433;Database=WebChatNodeJsDB;User Id=Micdie;Password=Micdie2022!;Encrypt=true;trustServerCertificate=true');
    const result = await sql.query`select username from registerSession`;
    console.dir(result);
    console.log(result.recordset[0].username)
    for (let i = 0; i < result.recordset.length; i++){
      listOfUsernames.push(result.recordset[i]);
    }
    sql.close();
    } catch (err) {
        console.log(err)
    }
}


async function getEmails(listOfEmails) {
  try {
    listOfEmails.length =0;
  await sql.connect('Server=DESKTOP-6E1PAOT,1433;Database=WebChatNodeJsDB;User Id=Micdie;Password=Micdie2022!;Encrypt=true;trustServerCertificate=true');
  const result = await sql.query`select email from registerSession`;
  console.dir(result);
  console.log(result.recordset[0].email)
  for (let i = 0; i < result.recordset.length; i++){
    listOfEmails.push(result.recordset[i]);
  }
  sql.close();
  } catch (err) {
      console.log(err)
  }
}

async function inserRegisterSession(registerSession){
  try {
    await sql.connect('Server=DESKTOP-6E1PAOT,1433;Database=WebChatNodeJsDB;User Id=Micdie;Password=Micdie2022!;Encrypt=true;trustServerCertificate=true');
    await sql.query`insert into registerSession (username,password,email) values(${registerSession.username},${registerSession.password},${registerSession.email}) `;
    sql.close();
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
 getUsernames,
 getEmails,
 inserRegisterSession
};