const theme=['purple','light','violet'];
let themeSelect=0
let screen=''
let prevScreen=''
let result=0;
let inputValue=0;
let selectedOpt="";

const bubble=document.querySelector('.bubble');
const section=document.querySelector('section');
const numBtns=document.querySelectorAll('.num');
const screenInput=document.querySelector('.screen-input')
const optBtns=document.querySelectorAll('#opt-btn')
const solvebtn=document.querySelector('.solve-btn')
const resetBtn=document.querySelector('#reset-btn')
const delBtn=document.querySelector('#del-btn')
const themeOverlay=document.querySelector('.theme-overlay')


bubble.addEventListener('click', ()=>{
    ++themeSelect;
    if(themeSelect>2){
        themeSelect=0
    }
    section.setAttribute('class', theme[themeSelect])
})
themeOverlay.addEventListener('dblclick',()=>{
    localStorage.setItem("calctheme1.0", theme[themeSelect])
    document.querySelector('.save').classList.add('show-save')
    setTimeout(()=>{
        document.querySelector('.save').classList.remove('show-save')
    },1000)
})
window.addEventListener('load',()=>{
    if(localStorage.getItem('calctheme1.0')){
        themeSelect=theme.indexOf(localStorage.getItem('calctheme1.0'))
        section.setAttribute('class', theme[theme.indexOf(localStorage.getItem('calctheme1.0'))])
    }
    else{
        section.setAttribute('class', theme[themeSelect])
    }
})
window.addEventListener('keyup', (e)=>{
    const btnsSym=['1','2','3','4','5','6','7','8','9','0','.']
    const optSym=['/','+','-','*']
    const sym=e.key.toLowerCase();

    if(btnsSym.includes(sym)){
        inputFunc(sym)
    }
    else if(optSym.includes(sym)){
        optFunc(sym)
    }
    else if(sym==='enter'){
        solveFunc()
    }
    else if(sym==='backspace'){
        delFunc()
    }
    else if(sym==='delete'){
        resetFunc()
    }
    
})

numBtns.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        let id= btn.id;
        inputFunc(id)
    })
})

optBtns.forEach((btn)=>{
    btn.addEventListener('click', ()=>{
        let id=btn.dataset.id;

        if(prevScreen==='' && id==='-'){
            console.log(1)
            inputFunc(id)
        }
        else if(selectedOpt==="" && screen!=="" && id==='-'){
            console.log(2)
            if(!isNaN(Number(screen))){
                optFunc(id)

            }
        }

        else if(selectedOpt==="" && screen!==""){
            console.log(3)
            if(!isNaN(Number(screen))){
                optFunc(id)
            }
        }
        else if(selectedOpt!==""){
            console.log(4)
            if(!isNaN(Number(screen))){
                solveFunc()
                optFunc(id)
            }
        }
        else{
            console.log(5)
            if(!isNaN(Number(screen))){
                optFunc(id)
            }
        }
        
    })
})


solvebtn.addEventListener('click',()=>{
    solveFunc()
    selectedOpt=""
})
resetBtn.addEventListener('click',resetFunc)
delBtn.addEventListener('click',delFunc)

function inputFunc(id){
    
    if(id==='.'){
        if(!(/\./.test(screen))){
            screen+=id;
            inputValue=Number(screen);
            screenInput.innerHTML+=id
        }
    }
    else if(id==='0'){
        if(/\./.test(screen)){
            screen+=id;
            inputValue=Number(screen);
            screenInput.innerHTML+=id
        }

        else{
            screen+=id;
            inputValue=Number(screen);
            screenInput.innerHTML=inputValue.toLocaleString('en',{maximumFractionDigits:5});
        }
    }
    else if(id==='-'){
        screen+=id;
        inputValue=Number(screen);
        screenInput.innerHTML=screen
    }
    else{
        screen+=id;
        inputValue=Number(screen);
        screenInput.innerHTML=inputValue.toLocaleString('en',{maximumFractionDigits:5});
    }
    prevScreen=screen
    
}

function solveFunc(){
    if(selectedOpt===""){
        result=inputValue
    }
    else{
        switch (selectedOpt){
            case '+':
                result+=inputValue
                break;
            case '/':
                result/=inputValue
                break;
            case '*':
                result*=inputValue
                break;
            case '-':
                result-=inputValue
                break;
            default:
                break
        }

    }
    inputValue=result;
    prevScreen=screen;
    screen='';
    document.querySelector('.sign').innerHTML='='
    screenInput.innerHTML=result.toLocaleString('en',{maximumFractionDigits:5});
}

function resetFunc(){
    result=0;
    inputValue=0;
    prevScreen=''
    screen='';
    selectedOpt=''
    document.querySelector('.sign').innerHTML=''
    screenInput.innerHTML=result
}

function delFunc(){
    console.log(inputValue)
    screen=`${inputValue}`
    screen= screen.slice(0,screen.length-1);
    console.log(screen)
    inputValue=Number(screen);
    console.log(screen)
    document.querySelector('.sign').innerHTML=""
    if(screen===""){
        screenInput.innerHTML=0;
    }
    else if(screen==='-'){
        screenInput.innerHTML=screen;
    }
    else{
        screenInput.innerHTML=inputValue.toLocaleString('en');
    }

}

function optFunc(id){
    selectedOpt=id;
    result=inputValue;
    screen=''
    if(id==='/'){
        document.querySelector('.sign').innerHTML='&#247;'
    }
    else if(id==='*'){
        document.querySelector('.sign').innerHTML='&#215;'
    }
    else{
        document.querySelector('.sign').innerHTML=id
    }
}