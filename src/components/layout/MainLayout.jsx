import Header from "../molecules/Header";
import Footer from "./Footer";

export default function MainLayout({ children, onNavigate, currentPage }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white via-80% to-pink-50">
      {/* Header */}
      <Header onNavigate={onNavigate} currentPage={currentPage} />

      {/* Main Content */}
      <main className="overflow-auto">
        <div className="px-6 py-8 max-w-7xl mx-auto">{children}</div>
        <Footer />
      </main>
    </div>
  );
}
