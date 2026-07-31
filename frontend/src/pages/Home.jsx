import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/axiosInstance";
import "../style/index.css";
import Footer from "../components/Footer";

const departments = [
  { name: "Cardiology", desc: "Heart care & diagnostics", icon: "❤" },
  { name: "Neurology", desc: "Brain & nervous system", icon: "🧠" },
  { name: "Pediatrics", desc: "Child & infant health", icon: "🧒" },
  { name: "Orthopedics", desc: "Bones & joint care", icon: "🦴" },
  { name: "Dermatology", desc: "Skin & hair treatment", icon: "🩹" },
  { name: "Dentistry", desc: "Oral & dental care", icon: "🦷" },
  { name: "Ophthalmology", desc: "Eye care & surgery", icon: "👁" },
  { name: "General Medicine", desc: "Everyday health needs", icon: "🩺" },
];

// const testimonials = [
//   {
//     quote:
//       "Booking an appointment took less than two minutes, and the reminders meant I never missed a follow-up.",
//     name: "Emily Carter",
//     role: "Patient",
//   },
//   {
//     quote:
//       "As a working parent, being able to check doctor availability in real time has been a genuine time-saver.",
//     name: "Daniel Reyes",
//     role: "Patient",
//   },
//   {
//     quote:
//       "The platform keeps my schedule organized and lets me review patient history before every visit.",
//     name: "Dr. Sarah Bennett",
//     role: "Cardiologist",
//   },
// ];

const faqs = [
  {
    q: "How do I book an appointment?",
    a: "Create a free account, browse doctors by department or availability, then choose a time slot that works for you. You'll get an instant confirmation.",
  },
  {
    q: "Can I cancel or reschedule an appointment?",
    a: "Yes. Go to My Appointments from your dashboard and reschedule or cancel up to 24 hours before your slot, free of charge.",
  },
  {
    q: "Is my medical information secure?",
    a: "All patient data is encrypted in transit and at rest, and access is restricted to your care team and authorized administrators only.",
  },
  {
    q: "How do payments work?",
    a: "Consultation fees are paid securely online at checkout via Stripe. You'll receive a receipt by email right after payment.",
  },
];

const stats = [
  { value: "120+", label: "Verified Doctors" },
  { value: "45K+", label: "Appointments Booked" },
  { value: "98%", label: "Patient Satisfaction" },
  { value: "24/7", label: "Support Availability" },
];

