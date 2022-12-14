const theme=['theme-1','theme-2','theme-3'];
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
const themebtns=document.querySelectorAll('.theme')
themebtns.forEach((btn,index)=>{
    btn.addEventListener('click',()=>{
        themeSelect=index
        section.setAttribute('class',theme[themeSelect])
    })
})

bubble.addEventListener('click',()=>{
    localStorage.setItem("calctheme1.0", theme[themeSelect])
    document.querySelector('.save').classList.add('show-save')
    document.querySelector('.save').innerHTML='saved'
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

// KeyBoard Event
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
            //inputing negative number
            inputFunc(id)
        }
        else if(selectedOpt==="" && screen!=="" && id==='-'){
            //performing subtraction operation
            if(!isNaN(Number(screen))){
                optFunc(id)

            }
        }

        else if(selectedOpt==="" && screen!==""){
            //performing anyother operation
            if(!isNaN(Number(screen))){
                optFunc(id)
            }
        }
        else if(selectedOpt!==""){
            //performing next operation after previous operation
            if(!isNaN(Number(screen))){
                solveFunc()
                optFunc(id)
            }
        }
        else{
            //Just don't know what I have missed
            if(!isNaN(Number(screen))){
                optFunc(id)
            }
        }
        
    })
})


solvebtn.addEventListener('click',()=>{
    //solving math operation
    solveFunc()
    selectedOpt=""
})
resetBtn.addEventListener('click',resetFunc)
delBtn.addEventListener('click',delFunc)

function inputFunc(id){
    if(screen.length<16){

        if(id==='.'){
            if(!(/\./.test(screen))){
                screen+=id;
                inputValue=Number(screen);
                screenFormat(document.querySelector('.screen-input').innerHTML+=id)
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
                screenFormat(inputValue.toLocaleString('en',{maximumFractionDigits:5}))
            }
        }
        else if(id==='-'){
            screen+=id;
            inputValue=Number(screen);
            screenFormat(screen)
        }
        else{
            screen+=id;
            inputValue=Number(screen);
            screenFormat(inputValue.toLocaleString('en',{maximumFractionDigits:5}))
        }
        prevScreen=screen
        
    }
    else{
        document.querySelector('.save').classList.add('show-save')
        document.querySelector('.save').innerHTML='T00 MANY INPUT'
        setTimeout(()=>{
            document.querySelector('.save').classList.remove('show-save')
        },1000)
    }
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
    screenFormat(result.toLocaleString('en',{maximumFractionDigits:5}))
}

function resetFunc(){
    result=0;
    inputValue=0;
    prevScreen=''
    screen='';
    selectedOpt=''
    document.querySelector('.sign').innerHTML=''
    screenFormat(result)
    document.querySelector('.screen-input').id=""
}

function delFunc(){
    screen=`${inputValue}`
    screen= screen.slice(0,screen.length-1);
    inputValue=Number(screen);
    document.querySelector('.sign').innerHTML=""
    document.querySelector('.screen-input').id=""
    if(screen===""){
        screenFormat(0)
    }
    else if(screen==='-'){
        screenFormat(screen)
    }
    else{
        screenFormat(inputValue.toLocaleString('en'))
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

function screenFormat(str){
    screenInput.innerHTML=str
    let mainScreenWidth=document.querySelector('.calc-screen').getBoundingClientRect().width-30;
    let screenWidth=document.querySelector('.screen-input').getBoundingClientRect().width
    if(screenWidth>mainScreenWidth){
        // screenInput.style.fontSize=`40px`
        console.log('in')
        if(document.querySelector('.screen-input').id!=='overflow'){
            document.querySelector('.screen-input').id='overflow'
        }
    }
}

// function mediaQueryFunc(){

// }