import React from 'react';
import { MapPin, Calendar, Clock, DollarSign, Users, Gavel, ShoppingBag, Share2, ArrowLeft, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function GameDetails() {
  return (
    <div className="space-y-10">
      {/* Map Snippet Hero */}
      <section className="relative h-64 w-full rounded-3xl overflow-hidden shadow-md">
        <img 
          src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=1200&auto=format&fit=crop" 
          alt="Map" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-on-surface/20" />
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
          <div className="bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm">
            <p className="font-headline text-[10px] uppercase tracking-widest text-primary font-bold">Location</p>
            <h3 className="font-headline font-semibold text-on-surface">Westside Community Turf</h3>
          </div>
          <button className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
            <MapPin className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Match Header */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-secondary text-white rounded-md text-[10px] font-extrabold uppercase tracking-tight">Friendly Match</span>
          <span className="px-3 py-1 bg-primary text-white rounded-md text-[10px] font-extrabold uppercase tracking-tight">5 vs 5</span>
        </div>
        <h2 className="font-headline text-4xl font-extrabold text-on-surface tracking-tighter leading-none mb-4">Elite Turf Battle</h2>
        
        <div className="grid grid-cols-3 gap-3">
          <StatBox icon={<Calendar />} label="Date" value="Oct 24, 2023" />
          <StatBox icon={<Clock />} label="Time" value="18:00 - 19:30" />
          <StatBox icon={<DollarSign />} label="Cost" value="$5.00" />
        </div>
      </section>

      {/* Join CTA */}
      <section>
        <button className="bg-primary w-full py-5 rounded-2xl shadow-md flex items-center justify-center gap-3 active:scale-[0.98] transition-all group">
          <span className="font-headline font-black text-white text-xl uppercase tracking-widest">Join Game</span>
          <Trophy className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
        </button>
        <p className="text-center mt-4 text-xs text-on-surface-variant font-medium">Only 3 spots left! Secure your position on the pitch.</p>
      </section>

      {/* Roster */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h4 className="font-headline text-2xl font-extrabold tracking-tight">Roster</h4>
            <p className="text-sm text-on-surface-variant">7 of 10 players confirmed</p>
          </div>
          <Users className="text-primary w-8 h-8" />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <PlayerCard name="Marcus L." role="Striker" image="https://i.pravatar.cc/150?u=marcus" />
          <PlayerCard name="Sarah J." role="Midfield" image="https://i.pravatar.cc/150?u=sarah" />
          <PlayerCard name="David K." role="Defender" image="https://i.pravatar.cc/150?u=david" />
          <PlayerCard name="Elena R." role="Striker" image="https://i.pravatar.cc/150?u=elena" />
          <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30 flex items-center justify-center">
            <Plus className="text-outline-variant" />
          </div>
          <div className="bg-surface-container-low p-3 rounded-2xl border border-outline-variant/30 flex items-center justify-center">
            <Plus className="text-outline-variant" />
          </div>
        </div>
      </section>

      {/* Rules & Equipment */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-container-low p-6 rounded-3xl relative overflow-hidden">
          <h4 className="font-headline font-extrabold text-xl mb-4 flex items-center gap-2">
            <Gavel className="w-5 h-5 text-primary" />
            Game Rules
          </h4>
          <ul className="space-y-3 text-sm text-on-surface font-medium">
            <li className="flex gap-2"><span className="text-primary font-black">/</span> No slide tackling allowed.</li>
            <li className="flex gap-2"><span className="text-primary font-black">/</span> Rotate goalkeepers every 15 mins.</li>
            <li className="flex gap-2"><span className="text-primary font-black">/</span> Fair play is the absolute priority.</li>
          </ul>
        </div>
        
        <div className="bg-surface-container-low p-6 rounded-3xl relative overflow-hidden">
          <h4 className="font-headline font-extrabold text-xl mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Gear Up
          </h4>
          <ul className="space-y-3 text-sm text-on-surface font-medium">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Turf shoes or cleats (FG/AG)
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Bring a white & dark shirt
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Shin guards recommended
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function StatBox({ icon, label, value }: any) {
  return (
    <div className="bg-surface-container-low p-4 rounded-2xl flex flex-col gap-1">
      {React.cloneElement(icon, { className: "text-primary w-5 h-5" })}
      <span className="text-[10px] text-on-surface-variant font-bold uppercase">{label}</span>
      <span className="font-headline font-bold text-sm">{value}</span>
    </div>
  );
}

function PlayerCard({ name, role, image }: any) {
  return (
    <div className="bg-surface-container-lowest p-3 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
        <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div>
        <p className="font-headline font-bold text-sm">{name}</p>
        <p className="text-[9px] uppercase font-bold text-primary">{role}</p>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg className={cn("w-6 h-6", className)} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
