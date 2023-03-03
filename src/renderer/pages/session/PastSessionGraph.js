
import React, { useEffect, useState } from "react";
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
    MI_Accuracy: 10
  },
  {
    name: "Trial 2",
    MI_Accuracy: 20
  },
  {
    name: "Trial 3",
    MI_Accuracy: 20
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
    MI_Accuracy: 40
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
    MI_Accuracy: 50
  },
  {
    name: "Trial 10",
    MI_Accuracy: 50
  }
];

const PastSessionGraph=({curSessionparadigmResult})=> {

  const [results, setResults] = useState([{}]);

  useEffect(() => {
    console.log(curSessionparadigmResult);
    // if(currSessionResult === undefined) return;
    // const List = currSessionResult?.paradigms.flatMap(paradigm => paradigm.results)
    // console.log(List);
    const result = curSessionparadigmResult?.map((element, index) => {
      return {name:`Trial ${index+1}`, MI_Accuracy:`${element}`}
    });
    
    console.log();
    setResults(result);
  },[]);

  return (
    <AreaChart
               width={690}
               height={300}
               data={results}
               margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
            <defs>
               <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#265B97" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#265B97" stopOpacity={0} />
               </linearGradient>
               
            </defs>
            <XAxis dataKey="name" fontSize={12}/>
            <YAxis label={{ value: 'MOTOR IMAGERY ACCURACY', angle: -90, position: 'center', fontSize:'8px' }} fontSize={12}/>
            <Tooltip />
           
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


// import React, { useEffect, useState } from "react";
// import {
//   AreaChart,
//   LineChart,
//   Line,
//   Area,
//   YAxis,
//   XAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend
//   } from "recharts";

// // const data = [
// //   {
// //     name: "Trial 1",
// //     MI_Accuracy: 10
// //   },
// //   {
// //     name: "Trial 2",
// //     MI_Accuracy: 20
// //   },
// //   {
// //     name: "Trial 3",
// //     MI_Accuracy: 20
// //   },
// //   {
// //     name: "Trial 4",
// //     MI_Accuracy: 30
// //   },
// //   {
// //     name: "Trial 5",
// //     MI_Accuracy: 30
// //   },
// //   {
// //     name: "Trial 6",
// //     MI_Accuracy: 40
// //   },
// //   {
// //     name: "Trial 7",
// //     MI_Accuracy: 40
// //   },
// //   {
// //     name: "Trial 8",
// //     MI_Accuracy: 40
// //   },
// //   {
// //     name: "Trial 9",
// //     MI_Accuracy: 50
// //   },
// //   {
// //     name: "Trial 10",
// //     MI_Accuracy: 50
// //   }
// // ];

// const PastSessionGraph=({currSessionResult})=> {

//   const [results, setResults] = useState([{}]);

//   useEffect(() => {
//     console.log(currSessionResult);
//     const List = currSessionResult?.paradigms?.map(paradigm => {
//       const value = paradigm.results.reduce((val) => val);
      
//       return value;
//     });
//     const result = List.map((element, index) => {
//       return {name:`Trial ${index+1}`, MI_Accuracy:`${element}`}
//     });
//     console.log(result);
//     setResults(result);
//   },[]);

//   return (
//     <LineChart width={690}
//                height={300}
//                data={results}
//                margin={{ top: 8, right: 20, left: 0, bottom: 0 }}>
//                 <XAxis dataKey="name" fontSize={12}/>
//                 <YAxis label={{ value: 'MOTOR IMAGERY ACCURACY', angle: -90, position: 'center', fontSize:'8px' }} fontSize={12}/>

//                 <Tooltip />
//                 <Line dataKey="MI_Accuracy" stroke="blue" activeDot={{ r: 8 }} />
//     </LineChart>
//   );
// };
// export default PastSessionGraph;
