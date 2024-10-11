import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import onlineMeet from '../assets/onlineMeet.jpg'

function Zegovideo() {
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/home/room/${input}`);
  }
  return (
      <div className='flex w-full h-full flex-col items-center justify-center'>
        <h1 className='heading spanColor !font-anta' >Chat with the Doctor </h1>
        <div className='zego-img'>
          <img src={onlineMeet} className='' alt="" />

        </div>
        
        <div className=' flex w-full h-max flex-row items-center justify-center'>
          <input className='w-max mr-5 p-2 bg-white  border-r-gray-600 border-4' value={input} onChange={(e)=> setInput(e.target.value)} type='text' placeholder='Enter your room name'/>
          <button className=' btn' onClick={submitHandler}>Join</button>
        </div>


      </div>
  )
}

export default Zegovideo