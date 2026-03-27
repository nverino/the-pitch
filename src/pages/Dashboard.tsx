import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Check, X, Users as UsersIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useFirebase } from '../context/FirebaseContext';
import { db, collection, query, where, onSnapshot, orderBy, limit, updateDoc, doc } from '../firebase';

interface Game {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  cost: number;
  players: string[];
  status: string;
}

interface Invitation {
  id: string;
  gameId: string;
  senderId: string;
  receiverId: string;
  status: string;
  gameTitle?: string;
}

export default function Dashboard() {
  const { user } = useFirebase();
  const [upcomingGames, setUpcomingGames] = useState<Game[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [nextGame, setNextGame] = useState<Game | null>(null);

  useEffect(() => {
    if (!user) return;

    // Fetch upcoming games where user is a player
    const gamesQuery = query(
      collection(db, 'games'),
      where('players', 'array-contains', user.uid),
      where('status', '==', 'scheduled'),
      orderBy('date', 'asc'),
      limit(5)
    );

    const unsubscribeGames = onSnapshot(gamesQuery, (snapshot) => {
      const gamesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game));
      setUpcomingGames(gamesData);
      if (gamesData.length > 0) {
        setNextGame(gamesData[0]);
      } else {
        setNextGame(null);
      }
    });

    // Fetch pending invitations for the user
    const invitationsQuery = query(
      collection(db, 'invitations'),
      where('receiverId', '==', user.uid),
      where('status', '==', 'pending')
    );

    const unsubscribeInvitations = onSnapshot(invitationsQuery, (snapshot) => {
      const invs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invitation));
      setInvitations(invs);
    });

    return () => {
      unsubscribeGames();
      unsubscribeInvitations();
    };
  }, [user]);

  const handleInvitation = async (id: string, status: 'accepted' | 'declined') => {
    try {
      const invRef = doc(db, 'invitations', id);
      await updateDoc(invRef, { status });
      
      if (status === 'accepted') {
        const inv = invitations.find(i => i.id === id);
        if (inv) {
          const gameRef = doc(db, 'games', inv.gameId);
          const game = upcomingGames.find(g => g.id === inv.gameId);
          await updateDoc(gameRef, {
            players: [...(game?.players || []), user!.uid]
          });
        }
      }
    } catch (error) {
      console.error('Error updating invitation:', error);
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section: Next Game */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-headline text-2xl font-black tracking-tight text-on-surface">Próximo Partido</h2>
          {nextGame && <span className="text-xs font-black uppercase tracking-widest text-primary">PRÓXIMAMENTE</span>}
        </div>
        
        {nextGame ? (
          <Link to={`/game/${nextGame.id}`}>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="relative overflow-hidden rounded-[2rem] bg-slate-950 border-4 border-slate-900 aspect-[16/9] md:aspect-[21/9]"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop" 
                  alt="Soccer field" 
                  className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40" />
              </div>
              
              <div className="relative z-10 p-8 md:p-12 text-white h-full flex flex-col justify-center">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary rounded-lg">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-black uppercase tracking-tight">{nextGame.date}</span>
                    </div>
                    <h3 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                      {nextGame.title.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                          {i === 1 ? <span className="text-primary">{word}</span> : word}
                          {i < nextGame.title.split(' ').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </h3>
                    <div className="flex flex-wrap gap-6 items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary" />
                        <span className="font-bold text-lg">{nextGame.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-bold text-lg">{nextGame.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3 overflow-hidden">
                      {nextGame.players.slice(0, 3).map((p, i) => (
                        <img 
                          key={i}
                          className="inline-block h-14 w-14 rounded-full border-4 border-slate-950 object-cover"
                          src={`https://i.pravatar.cc/150?u=${p}`}
                          alt="Player"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                      {nextGame.players.length > 3 && (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white font-black text-sm border-4 border-slate-950">
                          +{nextGame.players.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="bg-surface-container-lowest rounded-[2rem] p-12 text-center border-4 border-dashed border-outline-variant/20">
            <p className="text-on-surface-variant font-bold mb-4">No tienes partidos programados</p>
            <Link to="/create-game" className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest">Crear Partido</Link>
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Upcoming Games List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-black text-on-surface">Siguientes partidos</h2>
            <button className="text-sm font-black text-primary hover:text-primary-dim">ver todos</button>
          </div>
          
          <div className="space-y-4">
            {upcomingGames.map((game, i) => (
              <GameCard 
                key={game.id}
                id={game.id}
                date={game.date.split('-')[2] || '??'} 
                month={game.date.split('-')[1] || '??'} 
                title={game.title} 
                location={game.location} 
                time={game.time} 
                spots={`${game.players.length} players`} 
                variant={i % 2 === 0 ? 'primary' : 'dark'}
              />
            ))}
          </div>
        </div>

        {/* Recent Invitations */}
        <aside className="space-y-6">
          <h2 className="font-headline text-xl font-black text-on-surface">Invitaciones</h2>
          <div className="space-y-4">
            {invitations.map((inv) => (
              <InvitationCard 
                key={inv.id}
                name="Match Invitation" 
                time="Pending" 
                message={`You've been invited to join a game!`}
                image={`https://i.pravatar.cc/150?u=${inv.senderId}`}
                onAccept={() => handleInvitation(inv.id, 'accepted')}
                onDecline={() => handleInvitation(inv.id, 'declined')}
              />
            ))}
            {invitations.length === 0 && (
              <p className="text-sm text-on-surface-variant font-semibold text-center py-8">No tienes invitaciones pendientes</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function GameCard({ id, date, month, title, location, time, spots, variant }: any) {
  return (
    <Link to={`/game/${id}`} className="bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-4 transition-colors hover:bg-surface-container-low border-2 border-surface-container">
      <div className={cn(
        "w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white shrink-0 border-2",
        variant === 'primary' ? "bg-primary border-primary" : "bg-on-surface border-on-surface"
      )}>
        <span className="text-[10px] font-black uppercase leading-none">{month}</span>
        <span className="text-2xl font-black leading-tight">{date}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-headline font-black text-lg truncate text-on-surface">{title}</h4>
        <p className="text-on-surface-variant text-sm font-semibold flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {location}
        </p>
      </div>
      <div className="text-right hidden sm:block">
        <div className="text-sm font-black text-on-surface">{time}</div>
        <div className={cn(
          "text-xs font-black uppercase tracking-tighter",
          "text-on-surface-variant"
        )}>{spots}</div>
      </div>
      <button className="bg-surface-container p-2 rounded-xl text-on-surface active:scale-90 transition-transform">
        <ChevronRight className="w-6 h-6" />
      </button>
    </Link>
  );
}

function InvitationCard({ name, time, message, image, onAccept, onDecline }: any) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 border-2 border-surface-container">
      <div className="flex items-center gap-3 mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-primary" referrerPolicy="no-referrer" />
        <div>
          <p className="text-sm font-black text-on-surface">{name}</p>
          <p className="text-[10px] text-on-surface-variant uppercase font-black tracking-widest">{time}</p>
        </div>
      </div>
      <p className="text-sm mb-5 leading-relaxed font-semibold text-on-surface-variant">
        {message}
      </p>
      <div className="flex gap-3">
        <button onClick={onAccept} className="flex-1 bg-primary text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-colors hover:bg-primary-dim">Accept</button>
        <button onClick={onDecline} className="flex-1 bg-surface-container text-on-surface py-3 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-colors hover:bg-surface-container-high">Decline</button>
      </div>
    </div>
  );
}
