import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let password = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    if (charAllowed) str += "!@#$%^&*()"

    if (numberAllowed) str += '0123456789'

    for (let i = 1; i < length; i++) {
      const char = Math.floor((Math.random() * str.length) + 1)
      password += str.charAt(char)
    }
    setPassword(password)
  }, [length, charAllowed, numberAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  useEffect(() => {
    generatePassword();
  }, [length, charAllowed, numberAllowed])

  return (

    <div className='w-full max-w-md mx-auto shadow-md px-4 py-3 rounded-lg bg-gray-800 text-orange-500'>
      <h1 className='text-white text-centermy-3'>Password Generator</h1>
      <div className='flex rounded-lg shwadow overflow-hidden'>
        <input
          type="text"
          value={password}
          readOnly
          className='outline-none  w-full py-1 px-3'
          placeholder='Password'
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))}
            name='lenth'
            id="" />
          <label htmlFor="lenth">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            name=""
            id=""
            checked={numberAllowed}
            defaultValue={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)} />
          <label htmlFor="Numbers">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            name=""
            id=""
            checked={charAllowed}
            defaultValue={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)} />
          <label htmlFor="Characters">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
