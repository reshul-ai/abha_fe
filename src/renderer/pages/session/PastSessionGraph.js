
import React from "react";
import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend
  } from "recharts";

const data = [
  {
    name: "Trial 1",
    MI_Accuracy: 20
  },
  {
    name: "Trial 2",
    MI_Accuracy: 20
  },
  {
    name: "Trial 3",
    MI_Accuracy: 30
  },
  {
    name: "Trial 4",
    MI_Accuracy: 30
  },
  {
    name: "Trial 5",
    MI_Accuracy: 30
  },
  {
    name: "Trial 6",
    MI_Accuracy: 30
  },
  {
    name: "Trial 7",
    MI_Accuracy: 40
  },
  {
    name: "Trial 8",
    MI_Accuracy: 40
  },
  {
    name: "Trial 9",
    MI_Accuracy: 40
  },
  {
    name: "Trial 10",
    MI_Accuracy: 40
  },
  {
    name: "Trial 11",
    MI_Accuracy: 50
  }
];

const PastSessionGraph=()=> {
  return (
    <AreaChart
               width={750}
               height={300}
               data={data}
               margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
            <defs>
               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#265B97" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#265B97" stopOpacity={0} />
               </linearGradient>
               
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
           <Legend title=""/>
            <Area
               type="monotone"
               dataKey="MI_Accuracy"
               stroke="#265B97"
               fillOpacity={1}
               fill="url(#colorUv)"/>
            
            </AreaChart>
  );
};
export default PastSessionGraph;
