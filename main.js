const bodyTheme = document.querySelector('body')
const resultInput = document.querySelector('#result-input')
const keyboardButtons = document.querySelectorAll('.keyboard button') 
const exceptionsValues = [ 'Infinity', 'Error' ]
const specialButtons = {
  'RESET': () => inputValue = '',
  'DEL': () => deleteLast(),
  '-': () => inputValue += inputValue[inputValue.length-1] === '-' ? '' : '-'
}
let inputValue = '';

const changeTheme = (theme) => {
  bodyTheme.className = theme
}

const onHandleInput = () => {
  resultInput.value = inputValue
}

const changeInput = ( buttonValue ) => {

  if( exceptionsValues.includes( inputValue ) ) inputValue = ''

  const last =  inputValue[inputValue.length - 1] || buttonValue
  
  checkButtons( last, buttonValue )  
  onHandleInput()
}

const getResultInputValue = ( value ) => {
  const resultOperation = eval(value.replace(/x/g, '*'))

  if( resultOperation === Infinity ) return exceptionsValues[0]

  if( `${resultOperation}` === 'NaN'  ) return exceptionsValues[1]
  
  return resultOperation%1 !== 0 ? `${resultOperation.toFixed(3)}` : `${resultOperation}`
  
}

const checkButtons = ( last, buttonValue ) => {

  if( !!inputValue && buttonValue === '='  && !isNaN( last ) ){
    inputValue = getResultInputValue( inputValue )

  }else if( specialButtons[buttonValue] ){
    specialButtons[buttonValue]()

  }else if( isNaN( last ) && isNaN( buttonValue ) ){
    return

  }else{
    inputValue += buttonValue
  }
}

const deleteLast = () => {
  if( !!inputValue ) inputValue = inputValue.slice(0, inputValue.length - 1 )
}


keyboardButtons.forEach( button => {
  button.addEventListener( 'click', () => changeInput( button.innerHTML ))
})