import { Address, toNano } from "ton";
import TonWeb from "tonweb";
import { useLocation, useNavigate } from "react-router-dom";
import { useTonConnect } from "../../hooks/useTonConnect"; // Adjust the import path if necessary
import { Button, notification } from "antd";
import useTonWeb from "../../hooks/useTonWeb";
import { Cell } from "tonweb/dist/types/boc/cell";

const Payment = () => {
  const { network } = useTonConnect();
  const tonweb = useTonWeb(network);
  const location = useLocation();
  const navigate = useNavigate();
  const { sender, connected } = useTonConnect();

  // Parse the query parameters to get the transaction data
  const queryParams = new URLSearchParams(location.search);
  const cryptoType = queryParams.get("type");
  const address = queryParams.get("address");
  const amount = queryParams.get("amount");
  const message = queryParams.get("productDetails");

  // Convert the encrypted JSON message into a Cell
  const createCellFromMessage = async (msg: string): Promise<TonWeb.boc.Cell> => {
    const cell = new TonWeb.boc.Cell();
    function writeStringTail(str: string, cell: Cell) {
      const bytes = Math.floor(cell.bits.getFreeBits() / 8); // 1 symbol = 8 bits
      if(bytes < str.length) { // if we can't write all string
          cell.bits.writeString(str.substring(0, bytes)); // write part of string
          const newCell = writeStringTail(str.substring(bytes), new TonWeb.boc.Cell()); // create new cell
          cell.refs.push(newCell); // add new cell to current cell's refs
      } else {
          cell.bits.writeString(str); // write all string
      }
  
      return cell;
  }
  
  function readStringTail(slice) {
      const str = new TextDecoder('ascii').decode(slice.array); // decode uint8array to string
      if (cell.refs.length > 0) {
          return str + readStringTail(cell.refs[0].beginParse()); // read next cell
      } else {
          return str;
      }
  }
    cell.bits.writeUint(0, 32); // Optional: Write a header or type indicator
    cell.bits.writeBytes(Buffer.from("msg", "utf-8")); // Write the bytes of the encrypted message
    return cell;
  };

  const handleTransaction = async () => {
    if (!connected) {
      notification.error({ message: "Not connected to a wallet" });
      return;
    }

    try {
      console.log('message', message);
      const cell = await createCellFromMessage(message || "");
      console.log('cell', cell);

      await sender.send({
        to: Address.parse(address!),
        value: toNano(amount!),
        // body: cell,
      });
      // notification.success({ message: "Transaction sent successfully" });
    } catch (error) {
      notification.error({
        message: "Transaction failed",
        description: error.message,
      });
    }
  };

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

      <Button onClick={handleTransaction} type="primary" className="mt-4">
        Transfer
      </Button>
      <Button onClick={() => navigate("/scan")} className="mt-2">
        Back to Scan
      </Button>
    </div>
  );
};

export default Payment;
