import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import useTonWeb from "../../hooks/useTonWeb";
import { Spin, Table } from "antd";
import Title from "antd/es/typography/Title";

const TonTransactionHistory = () => {
  const wallet = useTonConnect();
  const { wallet: address, connected, network, sender } = wallet;
  interface Transaction {
    transaction_id: { hash: string };
    in_msg: { value: number };
    utime: number;
  }

  console.log("wallet", wallet);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const tonWeb = useTonWeb(network); // Use the network (MAINNET/TESTNET) to initialize TonWeb

  const decodeBase64 = (data: any) => {
    try {
      return atob(data);
    } catch (e) {
      return "Invalid base64";
    }
  };

  const fetchTransactionHistory = async (address: string) => {
    if (!tonWeb) return;

    setLoading(true);
    try {
      // Fetch transaction history from the TonWeb provider
      const transactions = await tonWeb.provider.getTransactions(
        address,
        10,
        undefined,
        undefined,
        undefined,
        true
      );
      console.log("transactions", transactions);
      setTransactions(transactions);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (connected && sender.address) {
    // Fetch transaction history when the wallet is connected
    fetchTransactionHistory(address || "");
    // }
  }, [connected, address, tonWeb]);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: ["transaction_id", "hash"],
      key: "transactionId",
      // responsive: ["md"], // Hide on mobile
    },
    {
      title: "Amount (TON)",
      dataIndex: ["in_msg", "value"],
      key: "amount",
      render: (value) => (value / 1000000000).toFixed(9), // Convert nanoTON to TON
    },
    {
      title: "Source",
      dataIndex: ["in_msg", "source"],
      key: "source",
      responsive: ["md"], // Hide on mobile
    },
    {
      title: "Destination",
      dataIndex: ["in_msg", "destination"],
      key: "destination",
      // responsive: ["md"], // Hide on mobile
    },
    {
      title: "Fee (TON)",
      dataIndex: "fee",
      key: "fee",
      render: (fee) => (fee / 1000000).toFixed(6), // Convert nanoTON to TON
    },
    {
      title: "Date",
      dataIndex: "utime",
      key: "date",
      render: (utime) => new Date(utime * 1000).toLocaleString(), // Convert timestamp to readable date
    },
    {
      title: "Message",
      dataIndex: ["in_msg", "msg_data", "body"],
      key: "message",
      render: (body) => {
        try {
          // Decode the base64 message body
          const decodedMessage = atob(body);
          return decodedMessage; // Render the decoded message
        } catch (error) {
          console.error("Error decoding message:", error);
          return "Invalid Message"; // Fallback if decoding fails
        }
      },
      responsive: ["md"], // Hide on mobile
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin tip="Loading transaction history..." />
      ) : (
        <div>
          <Title level={3}>Transaction History</Title>
          <Table
            dataSource={transactions}
            columns={columns}
            rowKey={(record) => record.transaction_id.hash} // Unique key for each row
            scroll={{ x: "max-content" }}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
};

export default TonTransactionHistory;
