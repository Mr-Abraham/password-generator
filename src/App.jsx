import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setlength] = useState(8);
  const [checked, setChecked] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [Password, setPassword] = useState("");
  const pwdRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (checked) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]:;,.<>?/";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    console.log(pass);
  }, [length, checked, charAllowed, setPassword]);
  const copyToClipBoard = () => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(pwdRef.current.value);
  };
  useEffect(() => {
    generatePassword();
  }, [length, checked, charAllowed, generatePassword]);

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] p-5">
      <h1 className="text-red-400 max-md:text-left   text-center lg:text-6xl md:mb-10 text-4xl mb-5 max-md:text-3xl">
        Password Generator
      </h1>
      <div className="max-md:w-[100%] max-md:bg-black w-[75vw] p-2 max-md:p-4 rounded-lg">
        <header className="flex justify-between bg-white rounded-md p-5 max-md:p-3">
          <input
            type="text"
            className="w-[100%] text-xl text-slate-600  outline-none  
             max-md:text-lg"
            value={Password}
            readOnly
            placeholder="Password"
            ref={pwdRef}
          />
          <button
            className="text-xl font-semibold text-gray-600 hover:text-black max-md:text-sm"
            onClick={generatePassword}
          >
            Regenerate
          </button>
        </header>

        <div className="flex gap-1 justify-around items-center mt-2 p-1 max-md:flex-col max-md:justify-start max-md:items-start">
          <div className="mt-3">
            <input
              type="range"
              name=""
              id="pwdLen"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setlength(e.target.value)}
            />
            <label
              className="text-white ml-5 text-2xl font-semibold max-md:text-lg"
              htmlFor="pwdLen"
            >
              Length : {length}
            </label>
          </div>
          <div className="mt-3">
            <input
              type="checkbox"
              name="numberInp"
              defaultChecked={checked}
              id="numberInp"
              onChange={() => setChecked((prev) => !prev)}
            />
            <label
              className="text-white text-2xl font-semibold ml-5 max-md:text-lg"
              htmlFor="numberInp"
            >
              Include Numbers
            </label>
          </div>
          <div className="mt-3">
            <input
              type="checkbox"
              name="specialChar"
              id="specialChar"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label
              className="text-white text-2xl font-semibold ml-5 max-md:text-lg"
              htmlFor="specialChar"
            >
              Include Characters
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center mt-3 max-md:items-start max-md:justify-start">
          <button
            onClick={copyToClipBoard}
            className=" font-semibold bg-yellow-600 hover:bg-white hover:text-black w-[450px] max-md:w-[100%] max-md:p-1 text-white px-3 py-3 text-2xl max-md:text-lg rounded-md md:mt-5"
          >
            COPY
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
