const inputElements = [...document.querySelectorAll('code_input')];

inputElements.forEach((ele,index)=>{
    console.log('HI')
    ele.addEventListener('keydown', (e)=>{
        inputElements[index+1].focus();
        console.log('HI')
    });

})