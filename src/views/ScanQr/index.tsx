import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import QrScanner from "qr-scanner";
import QrFrame from "../../assets/qr-frame.svg";
import { Button, Upload, message as antdMessage } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Must match the secret key used in GenerateQr

const ScanQr = () => {
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<string | undefined>("");

  const navigate = useNavigate();

  const decryptData = (encryptedData: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    setScannedResult(result?.data);

    // Decrypt the scanned result
    try {
      const decryptedData = decryptData(result?.data);
      const transactionData = JSON.parse(decryptedData);
      const { type, address, amount, productDetails } = transactionData;

      // Navigate to the Payment route with the decrypted data
      navigate(
        `/payment?type=${type}&address=${address}&amount=${amount}&productDetails=${encodeURIComponent(
          JSON.stringify(productDetails)
        )}`
      );
    } catch (error) {
      console.error("Invalid or encrypted QR code format", error);
      antdMessage.error("Failed to scan QR code: Invalid format.");
    }
  };

  const onScanFail = (err: string | Error) => {
    console.log(err);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const result = await QrScanner.scanImage(file);
      console.log('result', result);
      onScanSuccess({
        data: result,
        cornerPoints: [],
      });
    } catch (error) {
      antdMessage.error("Failed to read QR code from image.");
    }
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err: any) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Scan QR Code</h1>

      <div className="flex justify-center">
        <Upload
          beforeUpload={(file) => {
            handleImageUpload(file);
            return false; // Prevent auto upload
          }}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Upload QR Image</Button>
        </Upload>
      </div>

      <div className="qr-reader">
        <video ref={videoEl}></video>
        <div ref={qrBoxEl} className="qr-box">
          <img
            src={QrFrame}
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        </div>

        {scannedResult && (
          <p
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 99999,
              color: "white",
            }}
          >
            Scanned Result: {scannedResult}
          </p>
        )}
      </div>
    </div>
  );
};

export default ScanQr;
