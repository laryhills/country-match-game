import logo from "./logo.svg";
import "./App.css";
import CountryCapitalGame from "./components/CountryCapitalGame";

// 10 popular countries and their capitals
const data = {
  "United States": "Washington",
  France: "Paris",
  "United Kingdom": "London",
  Germany: "Berlin",
  China: "Beijing",
  Japan: "Tokyo",
  Italy: "Rome",
  Russia: "Moscow",
  Canada: "Ottawa",
  Nigeria: "Abuja",
};

function App() {
  return (
    <div className="App">
      <CountryCapitalGame data={data} />
    </div>
  );
}

export default App;
