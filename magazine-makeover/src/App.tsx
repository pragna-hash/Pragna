import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, Edit2, Trash2, Plus, Home, ArrowLeft, ChevronRight, Mic, Rocket, Users } from 'lucide-react';

// --- FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, onSnapshot,
  query, orderBy, doc, deleteDoc, updateDoc, serverTimestamp
} from "firebase/firestore";

// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyD20A4DjEt7OryAG_fl7RFXe4-8sl4QJus",
  authDomain: "pragna-magzine2026.firebaseapp.com",
  projectId: "pragna-magzine2026",
  storageBucket: "pragna-magzine2026.firebasestorage.app",
  messagingSenderId: "830319855686",
  appId: "1:830319855686:web:4c3a84bb6808f463086247"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// --- Types ---
interface Article {
  id: any;
  title: string;
  category: 'TRENDING' | 'TECHNOLOGY' | 'DESIGN' | 'CULTURE' | 'STARTUPS' | 'PODCASTS' | 'ALL';
  image: string;
  description: string;
  content: string;
  createdAt?: any;
}

// --- Editorial Board Data ---
const EDITORIAL_TEAM = [
  { name: "Madhurima", role: "Team Lead", image: "https://i.ibb.co/vxTv3q9k/madhurima.png" },
  { name: "Puja Yadav", role: "Database", image: "https://i.ibb.co/NnsTQB8x/puja.png" },
  { name: "Ashok", role: "Frontend", image: "https://i.ibb.co/4gRdGwq6/ashok.png" },
  //{ name: "Santosh", role: "", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" }
];

