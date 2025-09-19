import { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../contexts/ShopContext";

const PaypalSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  let { backendUrl } = useContext(ShopContext);

  const token = localStorage.getItem("token"); // or from context
  const orderId = params.get("token"); // PayPal sends orderId as token
  const userId = params.get("PayerID");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        console.log(backendUrl);
        
        const res = await axios.post(
    
          backendUrl + "api/order/verify-paypal",
          { orderId, userId },
          { headers: { token } }
        );

        if (res.data.success) {
          toast.success("✅ PayPal Payment Successful!");
          navigate("/orders");
        } else {
          toast.error("❌ Payment not completed");
          navigate("/cart");
        }
      } catch (err) {
        console.error("Payment verify error:", err);
        toast.error("❌ Verification failed");
        navigate("/cart");
      }
    };

    console.log(orderId, userId, token);

    if (orderId && userId && token) {
      verifyPayment();
    }
  }, [orderId, userId, token, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <p className="text-xl font-medium">Verifying your PayPal payment...</p>
    </div>
  );
};

export default PaypalSuccess;
