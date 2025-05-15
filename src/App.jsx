import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* logo bar */}
      <div className="flex gap-6 mb-8 justify-center">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={viteLogo}
            alt="Vite logo"
            className="h-16 w-16 transition-transform hover:rotate-12"
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img
            src={reactLogo}
            alt="React logo"
            className="h-16 w-16 animate-spin-slow hover:animate-none"
          />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-center text-amber-400 mb-6">
        Vite&nbsp;+&nbsp;React
      </h1>

      {/* counter card */}
      <div className="mx-auto max-w-sm bg-zinc-900/60 backdrop-blur p-8 rounded-xl shadow-lg">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-full py-2 mb-4 rounded-lg bg-amber-500 font-semibold text-black hover:bg-amber-400 transition"
        >
          count is {count}
        </button>

        <p className="text-sm text-zinc-400">
          Edit <code className="text-amber-300">src/App.jsx</code> and save to
          test HMR
        </p>
      </div>

      <p className="mt-8 text-center text-zinc-500 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
