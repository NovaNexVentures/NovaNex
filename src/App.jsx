import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen w-screen bg-amber-700'>
    <Navbar/>
    </div>
  )
}

export default App
