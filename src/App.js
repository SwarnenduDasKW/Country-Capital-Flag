import React from "react";
import "./App.css";
import Country from "./Country";
import Countries from "./Countries";
import Navbar from "./Navbar";
import Appbar from "./Appbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <Appbar /> */}
      <Countries />
    </div>
  );
}

export default App;
