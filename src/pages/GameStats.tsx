import React from 'react';
import { Trophy, Share2, Shield, Sun, MapPin, Users, Activity, CreditCard, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

export default function GameStats() {
  return (
    <div className="space-y-6">
      {/* Scoreboard Bento Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Result Card */}
        <div className="md:col-span-2 bg-primary p-8 rounded-xl flex flex-col justify-between min-h-[240px] text-white">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-80">Final Result</span>
              <h2 className="text-4xl font-extrabold tracking-tighter">Premier League Week 12</h2>
            </div>
            <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Completed</span>
          </div>
          
          <div className="flex items-center justify-between w-full mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <span className="font-bold text-sm tracking-tight">STADIUM FC</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-7xl font-black tracking-tighter flex items-center gap-4">
                <span>3</span>
                <span className="text-primary-container opacity-40 text-4xl">-</span>
                <span>2</span>
              </div>
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase opacity-60">Full Time</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <Sun className="w-8 h-8" />
              </div>
              <span className="font-bold text-sm tracking-tight">WANDERERS</span>
            </div>
          </div>
        </div>

        {/* Match Insight Mini-Card */}
        <div className="bg-surface-container p-6 rounded-xl flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Pitch Condition</span>
            </div>
            <p className="text-on-surface font-bold text-xl leading-tight">Elite Hybrid Turf<br />Excellent Drain</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Users className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Attendance</span>
            </div>
            <p className="text-on-surface font-bold text-xl leading-tight">42,850 Souls</p>
          </div>
        </div>
      </section>

      {/* Man of the Match Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
        <div className="md:col-span-1 bg-secondary-container rounded-xl overflow-hidden relative group min-h-[300px]">
          <img 
            src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop" 
            alt="Marcus Sterling" 
            className="w-full h-full object-cover grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-primary/90 backdrop-blur-sm text-white">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary-container">Player of the Match</span>
            <h3 className="font-bold text-lg leading-none tracking-tight">Marcus Sterling</h3>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="md:col-span-3 bg-surface-container-low rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[12px] font-black uppercase tracking-[0.25em] text-on-surface-variant">Performance Metrics</h3>
            <div className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold">ALL SQUADS</div>
          </div>
          
          <div className="space-y-4">
            <StatRow icon={<Trophy />} label="Goals Scored" home={3} away={2} color="primary" />
            <StatRow icon={<Activity />} label="Distance Covered (km)" home={112.4} away={109.8} color="primary-container" />
            <StatRow icon={<CreditCard />} label="Disciplinary Cards" home={4} away={1} color="red-600" isCards />
            <StatRow icon={<TrendingUp />} label="Total Assists" home={2} away={1} color="secondary" />
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] pl-2 border-l-4 border-primary">Top Performers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PerformerCard 
            rank={8} 
            name="Leo Varga" 
            stats={["1 Goal", "92% Pass"]} 
            rating={8.4} 
            image="https://i.pravatar.cc/150?u=leo"
            color="primary"
          />
          <PerformerCard 
            rank={11} 
            name="Jordan Brooks" 
            stats={["2 Assists", "12.2km"]} 
            rating={7.9} 
            image="https://i.pravatar.cc/150?u=jordan"
            color="on-surface"
          />
        </div>
      </section>
    </div>
  );
}

function StatRow({ icon, label, home, away, color, isCards }: any) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border-l-4",
      `border-${color}`
    )}>
      <div className="flex items-center gap-4">
        {React.cloneElement(icon, { className: `text-${color} w-5 h-5` })}
        <span className="font-bold text-sm tracking-tight">{label}</span>
      </div>
      <div className="flex items-center gap-6">
        {isCards ? (
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-6 bg-yellow-400 rounded-sm shadow-sm" />
              <span className="text-2xl font-black">{home}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-6 bg-red-600 rounded-sm shadow-sm" />
              <span className="text-2xl font-black">{away}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="text-right">
              <span className="block text-2xl font-black text-on-surface">{home}</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Home</span>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-black text-on-surface-variant">{away}</span>
              <span className="text-[9px] uppercase font-bold text-on-surface-variant">Away</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function PerformerCard({ rank, name, stats, rating, image, color }: any) {
  return (
    <div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
      <div className="relative">
        <div className="w-14 h-14 bg-surface-container-high rounded-lg overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
        </div>
        <span className={cn(
          "absolute -top-2 -left-2 text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-md text-white",
          color === 'primary' ? "bg-primary" : "bg-on-surface"
        )}>
          {rank}
        </span>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-base">{name}</h4>
        <div className="flex gap-2 mt-1">
          {stats.map((stat: string) => (
            <span key={stat} className="text-[9px] font-bold uppercase px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded-full">
              {stat}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-black text-primary">{rating}</div>
        <div className="text-[8px] font-bold uppercase text-on-surface-variant">Match Rating</div>
      </div>
    </div>
  );
}

