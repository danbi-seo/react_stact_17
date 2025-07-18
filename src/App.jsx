import { useState, useMemo } from "react";
import "./App.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const throttle = (func, delay) => {
  let lastTime = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastTime >= delay) {
      func(...args);
      lastTime = now;
    }
  };
};


function App() {
  const [query, setQuery] = useState("");
  const [searchString, setSearchString] = useState("");


  const debouncedSearch = useMemo(() => 
    debounce((query) => {
      setSearchString(query);
      console.log('Debounce 검색 쿼리:', query);
    }, 1000),
  []
);

  const throttledSearch = useMemo(() => 
    throttle((query) => {
      setSearchString(query);
      console.log('Throttle 검색 쿼리:', query);
    }, 1000),
  []
);


  const handleDebounceInput = (event) => {
    setQuery(event.target.value);
    debouncedSearch(event.target.value);
  }

  const handleThrottleInput = (event) => {
    setQuery(event.target.value);
    throttledSearch(event.target.value);
  };

  return (
    <div className="container">
      <h1>
        debounce와 throttle을
        <br />
        이용한 검색
      </h1>
      <div>
        <h2>Debounce</h2>
        <input
          type="text"
          placeholder="Debounce를 이용한 검색..."
          onChange={handleDebounceInput}
        />
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={handleThrottleInput}
        />
      </div>
    </div>
  );
}

export default App;
