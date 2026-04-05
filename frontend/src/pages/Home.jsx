import { Link } from "react-router-dom";
import '../style/index.css' 
const Home = () => {
  return (
    <div className="hero animate-[fadeIn_0.6s_ease-in]">
      <section className="bg-purple-400 text-amber-50 text-center py-24">
        <h1 className="text-5xl font-bold mb-6">
          Book Appointments Easily
        </h1>
        <p className="text-xl mb-8">
          Trusted doctors. Secure booking. Real-time updates.
        </p>
        <Link
          to="/doctors"
          className="bg-white text-purple-400 px-6 py-3 rounded-xl font-semibold"
        >
          Find Doctors
        </Link>
      </section>

      <section className="py-20 px-10 grid md:grid-cols-3 gap-10">
        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Verified Doctors</h3>
          <p>All doctors are verified and trusted professionals.</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Instant Booking</h3>
          <p>Book appointments with real-time availability.</p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
          <p>Stripe integrated payment gateway for safety.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;