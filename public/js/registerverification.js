const regexVerificationChar = /^[a-zA-Z0-9]/;
let inputFieldsEmpty = true;
const inputElements = document.querySelectorAll("input.code_input");
console.log(inputElements)

inputElements.forEach((ele,index)=>{
    console.log(ele)
    ele.addEventListener('keyup', (e)=>{
        if(inputElements[index+1] && regexVerificationChar.test(e.key) && e.key.length==1){
        ele.value = e.key;
        inputElements[index+1].focus();
        inputElements[index+1].value = ""
        }
    });

})

const getVerificationCode = () => {
    let code = '';
    inputElements.forEach((ele,index)=>{
        if(ele.value !== '' && ele.value !== null) {
            code = code + ele.value
            inputFieldsEmpty = false;
        }else {
            return inputFieldsEmpty = true;
        }
    })
    console.log(code,inputFieldsEmpty)
    return {"verificationcode" : code, "inputFieldsEmpty" : inputFieldsEmpty };
}


const sendVerificationCode = (verificationcode) => {
    let VerificationCodeObj = getVerificationCode();
    if(VerificationCodeObj.inputFieldsEmpty=== false){
    fetch('http://localhost:3000/verificationcode?'+ new URLSearchParams({
    verificationcode : `${VerificationCodeObj.verificationcode}`
    }),{method : 'POST'})
}
}