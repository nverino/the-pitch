import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight, Star, Users, Zap } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 100 }}
          className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]"
        >
          <Trophy className="w-12 h-12 text-slate-950" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-headline text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 uppercase"
        >
          Bienvenido a<br />
          <span className="text-primary italic">The Pitch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 font-medium"
        >
          La plataforma definitiva para organizar, jugar y dominar el campo. Tu carrera futbolística comienza ahora.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16"
        >
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <Star className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Sube de Nivel</h3>
            <p className="text-sm text-slate-400">Gana puntos de experiencia en cada partido y escala en el ranking.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <Users className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Comunidad</h3>
            <p className="text-sm text-slate-400">Conéctate con otros jugadores y únete a los mejores grupos locales.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm">
            <Zap className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Organización</h3>
            <p className="text-sm text-slate-400">Crea partidos en segundos y gestiona invitaciones fácilmente.</p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate('/')}
          className="group bg-primary text-slate-950 px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-widest flex items-center gap-4 shadow-[0_20px_40px_rgba(var(--primary-rgb),0.2)]"
        >
          Entrar al Campo
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}
