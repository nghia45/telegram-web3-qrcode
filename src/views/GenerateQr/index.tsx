import { SetStateAction, useState } from "react";
import QRCode from "react-qr-code";

const GenerateQr = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [cryptoType, setCryptoType] = useState("bitcoin");
  const [isShowQrCode, setIsShowQrCode] = useState(false);

  const handleChangeAddress = (e: {
    target: { value: SetStateAction<string> };
  }) => setAddress(e.target.value);
  const handleChangeAmount = (e: {
    target: { value: SetStateAction<string> };
  }) => setAmount(e.target.value);
  const handleChangeMessage = (e: {
    target: { value: SetStateAction<string> };
  }) => setMessage(e.target.value);
  const handleChangeCryptoType = (e: {
    target: { value: SetStateAction<string> };
  }) => setCryptoType(e.target.value);

  // Create a JSON object with transaction details
  const generateTransactionJSON = () => {
    const transactionData = {
      type: cryptoType,
      address: address,
      amount: amount,
      message: message,
    };
    return JSON.stringify(transactionData);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <h1>Blockchain QR Code Generator</h1>

      <select value={cryptoType} onChange={handleChangeCryptoType}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="litecoin">Litecoin</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="ripple">Ripple (XRP)</option>
      </select>

      <input
        type="text"
        value={address}
        onChange={handleChangeAddress}
        placeholder="Enter recipient address"
      />
      <input
        type="text"
        value={amount}
        onChange={handleChangeAmount}
        placeholder="Enter amount"
      />
      <input
        type="text"
        value={message}
        onChange={handleChangeMessage}
        placeholder="Enter memo (optional)"
      />

      <button onClick={() => setIsShowQrCode(!isShowQrCode)}>
        Generate QR Code
      </button>

      {isShowQrCode && (
        <QRCode value={generateTransactionJSON()} width={"250px"} />
      )}
    </div>
  );
};

export default GenerateQr;
