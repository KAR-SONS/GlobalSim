import { useState } from "react";

export default function CodeGenerator() {
  const [selectedNetwork, setSelectedNetwork] = useState("Air");
  const [generatedCode, setGeneratedCode] = useState("");

  // Prefix mapping
  const prefixes = {
    Air: "97",
    Mit: "96",
    Zam: "95",
  };

  const generateCode = () => {
    const prefix = prefixes[selectedNetwork];

    // Generate remaining 7 random digits
    let remainingNumbers = "";

    for (let i = 0; i < 7; i++) {
      remainingNumbers += Math.floor(Math.random() * 10);
    }

    // Final format: Hello + 9 digits
    // Example: Hello971234567
    const finalCode = `+256 ${prefix}${remainingNumbers}`;

    setGeneratedCode(finalCode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Code Generator
        </h1>

        {/* Dropdown */}
        <div className="mb-6">
          <label className="block mb-2 text-sm opacity-80">
            Select Network
          </label>

          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/30 border border-white/20 text-white outline-none"
          >
            <option value="Air" className="text-black">
              Air
            </option>

            <option value="Mit" className="text-black">
              Mit
            </option>

            <option value="Zam" className="text-black">
              Zam
            </option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateCode}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all duration-300 font-semibold"
        >
          Generate Code
        </button>

        {/* Output */}
        {generatedCode && (
          <div className="mt-8 text-center">
            <p className="text-sm opacity-70 mb-2">Generated Code</p>

            <div className="bg-black/40 p-4 rounded-2xl text-2xl font-bold tracking-widest border border-purple-500/30 animate-pulse">
              {generatedCode}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}