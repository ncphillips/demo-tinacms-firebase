import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FirebaseProvider } from "./Firebase";
import { PageList } from "./PageList";

const App: React.FC = () => {
  return (
    <FirebaseProvider>
      <div className="App">
        <PageList />
      </div>
    </FirebaseProvider>
  );
};

export default App;
