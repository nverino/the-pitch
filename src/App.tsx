/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateGame from './pages/CreateGame';
import GameDetails from './pages/GameDetails';
import GameStats from './pages/GameStats';
import CommunityHub from './pages/CommunityHub';
import GroupRankings from './pages/GroupRankings';
import { Settings, Share2, X } from 'lucide-react';

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <Dashboard />
        </Layout>
      } />
      
      <Route path="/games" element={
        <Layout title="Game Stats" rightAction={
          <button className="text-on-surface-variant hover:bg-surface-container p-2 rounded-lg active:scale-95 transition-all">
            <Share2 className="w-6 h-6" />
          </button>
        }>
          <GameStats />
        </Layout>
      } />
      
      <Route path="/groups" element={
        <Layout title="Community Hub">
          <CommunityHub />
        </Layout>
      } />
      
      <Route path="/group/:id/rankings" element={
        <Layout title="Group Rankings" rightAction={
          <button className="text-on-surface-variant hover:bg-surface-container p-2 rounded-lg active:scale-95 transition-all">
            <Settings className="w-6 h-6" />
          </button>
        }>
          <GroupRankings />
        </Layout>
      } />

      <Route path="/create-game" element={
        <Layout 
          title="Partido" 
          showBack 
          onBack={() => navigate(-1)}
          rightAction={
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant"
            >
              <X className="w-6 h-6" />
            </button>
          }
        >
          <CreateGame />
        </Layout>
      } />

      <Route path="/game/:id" element={
        <Layout 
          title="The Pitch" 
          showBack 
          onBack={() => navigate(-1)}
          rightAction={
            <div className="flex items-center gap-3">
              <Share2 className="w-6 h-6 text-on-surface-variant cursor-pointer" />
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-container">
                <img 
                  src="https://i.pravatar.cc/150?u=me" 
                  alt="Me" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          }
        >
          <GameDetails />
        </Layout>
      } />

      <Route path="/profile" element={
        <Layout title="Profile">
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
            <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden">
              <img src="https://i.pravatar.cc/150?u=me" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <h2 className="text-2xl font-black">N. Verino</h2>
            <p className="text-on-surface-variant">Elite Striker • Level 42</p>
          </div>
        </Layout>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
