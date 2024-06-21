import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numCheck, setnumCheck] = useState(false);
  const [charCheck, setcharCheck] = useState(false);
  const [password, setpassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numCheck) {
      str += "1234567890";
    }
    if (charCheck) {
      str += "`~!@#$%^&*()_+[]\;'.,/<>?:{}|-";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numCheck, charCheck, setpassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numCheck, charCheck, passwordGenerator]);

  const passwordRef = useRef(null)

  const copyPasswordtoClipBoard = useCallback(()=>{
    if(passwordRef.current){
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password)
      console.log("text copied")
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300); // Reset the animation state after 300ms
      
    }
    
    
  },[password,setpassword])

    const buttonStyle = isClicked
    ? { transform: 'scale(1.2)', transition: 'transform 0.3s ease' }
    : { transform: 'scale(1)', transition: 'transform 0.3s ease' };

  return (
    <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-slate-600'>
      <h1 className='text-white text-center'>Password Generator</h1>
      <div className='flex justify-center shadow rounded-lg overflow-hidden mb-4 pb-4'>
        <input 
          type="text"
          value={password}
          className='outline-none rounded-l-md w-full py-1 px-3'
          readOnly
          placeholder='password'
          ref={passwordRef}
        />
        <button 
        className='bg-blue-500 copybtn text-white rounded-r-md p-x-3'
        onClick={copyPasswordtoClipBoard
        }
        >COPY</button>
      </div>
      
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range" 
            id="range"
            min={4}
            max={38}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))} 
          />
          <label htmlFor="range">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            checked={numCheck}
            id='numbercheckbox'
            onChange={() => setnumCheck(prev => !prev)} 
          />
          <label htmlFor="numbercheckbox">include Numbers</label>

          <input 
            type="checkbox" 
            checked={charCheck}
            id='charactercheckbox'
            onChange={() => setcharCheck(prev => !prev)} 
          />
          <label htmlFor="charactercheckbox">include Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
