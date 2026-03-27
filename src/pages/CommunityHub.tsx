import { Search, PlusCircle, Compass, Users, Map as MapIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function CommunityHub() {
  const navigate = useNavigate();
  return (
    <div className="space-y-10">
      {/* Search & Action Bar */}
      <section className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
          <input 
            className="w-full bg-surface-container-lowest border-none h-14 pl-12 pr-4 rounded-lg focus:ring-0 border-b-2 border-transparent focus:border-primary transition-all placeholder:text-on-surface-variant/50" 
            placeholder="Search players, teams, or leagues..." 
            type="text"
          />
        </div>
        <button className="bg-primary text-white h-14 px-8 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary-dim active:scale-95 transition-all w-full md:w-auto">
          <PlusCircle className="w-5 h-5" />
          Create New Group
        </button>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Groups & Discovery */}
        <div className="lg:col-span-8 space-y-12">
          {/* Your Groups Section */}
          <section>
            <div className="flex justify-between items-baseline mb-6">
              <h2 className="font-headline font-bold text-2xl">Your Groups</h2>
              <button 
                onClick={() => navigate('/all-games')}
                className="text-primary font-bold text-sm hover:underline"
              >
                ver todos
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GroupCard 
                id="1"
                title="Tuesday Night Crew" 
                members={12} 
                type="Weekly Match" 
                tag="Active Now"
                image="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400&auto=format&fit=crop"
              />
              <GroupCard 
                title="Office Colleagues" 
                members={24} 
                type="Casual Play" 
                tag="3 Invites"
                image="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=400&auto=format&fit=crop"
              />
            </div>
          </section>

          {/* Discover Local Groups */}
          <section className="bg-primary-container p-8 rounded-xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-on-primary-container leading-tight mb-4 tracking-tight">Discover local groups near your location.</h2>
              <p className="text-on-primary-container/80 font-medium mb-6">Find competitive leagues or casual pickup games in your city within 5 miles.</p>
              <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 hover:bg-primary-dim transition-colors">
                <Compass className="w-5 h-5" />
                Find Games Nearby
              </button>
            </div>
            <div className="w-full md:w-64 h-48 bg-white/20 rounded-lg overflow-hidden relative border-4 border-white/30">
              <img 
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?q=80&w=400&auto=format&fit=crop" 
                alt="Map discovery" 
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </section>
        </div>

        {/* Right Column: Friends List */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold uppercase tracking-widest text-[0.75rem]">Friends Online</h2>
              <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[0.65rem] font-black">12 Total</span>
            </div>
            
            <div className="space-y-6">
              <FriendItem name="Marcus Rashford" role="Striker" status="Available" image="https://i.pravatar.cc/150?u=rashford" />
              <FriendItem name="Sarah Jenkins" role="Midfielder" status="Available" image="https://i.pravatar.cc/150?u=sarah" />
              <FriendItem name="David Chen" role="Goalkeeper" status="Busy" image="https://i.pravatar.cc/150?u=david" />
              <FriendItem name="Elena Rodriguez" role="Defender" status="Available" image="https://i.pravatar.cc/150?u=elena" />
            </div>
            
            <button className="w-full mt-10 py-3 rounded-lg border-2 border-outline-variant/20 font-bold text-sm hover:bg-surface-container-high transition-colors">
              Find More Friends
            </button>
          </div>

          {/* Stats Highlight */}
          <div className="bg-on-surface text-surface-container-lowest p-6 rounded-xl">
            <p className="text-[0.65rem] font-black uppercase tracking-widest text-surface-container-highest mb-2">Community Rank</p>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-black text-primary-container">#42</span>
              <span className="text-sm font-bold pb-1">in your city</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-[65%]" />
            </div>
            <p className="mt-3 text-[0.7rem] text-surface-container-highest/80 font-medium">Win 2 more games to reach Top 30!</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function GroupCard({ id, title, members, type, tag, image }: any) {
  return (
    <Link to={`/group/${id || '1'}/rankings`} className="bg-surface-container-lowest rounded-lg overflow-hidden group hover:scale-[1.01] transition-transform border border-outline-variant/10">
      <div className="h-32 bg-primary relative">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-60 mix-blend-multiply" referrerPolicy="no-referrer" />
        <span className="absolute top-4 right-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest">{tag}</span>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-1">{title}</h3>
        <p className="text-on-surface-variant text-sm mb-4">{members} Members • {type}</p>
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <img 
              key={i}
              className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" 
              src={`https://i.pravatar.cc/150?u=group${i}`} 
              alt="Member"
              referrerPolicy="no-referrer"
            />
          ))}
          <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest flex items-center justify-center text-[0.6rem] font-bold">+9</div>
        </div>
      </div>
    </Link>
  );
}

function FriendItem({ name, role, status, image }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="relative">
        <img src={image} alt={name} className="w-12 h-12 rounded-full bg-surface-container-highest" referrerPolicy="no-referrer" />
        <div className={cn(
          "absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-surface-container-low rounded-full",
          status === 'Available' ? "bg-primary-container" : "bg-surface-container-highest"
        )} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-sm">{name}</h4>
        <p className="text-[0.65rem] text-on-surface-variant font-bold uppercase tracking-wider">{role}</p>
      </div>
      <div className={cn(
        "text-[0.6rem] font-black uppercase",
        status === 'Available' ? "text-primary" : "text-on-surface-variant"
      )}>{status}</div>
    </div>
  );
}
