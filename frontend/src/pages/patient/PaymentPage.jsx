import {  useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/axiosInstance";

const PaymentPage = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {

    try {

      setLoading(true);

      const res = await API.post("/payment/create-intent", {
        appointmentId: id
      });

      alert("Payment Intent Created ✅");

      console.log(res.data);

    } catch (error) {

      console.log(error);
      alert("Payment failed");

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-xl shadow-xl w-[400px]">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Payment
        </h2>
          <StripePaymentForm appointmentId={id} />
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          {loading ? "Processing..." : "Pay $20"}
        </button>

      </div>

    </div>

  );
};

export default PaymentPage;