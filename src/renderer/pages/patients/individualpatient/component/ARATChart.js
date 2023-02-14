
import React from "react";
import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip
  } from "recharts";

  const data = [
    {
      name: "SESSION 1",
      ARAT_SCORE: 1
    },
    {
      name: "SESSION 2",
      ARAT_SCORE: 2
    },
    {
      name: "SESSION 3",
      ARAT_SCORE: 2
    },
    {
      name: "SESSION 4",
      ARAT_SCORE: 3
    },
    {
      name: "SESSION 5",
      ARAT_SCORE: 3
    },
    {
      name: "SESSION 6",
      ARAT_SCORE: 4
    },
    {
      name: "SESSION 7",
      ARAT_SCORE: 3
    },
    {
      name: "SESSION 8",
      ARAT_SCORE: 4
    },
    {
      name: "SESSION 9",
      ARAT_SCORE: 5
    }
  ];

const ARATChart=()=> {
  return (
    <AreaChart
               width={1000}
               height={300}
               data={data}
               margin={{ top: 10, right: 50, left: 0, bottom: 0 }}>
            <defs>
               <linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF9B2D" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF9B2D" stopOpacity={0} />
               </linearGradient>
               
            </defs>
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'ARAT SCORE', angle: -90, position: 'center' }}/>
            <YAxis />
           {/*  <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />
            <Area
               type="monotone"
               dataKey="ARAT_SCORE"
               stroke="#FF9B2D"
               fillOpacity={1}
               fill="url(#colorUv1)"/>
            
            </AreaChart>
  );
};
export default ARATChart;
