import React, { useEffect, useState } from 'react';
import { MapPin, ChevronRight, Calendar, Clock, Search, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useFirebase } from '../context/FirebaseContext';
import { db, collection, query, where, onSnapshot, orderBy } from '../firebase';

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

export default function AllGames() {
  const { user } = useFirebase();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'my-games' | 'open'>('all');

  useEffect(() => {
    if (!user) return;

    let gamesQuery;
    
    if (filter === 'my-games') {
      gamesQuery = query(
        collection(db, 'games'),
        where('players', 'array-contains', user.uid),
        where('status', '==', 'scheduled'),
        orderBy('date', 'asc')
      );
    } else if (filter === 'open') {
      // Note: Firestore doesn't support 'not-in' with 'array-contains' easily in a single query
      // For simplicity, we'll fetch all and filter client-side if needed, 
      // but let's stick to a basic query for now.
      gamesQuery = query(
        collection(db, 'games'),
        where('status', '==', 'scheduled'),
        orderBy('date', 'asc')
      );
    } else {
      gamesQuery = query(
        collection(db, 'games'),
        where('status', '==', 'scheduled'),
        orderBy('date', 'asc')
      );
    }

    const unsubscribe = onSnapshot(gamesQuery, (snapshot) => {
      let gamesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game));
      
      if (filter === 'open') {
        gamesData = gamesData.filter(g => !g.players.includes(user.uid));
      }
      
      setGames(gamesData);
    });

    return () => unsubscribe();
  }, [user, filter]);

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface uppercase">Todos los Partidos</h1>
          
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type="text" 
                placeholder="Buscar partidos..."
                className="w-full bg-surface-container-low border-2 border-surface-container rounded-xl py-2 pl-10 pr-4 text-sm font-semibold outline-none focus:border-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex bg-surface-container rounded-xl p-1">
              <button 
                onClick={() => setFilter('all')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                  filter === 'all' ? "bg-primary text-white shadow-lg" : "text-on-surface-variant hover:bg-surface-container-high"
                )}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilter('my-games')}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                  filter === 'my-games' ? "bg-primary text-white shadow-lg" : "text-on-surface-variant hover:bg-surface-container-high"
                )}
              >
                Míos
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {filteredGames.length > 0 ? (
          filteredGames.map((game, i) => (
            <GameListItem 
              key={game.id}
              game={game}
              variant={i % 2 === 0 ? 'primary' : 'dark'}
            />
          ))
        ) : (
          <div className="bg-surface-container-lowest rounded-[2rem] p-12 text-center border-4 border-dashed border-outline-variant/20">
            <p className="text-on-surface-variant font-bold">No se encontraron partidos</p>
          </div>
        )}
      </div>
    </div>
  );
}

function GameListItem({ game, variant }: any) {
  const dateObj = new Date(game.date);
  const day = game.date.split('-')[2] || '??';
  const month = game.date.split('-')[1] || '??';
  
  return (
    <Link to={`/game/${game.id}`} className="group bg-surface-container-lowest rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-6 transition-all hover:bg-surface-container-low border-2 border-surface-container hover:border-primary/30">
      <div className={cn(
        "w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 border-4 shadow-xl",
        variant === 'primary' ? "bg-primary border-primary/20" : "bg-on-surface border-on-surface/20"
      )}>
        <span className="text-[10px] font-black uppercase leading-none opacity-80">{month}</span>
        <span className="text-3xl font-black leading-tight tracking-tighter">{day}</span>
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-surface-container rounded-md text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
            {game.type}
          </span>
          {game.status === 'scheduled' && (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-[10px] font-black uppercase tracking-widest">
              Programado
            </span>
          )}
        </div>
        <h3 className="font-headline text-2xl font-black text-on-surface group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        <div className="flex flex-wrap gap-4 text-on-surface-variant">
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <MapPin className="w-4 h-4 text-primary" />
            {game.location}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <Clock className="w-4 h-4 text-primary" />
            {game.time}
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold">
            <Calendar className="w-4 h-4 text-primary" />
            {game.date}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-surface-container">
        <div className="flex flex-col items-end">
          <span className="text-2xl font-black text-on-surface">${game.cost}</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">por jugador</span>
        </div>
        <div className="bg-surface-container p-3 rounded-xl text-on-surface group-hover:bg-primary group-hover:text-white transition-all active:scale-90">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
}
