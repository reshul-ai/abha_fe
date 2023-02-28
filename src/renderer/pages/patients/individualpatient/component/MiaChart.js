
import React from "react";
import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer
  } from "recharts";

const data = [
  {
    name: "SESSION 1",
    MI_Accuracy: 5
  },
  {
    name: "SESSION 2",
    MI_Accuracy: 10
  },
  {
    name: "SESSION 3",
    MI_Accuracy: 15
  },
  {
    name: "SESSION 4",
    MI_Accuracy: 25
  },
  {
    name: "SESSION 5",
    MI_Accuracy: 20
  },
  {
    name: "SESSION 6",
    MI_Accuracy: 30
  },
  {
    name: "SESSION 7",
    MI_Accuracy: 35
  },
  {
    name: "SESSION 8",
    MI_Accuracy: 30
  },
  {
    name: "SESSION 9",
    MI_Accuracy: 40
  }
];

const MIAChart=()=> {
  return (
    <ResponsiveContainer width="100%" height={300}>
    <AreaChart
               width={1100}
               height={300}
               data={data}
               margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
            <defs>
               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#265B97" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#265B97" stopOpacity={0} />
               </linearGradient>
               
            </defs>
            <XAxis dataKey="name" fontSize={10} />
            <YAxis label={{ value: 'MOTOR IMAGERY ACCURACY', angle: -90, position: 'center', fontSize:"8px" }} fontSize={10} />
            <YAxis />
           {/*  <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            <Area
               type="monotone"
               dataKey="MI_Accuracy"
               stroke="#265B97"
               fillOpacity={1}
               fill="url(#colorUv)"/>
            
            </AreaChart>
            </ResponsiveContainer>
  );
};
export default MIAChart;
