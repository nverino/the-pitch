import { Trophy, Shield, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function GroupRankings() {
  return (
    <div className="space-y-10">
      {/* Group Identity */}
      <div className="mb-10">
        <h2 className="text-on-surface font-bold text-3xl tracking-tight mb-1">Tuesday Night Crew</h2>
        <div className="flex items-center gap-2">
          <span className="bg-secondary-container text-on-secondary-container px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Season 4</span>
          <span className="text-on-surface-variant text-sm font-medium">12 Members • Last Match 2d ago</span>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between h-40 relative overflow-hidden">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Top Scorer</span>
            <h3 className="text-2xl font-bold mt-1">Marco Rossi</h3>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black text-primary">24</span>
            <div className="w-16 h-16 rounded-lg bg-surface-container-lowest flex items-center justify-center">
              <img 
                src="https://i.pravatar.cc/150?u=marco" 
                alt="Marco" 
                className="w-12 h-12 object-cover rounded-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <Trophy className="absolute -right-4 -top-4 text-primary/10 w-32 h-32" />
        </div>
        
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between h-40 relative overflow-hidden">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Clean Sheets</span>
            <h3 className="text-2xl font-bold mt-1">Elena Smith</h3>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-4xl font-black text-primary">8</span>
            <div className="w-16 h-16 rounded-lg bg-surface-container-lowest flex items-center justify-center">
              <img 
                src="https://i.pravatar.cc/150?u=elena" 
                alt="Elena" 
                className="w-12 h-12 object-cover rounded-md"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <Shield className="absolute -right-4 -top-4 text-primary/10 w-32 h-32" />
        </div>
      </div>

      {/* Podium / Leaderboard Selection */}
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold">Overall Leaderboard</h4>
        <div className="bg-surface-container flex p-1 rounded-lg">
          <button className="bg-surface-container-lowest text-primary font-bold px-4 py-1.5 rounded-md text-xs uppercase tracking-wider">Points</button>
          <button className="text-on-surface-variant font-medium px-4 py-1.5 rounded-md text-xs uppercase tracking-wider">Win Rate</button>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-4">
        <LeaderboardItem 
          rank={1} 
          name="Marco Rossi" 
          stats="15 Wins • 2 Draws" 
          points={47} 
          image="https://i.pravatar.cc/150?u=marco" 
          isFirst 
        />
        <LeaderboardItem 
          rank={2} 
          name="Julian Chen" 
          stats="13 Wins • 4 Draws" 
          points={43} 
          image="https://i.pravatar.cc/150?u=julian" 
        />
        <LeaderboardItem 
          rank={3} 
          name="Sarah Jenkins" 
          stats="12 Wins • 3 Draws" 
          points={39} 
          image="https://i.pravatar.cc/150?u=sarah" 
        />
        
        {[4, 5, 6].map((r) => (
          <div key={r} className="px-5 py-4 flex items-center gap-6 border-b border-outline-variant/10">
            <div className="w-8 text-center">
              <span className="text-on-surface-variant font-bold text-lg">{r}</span>
            </div>
            <img 
              src={`https://i.pravatar.cc/150?u=player${r}`} 
              alt="Player" 
              className="w-10 h-10 rounded-md"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <h5 className="text-on-surface font-bold">Player {r}</h5>
              <p className="text-on-surface-variant text-xs font-medium">10 Wins • 5 Draws</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-on-surface">{40 - r * 2}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardItem({ rank, name, stats, points, image, isFirst }: any) {
  return (
    <div className={cn(
      "rounded-xl p-5 flex items-center gap-6 group transition-all duration-200",
      isFirst ? "bg-primary-container" : "bg-surface-container-low hover:bg-surface-container-high"
    )}>
      <div className="flex flex-col items-center">
        <span className={cn("font-black text-2xl", isFirst ? "text-on-primary-container" : "text-on-surface")}>{rank}</span>
        <span className={cn("text-[10px] font-bold uppercase", isFirst ? "text-on-primary-container/60" : "text-on-surface-variant")}>
          {rank === 1 ? 'ST' : rank === 2 ? 'ND' : 'RD'}
        </span>
      </div>
      <img 
        src={image} 
        alt={name} 
        className={cn("w-14 h-14 rounded-lg p-1", isFirst ? "bg-white/20" : "bg-white")}
        referrerPolicy="no-referrer"
      />
      <div className="flex-1">
        <h5 className={cn("font-bold text-xl", isFirst ? "text-on-primary-container" : "text-on-surface")}>{name}</h5>
        <p className={cn("text-sm font-medium", isFirst ? "text-on-primary-container/70" : "text-on-surface-variant")}>{stats}</p>
      </div>
      <div className="text-right">
        <span className={cn("block text-3xl font-black leading-none", isFirst ? "text-on-primary-container" : "text-primary")}>{points}</span>
        <span className={cn("text-[10px] font-bold uppercase", isFirst ? "text-on-primary-container/60" : "text-on-surface-variant")}>Points</span>
      </div>
    </div>
  );
}
