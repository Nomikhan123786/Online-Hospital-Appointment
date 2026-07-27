import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24" style={{ background: "var(--color-ink-900)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-white" style={{ background: "var(--color-brand-500)" }}>
              +
            </div>
            <span className="font-display font-bold text-lg text-white">MediCare+</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--color-ink-400)" }}>
            Book trusted doctors, manage appointments, and access your medical
            history — all in one secure platform.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--color-ink-400)" }}>
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-white transition-colors">Find Doctors</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Book Appointment</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Patient Login</Link></li>
          </ul>
        </div>

        {/* Departments */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Departments</h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--color-ink-400)" }}>
            <li>Cardiology</li>
            <li>Dermatology</li>
            <li>Pediatrics</li>
            <li>Orthopedics</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--color-ink-400)" }}>
            <li>support@medicareplus.com</li>
            <li>+1 (555) 010-2030</li>
            <li>24/7 Patient Helpline</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs" style={{ color: "var(--color-ink-400)" }}>
          <p>© {year} MediCare+. All rights reserved.</p>
          <p>Built for better healthcare access.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
