import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Download from './pages/Download';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/upload" element={<Upload/>} />
        <Route path="/download/:uid" element={<Download/>} />
      </Routes>
      <Toaster richColors/>
    </>
  );
};

export default App;
