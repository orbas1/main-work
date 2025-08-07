"use client";

import { LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 300 },
  { name: "Mar", uv: 500 },
  { name: "Apr", uv: 200 },
  { name: "May", uv: 350 },
];

export default function LineChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RLineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uv" stroke="#5e72e4" strokeWidth={2} />
      </RLineChart>
    </ResponsiveContainer>
  );
}
