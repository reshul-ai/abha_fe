
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
    name: "JAN",
    Patients: 4
  },
  {
    name: "FEB",
    Patients: 3
  },
  {
    name: "MAR",
    Patients: 2
  },
  {
    name: "APR",
    Patients: 6
  },
  {
    name: "MAY",
    Patients: 8
  },
  {
    name: "JUN",
    Patients: 7
  },
  {
    name: "JUL",
    Patients: 9
  },
  {
    name: "AUG",
    Patients: 11
  },
  {
    name: "SEP",
    Patients: 13
  },
  {
    name: "OCT",
    Patients: 10
  },
  {
    name: "NOV",
    Patients: 21
  },
  {
    name: "DEC",
    Patients: 20
  }
];

const UpperChart=()=> {
  return (
    <AreaChart
               width={1000}
               height={300}
               data={data}
               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
               dataKey="Patients"
               stroke="#265B97"
               fillOpacity={1}
               fill="url(#colorUv)"/>
            
            </AreaChart>
  );
};
export default UpperChart;
