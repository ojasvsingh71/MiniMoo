import { useEffect, useRef, useState } from "react";
import "./index.css";



function Chatbot() {
  const vantaRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (window.VANTA && window.THREE && vantaRef.current) {
      const effect = window.VANTA.NET({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x103e84,
        backgroundColor: 0x000000,
        spacing: 20.0,
        points: 10.0,
        maxDistance: 20.0,
        showDots: true,
      });

      return ()=>{
        if (effect && typeof effect.destroy==="function") {
          effect.destroy();
        }
      };
    }
  }, []);

const handleSend=()=>{
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };


  return(
    <div ref={vantaRef} className="vanta-bg">
      <div className="container">
        <div className="miniContainer">
          <div className="upperContainer">
            <img id="botimg" src="/bot.png" alt="icon" />
            <h1>MiniMoo Chatbot</h1>
          </div>
          <div id="space"></div>
          <div className="chat-box">
            {messages.map((msg,index)=>(
              <div key={index} className="user-message">
                {msg}
              </div>
            ))}
          </div>
      <div className="chat">
            <input id="text" placeholder="Type Something..." value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&& handleSend()} />
            <img id="sendimg" src="/send-message.png" alt="icon2" onClick={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chatbot;
