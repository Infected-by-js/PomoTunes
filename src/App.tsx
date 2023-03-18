import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="text-6xl text-red-600 font-bold">PomoTunes {count}</div>
        <button
          className="px-6 py-2 rounded bg-gray-800  text-white"
          type="button"
          onClick={() => setCount((count) => count + 1)}
        >
          count+
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

export default App;
