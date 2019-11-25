import React, { useState } from "react";
import "./App.css";
import { FirebaseProvider } from "./Firebase";
import { PageList } from "./PageList";
import { TinaCMS, Tina } from "tinacms";

const App: React.FC = () => {
  const [cms] = useState(() => {
    return new TinaCMS();
  });
  return (
    <Tina cms={cms} position="displace">
      <FirebaseProvider>
        <div className="App">
          <PageList />
        </div>
      </FirebaseProvider>
    </Tina>
  );
};

export default App;