const FaqItem = ({ item, isOpen, onClick }) => (
  <div className="surface-card overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
    >
      <span className="font-semibold text-ink-900 text-sm sm:text-base">
        {item.q}
      </span>
      <span
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-brand-700 bg-brand-50 transition-transform ${isOpen ? "rotate-45" : ""}`}
      >
        +
      </span>
    </button>
    {isOpen && (
      <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-ink-600 leading-relaxed">
        {item.a}
      </p>
    )}
  </div>
);

const Home = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await API.get("/doctors");
        setDoctors(data);
      } catch (error) {
        console.log("Error fetching doctors:", error);
      } finally {
        setDoctorsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <div className="animate-fade-in">
        {/* ---------------- Hero ---------------- */}
        <section
          className="relative overflow-hidden bg-brand-900"
          style={{
            background:
              " linear-gradient(90deg,rgba(111, 181, 238, 1) 0%, rgba(56, 224, 196, 1) 100%, rgba(87, 199, 133, 1) 40%, rgba(0, 0, 0, 1) 53%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="text-center lg:text-left animate-fade-up">
              <span className="inline-block bg-white/10 text-white text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full mb-5 border border-white/20">
                Trusted Healthcare Platform
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-5 sm:mb-6 leading-tight">
                Quality Healthcare, <br className="hidden sm:block" />
                Booked in Minutes
              </h1>
              <p className="text-base sm:text-lg text-brand-50/90 mb-8 max-w-xl mx-auto lg:mx-0">
                Connect with verified doctors across every specialty, book
                appointments instantly, and manage your care securely — all in
                one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/doctors"
                  className="btn-primary bg-white! text-brand-700! hover:bg-brand-50! shadow-lg"
                >
                  Find a Doctor
                </Link>
                <Link
                  to="/register"
                  className="btn-secondary bg-transparent! text-white! border-white/30!"
                >
                  Create Free Account
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="glass-card glass bg-accent-400 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
                <p className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-4">
                  Next Available
                </p>
                {doctorsLoading ? (
                  [...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-12 rounded-lg bg-white/10 animate-pulse mb-3 last:mb-0"
                    />
                  ))
                ) : doctors.length === 0 ? (
                  <p className="text-white/70 text-sm">
                    No doctors available yet.
                  </p>
                ) : (
                  doctors.slice(0, 3).map((d) => (
                    <div
                      key={d._id}
                      className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                    >
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {d.user?.name}
                        </p>
                        <p className="text-brand-100 text-xs">
                          {d.specialization}
                        </p>
                      </div>
                      <span className="text-white/70 text-xs">${d.fees}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Trusted Hospitals ---------------- */}
        <section className="py-10 sm:py-12 border-b border-ink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs sm:text-sm font-semibold tracking-wide uppercase text-ink-400 mb-6">
              Trusted by leading hospitals & clinics
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center opacity-80">
              {[
                "St. Luke's General",
                "Riverside Medical",
                "Cedar Health",
                "Unity Clinics",
                "Northgate Care",
              ].map((h) => (
                <p
                  key={h}
                  className="text-center text-sm sm:text-base font-display font-semibold text-ink-600"
                >
                  {h}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Stats ---------------- */}
        <section
          className="py-14 sm:py-16"
          style={{ background: "var(--color-brand-50)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-display font-extrabold text-brand-700">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-ink-600 mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Why Choose Us ---------------- */}
        <section
          className="py-16 sm:py-20 md:py-24"
          style={{ background: "var(--color-ink-50)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
                Why Patients Choose Online Hospital Appointment+
              </h2>
              <p className="text-ink-600 text-sm sm:text-base">
                Everything you need for accessible, transparent, and secure
                healthcare.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: "✅",
                  title: "Verified Doctors",
                  desc: "Every doctor is credential-checked and reviewed before joining the platform.",
                },
                {
                  icon: "⚡",
                  title: "Instant Booking",
                  desc: "Real-time availability means no phone calls and no waiting for confirmation.",
                },
                {
                  icon: "🔒",
                  title: "Secure Payments",
                  desc: "Stripe-powered checkout keeps your payment and medical data fully protected.",
                },
                {
                  icon: "📋",
                  title: "Digital Records",
                  desc: "Access prescriptions and medical history anytime from your dashboard.",
                },
                {
                  icon: "🔔",
                  title: "Smart Reminders",
                  desc: "Automatic notifications keep you on top of upcoming appointments.",
                },
                {
                  icon: "💬",
                  title: "24/7 Support",
                  desc: "Our support team is available around the clock for urgent questions.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="surface-card p-6 sm:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl mb-4">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-ink-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Departments ---------------- */}
        <section
          className="py-16 sm:py-20 md:py-24"
          style={{ background: "var(--color-ink-50)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
                Medical Departments
              </h2>
              <p className="text-ink-600 text-sm sm:text-base">
                Find the right specialist for your needs across our full range
                of departments.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {departments.map((d) => (
                <Link
                  to="/doctors"
                  key={d.name}
                  className="surface-card p-5 sm:p-6 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-3xl mb-3">{d.icon}</div>
                  <h3 className="font-semibold text-ink-900 text-sm sm:text-base">
                    {d.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-400 mt-1">
                    {d.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Top Doctors ---------------- */}
        <section
          className="py-16 sm:py-20 md:py-24"
          style={{ background: "var(--color-ink-50)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 sm:mb-16 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink-900 mb-3">
                  Meet Our Top Doctors
                </h2>
                <p className="text-ink-600 text-sm sm:text-base max-w-xl">
                  Highly rated specialists ready to take care of you and your
                  family.
                </p>
              </div>
              <Link
                to="/doctors"
                className="btn-secondary shrink-0 self-start sm:self-auto"
              >
                View All Doctors
              </Link>
            </div>

            {doctorsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="surface-card h-64 animate-pulse bg-ink-50"
                  />
                ))}
              </div>
            ) : doctors.length === 0 ? (
              <div className="surface-card text-center py-14 px-6">
                <div className="text-4xl mb-3">🩺</div>
                <p className="text-ink-600 font-medium">
                  No doctors available yet
                </p>
                <p className="text-sm text-ink-400 mt-1">
                  Check back soon as we onboard new specialists.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {doctors.slice(0, 4).map((d) => (
                  <div
                    key={d._id}
                    className="surface-card overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="h-36 flex items-center justify-center text-4xl font-display font-bold text-brand-600"
                      style={{ background: "var(--color-brand-50)" }}
                    >
                      {d.user?.name?.charAt(0)}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-ink-900">
                        {d.user?.name}
                      </h3>
                      <p className="text-sm text-brand-600 mb-1">
                        {d.specialization}
                      </p>
                      <p className="text-xs text-ink-400">
                        {d.experience
                          ? `${d.experience} yrs experience`
                          : d.hospitalName}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs font-medium text-ink-600">
                          ${d.fees} fee
                        </span>
                        <Link
                          to={`/doctor/${d._id}`}
                          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                        >
                          Book →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Appointment Process ---------------- */}
        <section
          className="py-16 sm:py-20 md:py-24"
          style={{ background: "var(--color-ink-50)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
                Book in Three Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 relative">
              {[
                {
                  step: "01",
                  title: "Choose a Doctor",
                  desc: "Browse by department, availability, or rating to find the right fit.",
                },
                {
                  step: "02",
                  title: "Pick a Time Slot",
                  desc: "Select an available slot that fits your schedule in real time.",
                },
                {
                  step: "03",
                  title: "Confirm & Pay",
                  desc: "Secure your appointment instantly with encrypted online payment.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="surface-card p-6 sm:p-8 text-center relative"
                >
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center font-display font-bold text-white text-lg bg-brand-600">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-ink-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Services ---------------- */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
                Our Services
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "In-Person Consultations",
                  desc: "Face-to-face visits with specialists at partner clinics.",
                },
                {
                  title: "Follow-Up Scheduling",
                  desc: "Easily rebook follow-ups directly from your dashboard.",
                },
                {
                  title: "Digital Prescriptions",
                  desc: "Receive and store prescriptions securely online.",
                },
                {
                  title: "Health Records Access",
                  desc: "View your appointment and treatment history anytime.",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="p-6 rounded-2xl border border-ink-100 hover:border-brand-200 hover:bg-brand-50/40 transition-colors"
                >
                  <h3 className="font-semibold text-ink-900 mb-2 text-sm sm:text-base">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Testimonials ---------------- */}
        {/* <section
          className="py-16 sm:py-20 md:py-24"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-800), var(--color-brand-700))",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
                What People Are Saying
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((t) => (
                <div key={t.name} className="glass-card rounded-2xl p-6 sm:p-8">
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    "{t.quote}"
                  </p>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-brand-100 text-xs">{t.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ---------------- FAQ ---------------- */}
        <section className="py-16 sm:py-20 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-ink-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="py-16 sm:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-600), var(--color-accent-500))",
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to take control of your healthcare?
              </h2>
              <p className="text-brand-50/90 text-sm sm:text-base mb-8 max-w-xl mx-auto">
                Join thousands of patients booking appointments with trusted
                doctors every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/register"
                  className="btn-primary bg-white! text-brand-700! hover:bg-brand-50!"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/doctors"
                  className="btn-secondary bg-transparent! text-white! border-white/30!"
                >
                  Browse Doctors
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
