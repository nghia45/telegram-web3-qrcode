import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse the query parameters to get the transaction data
  const queryParams = new URLSearchParams(location.search);
  const cryptoType = queryParams.get("type");
  const address = queryParams.get("address");
  const amount = queryParams.get("amount");
  const message = queryParams.get("message");

  return (
    <div className="flex flex-col items-center">
      <h1>Payment Details</h1>
      <p>
        <strong>Type:</strong> {cryptoType}
      </p>
      <p>
        <strong>Address:</strong> {address}
      </p>
      <p>
        <strong>Amount:</strong> {amount}
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>
      <button onClick={() => navigate("/scan")}>Back to Scan</button>
    </div>
  );
};

export default Payment;
