import { useState,useEffect } from "react";

export const useSocket=(userId)=>{
    const [socket,setSocket]=useState()
    useEffect(()=>{
        const ws = new WebSocket(`ws://localhost:8080?userId=${userId}`);  // Replace with your WebSocket server URL
        ws.onopen=()=>{
            console.log("connected")
            setSocket(ws)
        }
        ws.onclose=()=>{
            console.log("disconnected");
            setSocket(null)

        }

        return ()=>{
            ws.close()
        }
    },[])
    return socket;
}