import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // ref
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}-=/*.:'|[]<>~`";

    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPassToClip = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>passwordGenerator(),[setLength,passwordGenerator,numberAllowed,charAllowed])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">

        <h1 className='text-4xl text-center text-white my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef} />
          <button onClick={copyPassToClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> Copy</button>
        </div>


        <div className="flex text-sm gap-x-2">

          <div className="flex items-center gap-x-1">
            <input type="range" min={1} max={100} value={length} className='cursor-pointer' onChange={(e) => setLength(e.target.value)} />
            <label >Length: {length}</label>
          </div>


          <div className='flex items-center gap-x-1 '>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => setNumberAllowed(prev => !prev)} />
            <label>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1 '>
            <input type="checkbox" defaultChecked={charAllowed} id="numberInput" onChange={() => setCharAllowed(prev => !prev)} />
            <label>Special Characters</label>
          </div>

        </div>
        <div>
        <button className='text-center my-3 flex items-center' onClick={passwordGenerator} type="button" >Generate</button>
        <button className='text-center my-3 flex items-center' onClick={()=>setPassword("")} type="button" >clear</button>

        </div>
      </div>
    </>
  )
}

export default App
