import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Zegovideo() {
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/home/room/${input}`);
  }
  return (
      <div>
        <div>
          <input value={input} onChange={(e)=> setInput(e.target.value)} type='text' placeholder='Enter your room name'/>
          <button onClick={submitHandler}>Join</button>
        </div>
      </div>
  )
}

export default Zegovideo