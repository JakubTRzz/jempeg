import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("can_message", (msg) => {
      setMessages((prev) => [msg, ...prev].slice(0, 20));
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">CAN-BUS Mesajları</h1>
      <table className="mt-4 border border-gray-400">
        <thead>
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">DLC</th>
            <th className="border px-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((m, i) => (
            <tr key={i}>
              <td className="border px-2">{m.id}</td>
              <td className="border px-2">{m.dlc}</td>
              <td className="border px-2">{m.data.join(" ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
