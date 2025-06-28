import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown"
import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL;


function Chatbot() {
  const vantaRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/chat`, { prompt: input });
      const botMessage = { role: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.log(err);
      setMessages(prev => [...prev, { role: 'bot', text: 'Oops! Something went wrong' }]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div ref={vantaRef} className="fixed top-0 left-0 w-screen h-screen -z-10">
      <div className="min-h-screen m-5 flex items-center justify-center relative z-10">
        <div className="w-[700px] h-[600px] flex flex-col justify-between p-6 rounded-xl border border-white/30 bg-black/60 text-white">

          <div className="flex items-center justify-center backdrop-blur p-4 rounded-lg border border-white/30 text-[1.1rem]  gap-4">
            <img src="/bot.png" alt="icon" className="h-12" />
            <h1 className="text-3xl fron-bold">MiniMoo</h1>
          </div>


          <div className="flex flex-col gap-1 overflow-y-auto m-2 pr-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-white p-2 px-4 my-2 rounded-xl max-w-full w-fit break-words whitespace-pre-wrap 
                  ${msg.role === 'bot' ? 'bg-[#103e84] self-start text-left mr-auto' : 'bg-white/30 self-end text-right ml-auto'}
                  `}
              >
                {msg.role === 'bot' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (msg.text)}

                <div ref={chatEndRef} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-white/10 border border-white/30 p-3 rounded-xl gap-4 ">
            <input
              id="text"
              type="text"
              placeholder="Type Something..."
              className="flex-1 p-2 text-base rounded-md border-none outline-none bg-transparent text-white placeholder-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />{
              loading ? (
                <div className="h-8 px-3 py-2 sm:px-4 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm sm:text-base">
                  . . .
                </div>
              ) : (
                <img
                  src="/send-message.png"
                  alt="icon2"
                  className="h-8 cursor-pointer"
                  onClick={handleSend}
                />
              )
            }
          </div>

        </div>
      </div>
    </div>
  );
}
export default Chatbot;
