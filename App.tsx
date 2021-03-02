import React from 'react';
import Home from "./src/screens/home/index";
import ContextProvider from "./src/context/Provider";

const App : React.FC = () => {  
  return (
    <ContextProvider>
      <Home />
    </ContextProvider>
  );
}

export default App;
