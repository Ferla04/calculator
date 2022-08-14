const bodyTheme = document.querySelector('body')
const resultInput = document.querySelector('#result-input')
const keyboardButtons = document.querySelectorAll('.keyboard button') 
let inputValue = '';

const changeTheme = (theme) => {
  bodyTheme.className = theme
}

const onHandleInput = ( ) => {
  resultInput.value = inputValue
}

const changeInput = ( buttonValue ) => {

  const last =  inputValue[inputValue.length - 1] || buttonValue
  
  checkButtons( last, buttonValue )  
  onHandleInput()
}

const getResultInputValue = ( value ) => {
  const evalText = [...value].map( e => isNaN(e) && e !== '.' ? ` ${e} ` : e ).join('')
  const resultOperation = eval(evalText.replace(/x/g, '*'))
  inputValue = resultOperation%1 !== 0 ? `${resultOperation.toFixed(3)}` : `${resultOperation}`
}

const checkButtons = ( last, buttonValue ) => {

  if( inputValue !== '' && buttonValue === 'DEL' ){
    inputValue = inputValue.slice(0, inputValue.length - 1 )

  }else if( inputValue !== '' && buttonValue === 'RESET' ){
    inputValue = ''

  }else if( inputValue !== '' && buttonValue === '='  && !isNaN( last )){
    getResultInputValue( inputValue )

  }else if( isNaN( last ) && isNaN( buttonValue ) ){
    return 

  }else{
    inputValue += buttonValue
  }

}

onHandleInput()

keyboardButtons.forEach( button => {
  button.addEventListener( 'click', () => changeInput( button.innerHTML ))
})