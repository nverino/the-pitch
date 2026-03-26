import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Trophy, Users, User, PlusCircle, Share2, ArrowLeft, X, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export default function Layout({ children, title = "The Pitch", showBack, onBack, rightAction }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/10">
        <div className="flex justify-between items-center px-6 py-4 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            {showBack ? (
              <button 
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors active:scale-95"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            ) : (
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-primary">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <h1 className="font-headline font-black text-xl tracking-tight text-primary">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {rightAction || (
              <NavLink to="/create-game" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-xl font-bold active:scale-95 transition-all hover:bg-primary-dim">
                <PlusCircle className="w-5 h-5" />
                <span className="hidden md:inline">Create Game</span>
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-32 px-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="flex justify-around items-center px-4 pt-3 pb-8 w-full max-w-lg mx-auto">
          <NavItem to="/" icon={<Home />} label="Inicio" active={location.pathname === '/'} />
          <NavItem to="/games" icon={<Trophy />} label="Partidos" active={location.pathname === '/games'} />
          <NavItem to="/groups" icon={<Users />} label="Grupos" active={location.pathname === '/groups'} />
          <NavItem to="/profile" icon={<User />} label="Perfil" active={location.pathname === '/profile'} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label, active }: { to: string; icon: React.ReactElement; label: string; active: boolean }) {
  return (
    <NavLink 
      to={to}
      className={cn(
        "flex flex-col items-center justify-center px-6 py-2 rounded-xl transition-all active:scale-95",
        active ? "bg-primary text-white" : "text-on-surface-variant hover:text-primary"
      )}
    >
      {React.cloneElement(icon, { className: cn("w-6 h-6", active && "fill-current") })}
      <span className="text-[10px] font-black uppercase tracking-widest mt-1">{label}</span>
    </NavLink>
  );
}
