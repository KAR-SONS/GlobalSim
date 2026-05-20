import { useEffect, useState } from "react";

export default function Timer() {
  const TOTAL_TIME = 120; // seconds
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  const radius = 90;
  const stroke = 12;
  const circumference = 2 * Math.PI * radius;

  const progress = timeLeft / TOTAL_TIME;
  const strokeDashoffset = circumference - progress * circumference;

  useEffect(() => {
    setIsRunning(true);
    }, []);

    useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) setIsRunning(false);

    return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

  const reset = () => {
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      
       <h1 className="font-bold text-2xl">Number Initialization Timer</h1>

      <div className="relative w-64 h-64 flex items-center justify-center">
        
        {/* Glow background */}
        <div className="absolute w-64 h-64 rounded-full blur-3xl bg-purple-500 opacity-20 animate-pulse"></div>

        {/* SVG Circle */}
        <svg className="transform -rotate-90 w-64 h-64">
          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={stroke}
            fill="transparent"
          />

          <circle
            cx="128"
            cy="128"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s linear",
            }}
          />

          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time display */}
        <div className="absolute text-center">
          <div className="text-5xl font-bold">{timeLeft}</div>
          <div className="text-sm opacity-70">seconds left</div>
        </div>
      </div>
    
    {timeLeft === 0 ? (
    <div className="mt-6 flex flex-col items-center gap-4">
        <h4 className="text-green-400 font-semibold">
        Your number has been generated 🎉
        </h4>

        <button
        onClick={() => (window.location.href = "/profile")}
        className="px-6 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition"
        >
        Go to Account
        </button>
    </div>
    ) : (
    <div className="mt-6">
        <h4>After the Timer Expires Your Number will be generated.</h4>
    </div>
    )}

    </div>
  );
}