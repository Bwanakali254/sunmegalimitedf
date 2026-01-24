import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentCallback = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const orderTrackingId = params.get("OrderTrackingId");

    if (!orderTrackingId) {
      setStatus("error");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pesapal/verify`, {
        params: { orderTrackingId },
      })
      .then((res) => {
        if (res.data.success) {
          const rawStatus = res.data.status;
          const normalizedStatus = rawStatus
            ? rawStatus.toUpperCase()
            : "PENDING";

          setStatus(normalizedStatus);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") return <h2>Checking payment status...</h2>;
  if (status === "COMPLETED") return <h2>Payment successful!</h2>;
  if (status === "FAILED") return <h2>Payment failed.</h2>;
  if (status === "PENDING") return <h2>Payment still pending...</h2>;
  return <h2>Something went wrong.</h2>;
};

export default PaymentCallback;
