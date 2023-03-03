
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
      GS_SCORE: 5
    },
    {
      name: "SESSION 2",
      GS_SCORE: 10
    },
    {
      name: "SESSION 3",
      GS_SCORE: 15
    },
    {
      name: "SESSION 4",
      GS_SCORE: 25
    },
    {
      name: "SESSION 5",
      GS_SCORE: 20
    },
    {
      name: "SESSION 6",
      GS_SCORE: 30
    },
    {
      name: "SESSION 7",
      GS_SCORE: 35
    },
    {
      name: "SESSION 8",
      GS_SCORE: 30
    },
    {
      name: "SESSION 9",
      GS_SCORE: 40
    }
  ];

const GSSChart=()=> {
  return (
    <ResponsiveContainer width="100%" height={300}>
    <AreaChart
               width={1100}
               height={300}
               data={data}
               margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
            <defs>
               <linearGradient id="colorUv2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#005757" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#005757" stopOpacity={0} />
               </linearGradient>
               
            </defs>
            <XAxis dataKey="name" fontSize={10}/>
            <YAxis label={{ value: 'GS Score', angle: -90, position: 'center', fontSize:"8px"}} fontSize={10} />
            <YAxis />
           {/*  <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            <Area
               type="monotone"
               dataKey="GS_SCORE"
               stroke="#005757"
               fillOpacity={1}
               fill="url(#colorUv2)"/>
            
            </AreaChart>
            </ResponsiveContainer>
  );
};
export default GSSChart;
