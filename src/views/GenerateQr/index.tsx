import { useState, useRef, useEffect } from "react";
import QRCode from "react-qr-code";
import { Input, Button, message as antdMessage } from "antd";
import CryptoJS from "crypto-js";
import html2canvas from "html2canvas"; // Library to capture the QR code as image
import { useLocation } from "react-router-dom";

const { TextArea } = Input;

const secretKey = "your-secret-key"; // Use a secure method to manage the secret key

const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const GenerateQr = () => {
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(
    JSON.stringify(
      {
        serialId: "123456",
        productName: "Sample Product",
        brand: "Sample Brand",
        productDescription: "This is a sample product description.",
        producedDate: "2021-09-01",
      },
      null,
      2 // Prettify JSON
    )
  );
  const [isShowQrCode, setIsShowQrCode] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null); // Reference for the QR code container

  const handleChangeAddress = (e: { target: { value: string } }) =>
    setAddress(e.target.value);
  const handleChangeAmount = (e: { target: { value: string } }) =>
    setAmount(e.target.value);
  const handleChangeMessage = (e: { target: { value: string } }) =>
    setMessage(e.target.value);

  // Create and encrypt JSON object for the TON transaction
  const generateTransactionJSON = () => {
    const transactionData = {
      type: "TON",
      address: address,
      amount: amount,
      productDetails: JSON.parse(message),
    };
    const jsonData = JSON.stringify(transactionData);
    return encryptData(jsonData); // Encrypt the data
  };

  useEffect(() => {
    // Extract query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const initialAddress = queryParams.get("address") || "";
    const initialAmount = queryParams.get("amount") || "";
    const initialMessage =
      queryParams.get("message") ||
      JSON.stringify(
        {
          serialId: "123456",
          productName: "Sample Product",
          brand: "Sample Brand",
          productDescription: "This is a sample product description.",
          producedDate: "2021-09-01",
        },
        null,
        2 // Prettify JSON
      );

    // Set the initial state with URL parameters
    setAddress(initialAddress);
    setAmount(initialAmount);
    setMessage(initialMessage);
  }, [location.search]);

  // Function to export the QR code as an image
  const exportQrCodeAsImage = async () => {
    if (!qrRef.current) {
      antdMessage.error("QR code not found");
      return;
    }

    try {
      const canvas = await html2canvas(qrRef.current); // Convert the QR code container to canvas
      const image = canvas.toDataURL("image/png");

      // Create a temporary link to download the image
      const link = document.createElement("a");
      link.href = image;
      link.download = "qr-code.png";
      link.click();
    } catch (error) {
      antdMessage.error("Failed to export QR code");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 px-5">
      <h1 className="font-bold">TON QR Code Generator</h1>

      <Input
        value={address}
        onChange={handleChangeAddress}
        placeholder="Enter recipient TON address"
        className="w-full max-w-md"
      />
      <Input
        value={amount}
        onChange={handleChangeAmount}
        placeholder="Enter amount in TON"
        className="w-full max-w-md"
      />
      <TextArea
        value={message}
        onChange={handleChangeMessage}
        placeholder="Enter product details as JSON"
        rows={5}
        className="w-full max-w-md"
      />

      <div className="flex flex-row gap-2">
        <Button type="primary" onClick={() => setIsShowQrCode(!isShowQrCode)}>
          Generate QR Code
        </Button>
        <Button onClick={exportQrCodeAsImage}>Export</Button>
      </div>

      {isShowQrCode && (
        <div className="mt-5">
          {/* QR Code container to capture */}
          <div ref={qrRef}>
            <QRCode value={generateTransactionJSON()} size={250} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateQr;
