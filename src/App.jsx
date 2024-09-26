import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeDetails from './components/ChallengeDetail';
import CreateChallenge from './components/CreateChallenge';
import ChallengesList from './components/ChallengesList';
import EditChallenge from './components/EditChallenge';

function App() {
    return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<ChallengesList />} /> 
            <Route path="/create-challenge" element={<CreateChallenge />} />
            <Route path="/challenge-detail/:idx" element={<ChallengeDetails />} />
            <Route path="/edit-challenge/:idx" element={<EditChallenge />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;