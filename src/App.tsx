/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateGame from './pages/CreateGame';
import GameDetails from './pages/GameDetails';
import GameStats from './pages/GameStats';
import CommunityHub from './pages/CommunityHub';
import GroupRankings from './pages/GroupRankings';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import AllGames from './pages/AllGames';
import { FirebaseProvider, useFirebase } from './context/FirebaseContext';
import { Settings, Share2, X } from 'lucide-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useFirebase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={
        <ProtectedRoute>
          <Welcome />
        </ProtectedRoute>
      } />
      <Route path="/all-games" element={
        <ProtectedRoute>
          <Layout title="Todos los Partidos">
            <AllGames />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/games" element={
        <ProtectedRoute>
          <Layout title="Game Stats" rightAction={
            <button className="text-on-surface-variant hover:bg-surface-container p-2 rounded-lg active:scale-95 transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          }>
            <GameStats />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/groups" element={
        <ProtectedRoute>
          <Layout title="Community Hub">
            <CommunityHub />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/group/:id/rankings" element={
        <ProtectedRoute>
          <Layout title="Group Rankings" rightAction={
            <button className="text-on-surface-variant hover:bg-surface-container p-2 rounded-lg active:scale-95 transition-all">
              <Settings className="w-6 h-6" />
            </button>
          }>
            <GroupRankings />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/create-game" element={
        <ProtectedRoute>
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
        </ProtectedRoute>
      } />

      <Route path="/game/:id" element={
        <ProtectedRoute>
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
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout title="Profile">
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
              <div className="w-32 h-32 rounded-full border-4 border-primary overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=me" alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h2 className="text-2xl font-black">N. Verino</h2>
              <p className="text-on-surface-variant">Elite Striker • Level 42</p>
            </div>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <AppContent />
      </Router>
    </FirebaseProvider>
  );
}
