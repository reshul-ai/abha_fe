
import React,{useEffect, useState} from "react";
import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer
  } from "recharts";

const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

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

const LowerChart=({graph})=> { 

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const data = [];
  //   console.log(graph);
  //   let i=0;
  //   for( const year in graph){
  //     // console.log(year);
  //       for( const month in graph[year]){
  //         // console.log(graph[year][month].patients.size);
  //         for(let i=0;i<month;i++)
  //           if(m==month){
  //             data.push({"name":months[month-1], "Patients":graph[year][month].patients.size});
  //           } else {
  //             data.push({"name":months[i],"Patient":0})
  //           }
  //         i+=1;
  //       }
  //   }

  //     console.log(data);

  //     setData(data);
  //   // console.log(data);
  // },[]);

  return (
            <ResponsiveContainer width="100%" height={250}>
          
                  <AreaChart
                              width={"95%"}
                              height={300}
                              data={data}
                              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>

                              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#265B97" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#265B97" stopOpacity={0} />
                              </linearGradient>
                              
                            </defs>
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis label={{ value: 'PATIENTS', angle: -90, position: 'insideLeft', fontSize:"12px" }} fontSize={12} />
                            <YAxis />
                            <Tooltip />
                            
                            <Area
                              type="monotone"
                              dataKey="Patients"
                              stroke="#265B97"
                              fillOpacity={1}
                              fill="url(#colorUv)"/>
                            
                  </AreaChart>

            </ResponsiveContainer>
  );
};
export default LowerChart;