// --- Indian Focused Data 2026 ---
const INITIAL_ARTICLES: Article[] = [
  { id: 1, title: "India's 2026 Economic Outlook", category: "TRENDING", image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d", description: "Projecting a decade of unprecedented growth.", content: "India enters 2026 with a robust 8.2% GDP growth forecast..." },
  { id: 2, title: "The Startup Unicorn Surge", category: "STARTUPS", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd", description: "How Tier-2 cities are leading the next tech wave.", content: "In 2026, the definition of a startup hub has shifted from Bangalore to cities like Indore and Kochi..." },
  { id: 3, title: "Voices of Bharat: Episode 12", category: "PODCASTS", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618", description: "Discussing AI ethics with rural innovators.", content: "Our latest podcast explores how Bhashini AI is being used in local panchayats..." },
  { id: 4, title: "6G Trials in Urban India", category: "TECHNOLOGY", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", description: "Connectivity redefined in the heart of Bharat.", content: "Department of Telecom initiates 6G trials in Hyderabad..." }
];

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [activeCategory, setActiveCategory] = useState<string>('Home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({ title: '', category: 'TECHNOLOGY' as any, image: '', description: '', content: '' });

  useEffect(() => {
    const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
    const unsubArticles = onSnapshot(q, (snapshot) => {
      const dbArticles = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Article));
      setArticles([...dbArticles, ...INITIAL_ARTICLES]);
    });

    const unsubSubs = onSnapshot(collection(db, "subscribers"), (snap) => {
      setSubscribers(snap.docs.map(doc => doc.data().email));
    });

    const qInq = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const unsubInq = onSnapshot(qInq, (snap) => {
      setInquiries(snap.docs.map(doc => doc.data() as any));
    });

    return () => { unsubArticles(); unsubSubs(); unsubInq(); };
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchesCategory = activeCategory === 'Home' || a.category === activeCategory.replace('-', '').toUpperCase();
      const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (e.target.user.value === 'admin' && e.target.pass.value === '123') {
      setIsAdmin(true); setShowLogin(false);
    } else alert("Invalid Credentials");
  };

  const saveArticle = async () => {
    try {
      let finalData = { ...formData };
      if (finalData.image.includes('ibb.co') && !finalData.image.includes('i.ibb.co')) {
        const urlParts = finalData.image.split('/');
        const imageCode = urlParts[urlParts.length - 1];
        if (imageCode) {
          finalData.image = `https://i.ibb.co/${imageCode}/image.png`;
        }
      }

      if (editingArticle) {
        if (typeof editingArticle.id === 'string') {
          await updateDoc(doc(db, "articles", editingArticle.id), finalData);
        } else {
          alert("Static initial articles cannot be modified in DB.");
        }
        setEditingArticle(null);
      } else {
        await addDoc(collection(db, "articles"), {
          ...finalData,
          createdAt: serverTimestamp()
        });
      }
      setFormData({ title: '', category: 'TECHNOLOGY', image: '', description: '', content: '' });
      alert("Successfully Published!");
    } catch (err) {
      console.error("Error saving article:", err);
    }
  };

  const deleteArticle = async (id: any) => {
    if (window.confirm("Confirm delete? This cannot be undone.")) {
      try {
        if (typeof id === 'string') {
          await deleteDoc(doc(db, "articles", id));
          alert("Deleted from Database!");
        } else {
          setArticles(prev => prev.filter(x => x.id !== id));
          alert("Removed static article!");
        }
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      await addDoc(collection(db, "subscribers"), { email: emailInput, createdAt: serverTimestamp() });
      alert(`Success! ${emailInput} has been subscribed.`);
      setEmailInput('');
      setShowSubscribe(false);
    }
  };

  const handleContactSubmit = async (e: any) => {
    e.preventDefault();
    await addDoc(collection(db, "inquiries"), {
      name: e.target.cname.value,
      email: e.target.cemail.value,
      message: e.target.cmessage.value,
      createdAt: serverTimestamp()
    });
    alert("Message Sent Successfully! Admin will see this.");
    setShowContact(false);
  };

  return (
    <div className="min-h-screen bg-white font-serif text-slate-900">
      <header className="border-b px-8 py-6 flex justify-between items-center sticky top-0 bg-white z-50 shadow-sm">
        <div className="flex gap-4 font-sans font-bold text-xs tracking-widest">
          <button onClick={() => setShowSubscribe(true)} className="hover:text-blue-600">SUBSCRIBE</button>
          <span className="text-gray-300">|</span>
          <button onClick={() => isAdmin ? setIsAdmin(false) : setShowLogin(true)} className="text-blue-600">
            {isAdmin ? 'LOGOUT' : 'LOGIN'}
          </button>
        </div>

        <div className="text-center" onClick={() => { setActiveCategory('Home'); setSelectedArticle(null) }} style={{ cursor: 'pointer' }}>
          <h1 className="text-5xl font-black tracking-[0.2em] mb-1">PRAGNA</h1>
          <p className="font-sans text-[10px] tracking-[0.4em] text-gray-400 uppercase">Tech | Startups | Podcasts | Future</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center bg-gray-50 rounded-full px-4 py-1.5">
            {isSearchOpen && (
              <input
                autoFocus type="text" placeholder="Search India 2026..."
                className="bg-transparent outline-none font-sans text-xs w-40"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            <Search size={18} className="cursor-pointer text-gray-600" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          </div>

          <div className="flex items-center gap-2 border-l-2 border-black pl-4">
            <span className="text-3xl font-black tracking-tighter">20<span className="text-amber-500">26</span></span>
            <span className="text-[9px] font-bold leading-none border-l border-gray-300 pl-2">INDIA<br />EDITION</span>
          </div>
        </div>
      </header>

      <nav className="flex justify-center gap-6 py-4 border-b font-sans font-bold text-[10px] tracking-[0.2em] uppercase sticky top-[105px] bg-white z-40 overflow-x-auto">
        {['Home', 'Trending', 'Technology', 'Startups', 'Podcasts', 'Design', 'Culture'].map(item => (
          <button
            key={item}
            onClick={() => { setActiveCategory(item); setSelectedArticle(null) }}
            className={`transition-all hover:text-amber-600 whitespace-nowrap ${activeCategory === item ? 'text-amber-600 border-b-2 border-amber-600' : ''}`}
          >
            {item}
          </button>
        ))}
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        {isAdmin ? (
          <div className="bg-[#0a192f] rounded-[2rem] p-10 text-white shadow-2xl animate-in fade-in">
            <div className="flex justify-between items-center mb-10 border-b border-blue-900 pb-6">
              <h2 className="text-3xl font-black text-[#d4af37] tracking-widest">PRAGNA CONTROL PANEL</h2>
              <button onClick={() => setIsAdmin(false)} className="bg-[#d4af37] text-[#0a192f] px-8 py-2.5 rounded-full font-bold flex gap-2 items-center hover:bg-amber-500 transition-all">
                <Home size={18} /> RETURN TO HOME
              </button>
            </div>

            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-4 space-y-6">
                <div className="bg-[#112240] p-8 rounded-3xl border border-blue-800/20">
                  <h3 className="text-[#d4af37] font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Plus size={18} /> {editingArticle ? 'Update Article' : 'Draft New Story'}
                  </h3>
                  <div className="space-y-4 font-sans text-sm">
                    <input placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-[#0a192f] border border-blue-900 rounded-lg p-3 text-white outline-none focus:border-[#d4af37]" />
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })} className="w-full bg-[#0a192f] border border-blue-900 rounded-lg p-3 text-white">
                      <option>TRENDING</option><option>TECHNOLOGY</option><option>STARTUPS</option><option>PODCASTS</option><option>DESIGN</option><option>CULTURE</option>
                    </select>
                    <input placeholder="Paste ImgBB Link here" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full bg-[#0a192f] border border-blue-900 rounded-lg p-3 text-white" />
                    <textarea placeholder="Story Snippet" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-[#0a192f] border border-blue-900 rounded-lg p-3 text-white h-20" />
                    <textarea placeholder="Full Article Body" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className="w-full bg-[#0a192f] border border-blue-900 rounded-lg p-3 text-white h-40" />
                    <button onClick={saveArticle} className="w-full bg-[#d4af37] text-[#0a192f] py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                      {editingArticle ? 'Update Live' : 'Publish Story'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-8 space-y-8">
                <div className="bg-[#112240] p-8 rounded-3xl border border-blue-800/20">
                  <h4 className="text-[#d4af37] text-[10px] font-bold mb-4 uppercase tracking-[0.2em]">Management</h4>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                    {articles.map(a => (
                      <div key={a.id} className="flex justify-between items-center bg-[#0a192f] p-4 rounded-2xl border border-blue-900/40">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded bg-blue-900 overflow-hidden"><img src={a.image} className="w-full h-full object-cover" alt="" /></div>
                          <span className="font-bold text-sm text-gray-200">{a.title}</span>
                        </div>
                        <div className="flex gap-4">
                          <Edit2 size={16} className="text-blue-400 cursor-pointer hover:text-white" onClick={() => { setEditingArticle(a); setFormData(a) }} />
                          <Trash2 size={16} className="text-red-400 cursor-pointer hover:text-red-600" onClick={() => deleteArticle(a.id)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 font-sans">
                  <div className="bg-[#112240] p-6 rounded-3xl border border-blue-800/20">
                    <h5 className="text-[#d4af37] text-[10px] font-bold mb-4 uppercase">Subscribers ({subscribers.length})</h5>
                    {subscribers.map((s, i) => <div key={i} className="text-xs py-2 border-b border-blue-900/30 text-gray-300">{s}</div>)}
                  </div>
                  <div className="bg-[#112240] p-6 rounded-3xl border border-blue-800/20">
                    <h5 className="text-[#d4af37] text-[10px] font-bold mb-4 uppercase">Inquiries ({inquiries.length})</h5>
                    {inquiries.map((inq, i) => <div key={i} className="text-[10px] text-gray-400 italic bg-[#0a192f] p-3 rounded-lg mb-2">"{inq.message}" - <b>{inq.name}</b></div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedArticle ? (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
            <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-blue-600 font-sans font-bold mb-10 group hover:underline">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> BACK TO HOME
            </button>
            <img src={selectedArticle.image} className="w-full h-[600px] object-cover rounded-[3rem] mb-12 shadow-2xl" alt="" />
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{selectedArticle.category}</span>
              <span className="text-gray-400 font-sans text-xs tracking-widest">JANUARY 2026</span>
            </div>
            <h2 className="text-7xl font-black mb-10 leading-[1.1] text-slate-900">{selectedArticle.title}</h2>
            <div className="prose prose-xl font-serif text-gray-700 leading-relaxed first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-amber-600">
              {selectedArticle.content}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            {activeCategory === 'Home' && searchQuery === '' && articles.length > 0 && (
              <div className="relative h-[650px] rounded-[3.5rem] overflow-hidden shadow-2xl mb-20 group cursor-pointer" onClick={() => setSelectedArticle(articles[0])}>
                <img src={articles[0].image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex flex-col justify-end p-20 text-white">
                  <span className="bg-amber-600 text-[10px] font-black px-4 py-1.5 rounded-full w-fit mb-6 tracking-widest uppercase">Editor's Choice</span>
                  <h2 className="text-8xl font-black mb-8 leading-none tracking-tight">{articles[0].title}</h2>
                  <p className="text-xl text-gray-300 max-w-2xl font-sans font-light leading-relaxed">{articles[0].description}</p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-end mb-12 border-b-2 border-slate-100 pb-4">
              <h3 className="text-2xl font-black uppercase tracking-widest">
                {activeCategory === 'Home' ? 'The Journal' : activeCategory}
                {searchQuery && <span className="text-amber-600 ml-4 font-sans text-sm tracking-normal">Results for: "{searchQuery}"</span>}
              </h3>
              <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">{filteredArticles.length} Stories Found</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {filteredArticles.length > 0 ? filteredArticles.map(art => (
                <div key={art.id} className="group cursor-pointer flex flex-col" onClick={() => setSelectedArticle(art)}>
                  <div className="h-72 rounded-[2rem] overflow-hidden mb-6 shadow-lg relative">
                    <img src={art.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {art.category === 'PODCASTS' && <div className="bg-red-600 text-white p-2 rounded-full shadow-lg"><Mic size={16} /></div>}
                      {art.category === 'STARTUPS' && <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg"><Rocket size={16} /></div>}
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ChevronRight className="text-white bg-amber-600 rounded-full p-2" size={40} />
                    </div>
                  </div>
                  <span className="text-amber-600 font-sans font-black text-[10px] tracking-widest uppercase mb-3">{art.category}</span>
                  <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-blue-700 transition-colors">{art.title}</h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed line-clamp-2">{art.description}</p>
                </div>
              )) : (
                <div className="col-span-4 text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="font-sans font-bold text-gray-400 tracking-widest uppercase">No articles matching your search.</p>
                </div>
              )}
            </div>

            {/* --- Editorial Board Section --- */}
            {activeCategory === 'Home' && !searchQuery && (
              <div className="mt-32 pt-20 border-t-2 border-slate-100">
                <div className="flex items-center gap-4 mb-12">
                  <Users className="text-amber-500" size={32} />
                  <h3 className="text-4xl font-black uppercase tracking-tighter">Editorial Board</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {EDITORIAL_TEAM.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                      <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm group-hover:scale-105 transition-transform" />
                      <div>
                        <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                        <p className="text-xs font-sans font-bold text-amber-600 tracking-widest uppercase">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center mt-28">
              <button onClick={() => setShowContact(true)} className="bg-slate-900 text-white px-16 py-5 rounded-full font-sans font-bold tracking-[0.4em] hover:bg-amber-600 hover:scale-105 transition-all shadow-2xl uppercase text-xs">Get In Touch</button>
            </div>
          </div>
        )}
      </main>

      {/* --- MODALS --- */}
      {showSubscribe && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white p-10 rounded-[2rem] w-full max-w-md shadow-2xl relative text-center">
            <button onClick={() => setShowSubscribe(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black"><X /></button>
            <h2 className="text-3xl font-black italic mb-4">JOIN PRAGNA</h2>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input type="email" required placeholder="Enter Your Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-amber-500" />
              <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-amber-600 transition-all">SUBSCRIBE NOW</button>
            </form>
          </div>
        </div>
      )}

      {showContact && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-lg shadow-2xl relative">
            <button onClick={() => setShowContact(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black"><X /></button>
            <h2 className="text-4xl font-black mb-2 uppercase">Get In Touch</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input name="cname" required type="text" placeholder="Full Name" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600" />
              <input name="cemail" required type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600" />
              <textarea name="cmessage" required placeholder="Your message..." className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 h-32 outline-none focus:ring-2 focus:ring-blue-600"></textarea>
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-slate-900 transition-all uppercase text-sm">Send Message</button>
            </form>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center z-[100] p-6">
          <div className="bg-white p-12 rounded-[3rem] w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <h2 className="text-4xl font-black italic mb-10 text-center tracking-tighter">PRAGNA <span className="text-amber-600">2026</span></h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <input name="user" type="text" placeholder="Username" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-amber-500" defaultValue="admin" />
              <input name="pass" type="password" placeholder="Password" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-amber-500" defaultValue="123" />
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black tracking-widest hover:bg-amber-600 transition-all uppercase text-sm mt-4">Authenticate</button>
              <button type="button" onClick={() => setShowLogin(false)} className="w-full text-gray-400 text-xs font-bold uppercase tracking-widest mt-2 hover:text-slate-900">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}