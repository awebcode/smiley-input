import React from 'react'
import { SmileyInput } from './components/SmileyInput'

const App = () => {
    const [value, setValue] = React.useState("")
    
  return (
    <div className='fixed top-0 right-0 left-0'> <h1>{value}</h1><SmileyInput   value={value} setValue={setValue}/></div>
  )
}

export default App