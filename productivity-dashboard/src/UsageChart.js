import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

function UsageChart() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/today")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(log => ({
          domain: log.domain,
          minutes: +(log.timeSpent / 60000).toFixed(2)
        }));
        setLogs(formatted);
      })
      .catch(err => console.error("❌ Error fetching logs:", err));
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2 className="text-xl font-bold mb-4">📊 Today's Website Usage</h2>

      <ul>
        {logs.map((log, index) => (
          <li key={index}>🕒 {log.domain}: <strong>{log.minutes} mins</strong></li>
        ))}
      </ul>

      <h3 className="mt-6">🔽 Time Spent Per Site</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={logs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="domain" />
          <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="minutes" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UsageChart;
