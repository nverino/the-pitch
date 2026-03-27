import React, { useState } from 'react';
import { MapPin, Map as MapIcon, Plus, Check, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useFirebase } from '../context/FirebaseContext';
import { db, collection, addDoc } from '../firebase';

export default function CreateGame() {
  const { user } = useFirebase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: 'Arena One, Downtown',
    type: '5 vs 5',
    cost: 15,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'games'), {
        ...formData,
        organizerId: user.uid,
        players: [user.uid],
        status: 'scheduled',
        createdAt: new Date().toISOString()
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <span className="font-headline font-semibold text-xs uppercase tracking-[0.2em] text-primary">New Match</span>
        <h2 className="font-headline font-extrabold text-4xl leading-tight tracking-tight text-on-surface">
          Organiza tu propio<br /><span className="text-primary italic">Partido de Fútbol</span>
        </h2>
      </section>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Info Card */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 field-pattern relative overflow-hidden">
          <div className="absolute -top-4 -right-4 opacity-5 pointer-events-none">
            <Trophy className="w-[120px] h-[120px]" />
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-headline font-semibold text-[10px] uppercase tracking-wider text-on-surface-variant">Game Title</label>
              <input 
                className="w-full bg-surface-container-low border border-transparent rounded-lg p-4 focus:border-primary focus:bg-surface-container-lowest transition-all text-on-surface font-semibold placeholder:text-outline-variant/50 outline-none" 
                placeholder="e.g. Wednesday Night Lights" 
                type="text" 
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="font-headline font-semibold text-[10px] uppercase tracking-wider text-on-surface-variant">Date</label>
                <input 
                  className="w-full bg-surface-container-low border border-transparent rounded-lg p-4 focus:border-primary focus:bg-surface-container-lowest transition-all text-on-surface outline-none" 
                  type="date" 
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="font-headline font-semibold text-[10px] uppercase tracking-wider text-on-surface-variant">Time</label>
                <input 
                  className="w-full bg-surface-container-low border border-transparent rounded-lg p-4 focus:border-primary focus:bg-surface-container-lowest transition-all text-on-surface outline-none" 
                  type="time" 
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Location & Map */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 space-y-4">
          <div className="flex justify-between items-end">
            <div className="space-y-2 flex-1 mr-4">
              <label className="font-headline font-semibold text-[10px] uppercase tracking-wider text-on-surface-variant">Location</label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-4 text-primary w-5 h-5" />
                <input 
                  className="w-full bg-surface-container-low border border-transparent rounded-lg p-4 pl-12 focus:border-primary focus:bg-surface-container-lowest transition-all text-on-surface outline-none" 
                  placeholder="Search stadium or park..." 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>
            <button className="bg-secondary-container text-on-secondary-container px-4 py-4 rounded-lg font-headline font-bold text-xs uppercase tracking-tighter flex items-center gap-2 hover:bg-secondary-container/80 active:scale-95 transition-all" type="button">
              <MapIcon className="w-4 h-4" />
              Map
            </button>
          </div>
          
          <div className="h-40 w-full rounded-lg overflow-hidden bg-surface-container-high relative group cursor-pointer">
            <img 
              className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=800&auto=format&fit=crop" 
              alt="Map"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-primary rounded-full border-2 border-white flex items-center justify-center shadow-lg animate-bounce">
                <Plus className="text-white w-4 h-4" />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md shadow-sm border border-white/50">
              <p className="text-[10px] font-bold text-on-surface uppercase tracking-tight">{formData.location}</p>
            </div>
          </div>
        </div>

        {/* Game Mechanics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 space-y-4">
            <label className="font-headline font-semibold text-[10px] uppercase tracking-wider text-on-surface-variant">Game Type</label>
            <div className="flex flex-wrap gap-2">
              {['5 vs 5', '7 vs 7', '11 vs 11'].map((type) => (
                <button 
                  key={type}
                  className={cn(
                    "px-3 py-2 rounded-full font-headline font-bold text-[10px] uppercase transition-colors",
                    formData.type === type ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                  )}
                  type="button"
                  onClick={() => setFormData({ ...formData, type })}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 space-y-4">
            <label className="font-headline font-semibold text-[10px] uppercase tracking-wider text-on-surface-variant">Cost per Player</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 font-headline font-bold text-primary">$</span>
              <input 
                className="w-full bg-surface-container-low border border-transparent rounded-lg p-4 pl-10 focus:border-primary focus:bg-surface-container-lowest transition-all text-on-surface font-bold text-xl outline-none" 
                type="number" 
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {/* Invite Friends */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-headline font-semibold text-[10px] uppercase tracking-wider text-on-surface-variant">Invite Friends or Groups</label>
            <button className="text-primary font-headline font-bold text-[10px] uppercase tracking-tight hover:underline" type="button">View All</button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex-shrink-0 w-16 space-y-2 text-center group">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-outline-variant flex items-center justify-center text-outline-variant group-hover:border-primary group-hover:text-primary transition-colors cursor-pointer">
                <Plus className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase truncate">Add New</p>
            </div>
            
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-16 space-y-2 text-center group">
                <div className="relative w-16 h-16">
                  <img 
                    className="w-16 h-16 rounded-full object-cover group-hover:ring-2 ring-primary transition-all" 
                    src={`https://i.pravatar.cc/150?u=${i}`} 
                    alt="Friend"
                    referrerPolicy="no-referrer"
                  />
                  {i === 1 && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center border border-white">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className="text-[10px] font-bold text-on-surface uppercase truncate">Friend {i}</p>
              </div>
            ))}
            
            <div className="flex-shrink-0 w-16 space-y-2 text-center group">
              <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center text-primary group-hover:scale-105 transition-all">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold text-on-surface uppercase truncate">Elite FC</p>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-primary py-5 rounded-xl text-white font-headline font-black text-lg uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Game'}
        </button>
      </form>
    </div>
  );
}
