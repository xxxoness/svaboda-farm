import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="theme-surface min-h-screen bg-[#07070c] text-white selection:bg-amber-400/30">
      <style>{`
        @keyframes float { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,-20px) scale(1.02); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
      <Navbar />
      <main className="theme-main pt-16 bg-[linear-gradient(180deg,#07070c_0%,#0b0b10_45%,#07070c_100%)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
