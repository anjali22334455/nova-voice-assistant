import React, { useContext, useEffect, useRef, useState } from 'react';
import { userDataContext } from '../context/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AiImg from "../assets/ai.gif"
import userImg from "../assets/user.gif"
import { IoMenuSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(userDataContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const recognitionRef = useRef(null);

  const [ham, setHam] = useState(false);
  const isRecognizingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const synth = window.speechSynthesis;

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      navigate('/signin');
      setUserData(null);
    } catch (error) {
      console.log(error);
      setUserData(null);
    }
  };

  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
      if (!error.message.includes("start")) {
        console.error("Recognition error:", error);
      }
    }
  }

  const speak = (text) => {
    if (!text) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find(v => v.lang === 'hi-IN');
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    } else {
      // Fallback to English if Hindi not available
      utterance.lang = 'en-US';
    }

    isSpeakingRef.current = true;

    utterance.onend = () => {
      setAiText("");
      isSpeakingRef.current = false;
      setTimeout(() => {
        startRecognition();
      }, 800);
    };
    synth.cancel();
    synth.speak(utterance);
  }

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    console.log('Command Data:', data);
    speak(response);

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    if (type === 'calculator-open') {
      window.open(`https://www.google.com/search?q=calculator`, '_blank');
    }

    if (type === 'instagram-open') {
      window.open(`https://www.instagram.com/`, '_blank');
    }

    if (type === 'facebook-open') {
      window.open(`https://www.facebook.com`, '_blank');
    }

    if (type === 'weather-show') {
      window.open(`https://www.google.com/search?q=weather`, '_blank');
    }

    if (type === 'youtube-search' || type === 'youtube-play') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionRef.current = recognition;


    let isMounted = true;

    const startTimeout = setTimeout(() => {
      if (isMounted && !isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("recognition requested to start");
        } catch (error) {
          if (e.name !== "InvalidStateError") {
            console.error(e);
          }
        }
      }
    }, 1000);


    recognition.onstart = () => {
      console.log('Recognition started');
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log('Recognition Ended');
      isRecognizingRef.current = false;
      setListening(false);

      if (isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted");
            } catch (e) {
              if (e.name !== "InvalidStateError") {
                console.error(e);
              }

            }
          }
        }, 1000)
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== 'aborted') console.warn('Recognition error:', event.error);
      isRecognizingRef.current = false;
      setListening(false);

      if (event.error !== "aborted" && isMounted && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMounted) {
            try {
              recognition.start();
              console.log("Recognition restarted  after error");
            } catch (e) {
              if (e.name !== "InvalidStateError") {
                console.log(e);
              }
            }
          }
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log('heard: ' + transcript);

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText("");
        setUserText(transcript);
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);

        const data = await getGeminiResponse(transcript); 
        handleCommand(data);
        setAiText(data.response);
        setUserText("");
      }
    };

    const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name}, what can I help you ?`);
    greeting.lang = "hi-IN";
    window.speechSynthesis.speak(greeting);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
    };
  }, []);

  return (
    <div className="w-full h-[100vh] overflow-hidden bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col relative">
      <IoMenuSharp className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(true)} />
      <div className={`absolute lg:hidden top-0 w-full h-full ${ham ? "translate-x-0" : "translate-x-full"} bg-[#0000001f] transition-transform backdrop-blur-lg p-[28px] flex flex-col gap-[20px] items-start`}>
        <RxCross1 className='text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={() => setHam(false)} />
        <button
          className="min-w-[150px] h-[60px] bg-white rounded-full font-semibold text-[19px] text-black cursor-pointer"
          onClick={handleLogOut}>
          Log Out
        </button>

        <button
          className="min-w-[150px] h-[60px] bg-white rounded-full  font-semibold text-[19px] text-black cursor-pointer px-[20px] py-[10px] top-[38px]"
          onClick={() => navigate('/customize')}>
          Customize Your Assistant
        </button>
        <div className='w-full h-[2px] bg-gray-400'></div>
        <h1 className='text-white font-semibold text-[19px]'>History</h1>
        <div className='w-full h-[400px] gap-[20px] overflow-y-auto flex flex-col'>
          {userData?.history?.map((his, index) => (
            <span className='text-gray-200 text-[18px] ' key={index}>{his}</span>
          ))}


        </div>
      </div>

      <button
        className="min-w-[150px] h-[60px] bg-white rounded-full font-semibold hidden lg:block text-[19px] text-black mt-[30px] cursor-pointer absolute top-[20px] right-[20px]"
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        className="min-w-[150px] h-[60px] bg-white rounded-full hidden lg:block font-semibold text-[19px] text-black mt-[30px] cursor-pointer absolute px-[10px] py-[10px] top-[100px] right-[20px]"
        onClick={() => navigate('/customize')}
      >
        Customize Your Assistant
      </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img src={userData?.assistantImage} alt="" className="h-full object-cover" />
      </div>

      <h1 className="text-white text-[18px] font-semibold mt-[20px]">I'm {userData?.assistantName}</h1>
      {!aiText && <img src={userImg} alt="" className='w-[200px]' />}
      {aiText && <img src={AiImg} alt="" className='w-[200px]' />}
      <h1 className='text-white font-semibold text-[18px]'>{userText ? userText : (aiText ? aiText : null)}</h1>
    </div>
  );
};

export default Home;
