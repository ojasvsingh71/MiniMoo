import { useEffect, useRef, useState } from "react";




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
        color: 0x3ffff1,
        backgroundColor: 0x000000,
        spacing: 20.0,
        points: 20.0,
        maxDistance: 10.0,
        showDots: true,
      });

      return () => {
        if (effect && typeof effect.destroy === "function") {
          effect.destroy();
        }
      };
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };


  return (
    <div ref={vantaRef} className="fixed top-0 left-0 w-screen h-screen -z-10">
      <div className="min-h-screen m-5 flex items-center justify-center relative z-10">
        <div className="w-[700px] h-[500px] flex flex-col justify-between p-8 rounded-xl border border-white/30 bg-black/60 text-white">

          <div className="flex items-center justify-center backdrop-blur p-4 rounded-lg border border-white/30 text-[1.1rem] mb-4 gap-4">
            <img src="/bot.png" alt="icon" className="h-12" />
            <h1 className="text-3xl fron-bold">MiniMoo</h1>
          </div>


          <div className="chat-box">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-[#103e84] text-white p-2 px-4 my-2 rounded-xl max-w-full w-fit break-words whitespace-pre-wrap self-end text-right ml-auto"
              >
                {msg}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white/10 border border-white/30 p-3 rounded-xl gap-4 mt-4">
            <input
              id="text"
              type="text"
              placeholder="Type Something..."
              className="flex-1 p-2 text-base rounded-md border-none outline-none bg-transparent text-white placeholder-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <img
              src="/send-message.png"
              alt="icon2"
              className="h-8 cursor-pointer"
              onClick={handleSend}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
export default Chatbot;
