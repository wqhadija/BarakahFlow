
import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Splash screen for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <Splash /> : <Dashboard />}
    </>
  );
};

export default App;
