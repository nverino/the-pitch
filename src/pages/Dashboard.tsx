import { Calendar, Clock, MapPin, ChevronRight, Check, X, Users as UsersIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Hero Section: Next Game */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="font-headline text-2xl font-black tracking-tight text-on-surface">Próximo Partido</h2>
          <span className="text-xs font-black uppercase tracking-widest text-primary">En 4 HORAS</span>
        </div>
        
        <Link to="/game/1">
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
                    <span className="text-sm font-black uppercase tracking-tight">Tuesday, Oct 24</span>
                  </div>
                  <h3 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                    EL CLÁSICO<br /><span className="text-primary">PICKUP</span>
                  </h3>
                  <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-bold text-lg">20:30 PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="font-bold text-lg">Westside Arena, Pitch 4</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                      <img 
                        key={i}
                        className="inline-block h-14 w-14 rounded-full border-4 border-slate-950 object-cover"
                        src={`https://i.pravatar.cc/150?u=${i}`}
                        alt="Player"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white font-black text-sm border-4 border-slate-950">+8</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Upcoming Games List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-xl font-black text-on-surface">Siguientes partidos</h2>
            <button className="text-sm font-black text-primary hover:text-primary-dim">ver todos</button>
          </div>
          
          <div className="space-y-4">
            <GameCard 
              date="27" 
              month="Oct" 
              title="Friday Night Lights" 
              location="Community Park" 
              time="18:00" 
              spots="5 spots left" 
              variant="primary"
            />
            <GameCard 
              date="29" 
              month="Oct" 
              title="Sunday Morning Kick" 
              location="St. Mary's School" 
              time="09:00" 
              spots="Filling Fast" 
              variant="dark"
            />
            <GameCard 
              date="02" 
              month="Nov" 
              title="Tactical 5-a-Side" 
              location="Downtown Indoor" 
              time="19:30" 
              spots="Waiting List" 
              variant="primary"
            />
          </div>
        </div>

        {/* Recent Invitations */}
        <aside className="space-y-6">
          <h2 className="font-headline text-xl font-black text-on-surface">Recent Invitations</h2>
          <div className="space-y-4">
            <InvitationCard 
              name="Sarah Jenkins" 
              time="3 min ago" 
              message='Invited you to join "Blue Lock Strikers" for a scrimmage this Saturday.'
              image="https://i.pravatar.cc/150?u=sarah"
            />
            <InvitationCard 
              name="Marco Rossi" 
              time="1 hour ago" 
              message="Needs a goalkeeper for Champions League Finals. Interested?"
              image="https://i.pravatar.cc/150?u=marco"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

function GameCard({ id, date, month, title, location, time, spots, variant }: any) {
  return (
    <Link to={`/game/${id || '1'}`} className="bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-4 transition-colors hover:bg-surface-container-low border-2 border-surface-container">
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
          spots === 'Filling Fast' ? "text-red-600" : "text-on-surface-variant"
        )}>{spots}</div>
      </div>
      <button className="bg-surface-container p-2 rounded-xl text-on-surface active:scale-90 transition-transform">
        <ChevronRight className="w-6 h-6" />
      </button>
    </Link>
  );
}

function InvitationCard({ name, time, message, image }: any) {
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
        <button className="flex-1 bg-primary text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-colors hover:bg-primary-dim">Accept</button>
        <button className="flex-1 bg-surface-container text-on-surface py-3 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-colors hover:bg-surface-container-high">Decline</button>
      </div>
    </div>
  );
}
