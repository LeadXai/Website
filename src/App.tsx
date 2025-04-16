import { Routes, Route, Link } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import ThankYou from './pages/ThankYou';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  );
}

export default App;