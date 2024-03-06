import { useState } from 'react'
import { InputBar } from './components/InputBar'
import { SentenceList } from './components/SentenceList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-lvh flex flex-col justify-center items-center gap-5 bg-slate-800 text-slate-200'>
      <p className='font-bold'>sentos</p>
      <InputBar />
      <SentenceList/>
    </div>
  )
}

export default App
