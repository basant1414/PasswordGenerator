import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numallowed, setNumAllowed] = useState(false);
  const [charallowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const pwdRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      1;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numallowed, charallowed, setPassword]);

  const copypwdtoclipborad = useCallback(() => {
    pwdRef.current?.select();
    pwdRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numallowed, charallowed, passwordGenerator]);

  return (
    <>
      <div className="container">
        <h1 className="header">Password Generator</h1>
        <div className="content">
          <input
            type="text"
            className="text"
            value={password}
            ref={pwdRef}
            readOnly
          />
          <button onClick={copypwdtoclipborad}>Copy</button>
        </div>
        <div className="lower-content-range">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="range"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label htmlFor="/">Length: {length}</label>
        </div>
        <div className="lower-content-num">
          <input
            type="checkbox"
            defaultChecked={numallowed}
            id="numinput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numinput">Number</label>
        </div>
        <div className="lower-content-Char">
          <input
            type="checkbox"
            defaultChecked={charallowed}
            id="charinput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charinput">Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
