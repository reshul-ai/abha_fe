import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

export const options = {
  responsive: true,
  smoothing: 1,
  accent: "palevioletred",
  fillBelow: "rgba(200,67,23,0.1)",
  hover: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      // display: false,
      font: {
        size: 20,
      },
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: "#000",
        // display: false,
      },
    },
    y: {
      // display: false,

      grid: {
        // display: false,
        // drawBorder: false,
      },
      gridLines: {
        display: false,
      },
      suggestedMin: 20,
      suggestedMax: 100,
      display: true,

      ticks: {
        beginAtZero: true,
        steps: 5,
        stepSize: 20,
        max: 100,
        color: "#000",
        // display: false,
      },
    },
  },
};

function PlotData() {
  const Chart1Ref = React.createRef();

  const startPlotting = () => {
    // console.log("hii");
    setcurrenttime([...moment().format("HH:mm:ss")]);
    // let localArray1 = [];
    // let localArray2 = [];
    // let localArray3 = [];
    // let localArray4 = [];
    // let localArray5 = [];
    // let localArray6 = [];
    // let localArray7 = [];
    // let localArray8 = [];
    // let localPacketId = [];
    // let ir_lc1 = [];
    // let ir_lc2 = [];
    // let ir_sc = [];
    // let red_lc1 = [];
    // let red_lc2 = [];
    // let red_sc = [];
    // let x = [];
    // let y = [];
    // let z = [];
    // let label = [];
    // let totalLabel = [];
    // let label_25 = [];
    // let lossedPacketId = [];
    let totalCount = 0;
    if(window && window.require("electron")){
      window.require("electron").ipcRenderer.on("live_data", (e,data) => {
        
        console.log(data);
        // JSON.parse(Buffer.from(data?.content).toString())
        let localArray1 = [];
        let localArray2 = [];
        let localArray3 = [];
        let localArray4 = [];
        let localArray5 = [];
        let localArray6 = [];
        let localArray7 = [];
        let localArray8 = [];
        let localPacketId = [];
        let ir_lc1 = [];
        let ir_lc2 = [];
        let ir_sc = [];
        let red_lc1 = [];
        let red_lc2 = [];
        let red_sc = [];
        let x = [];
        let y = [];
        let z = [];
        let label = [];
        let totalLabel = [];
        let label_25 = [];
        let lossedPacketId = [];
        // setcurrenttime([...moment().format("HH:mm:ss")]);
        let obj = JSON.parse(data);
        let count = 0;
        setpacketLoss(totalCount);
        console.log(Object.entries(obj), "logs");
        Object.entries(obj)?.map((key, value) => {
          if (key[0] != "date") {
            console.log(`${obj[key[0]][1]}-${obj[key[0]][2]}-${obj[key[0]][3]}`);
            setlastPackRecieved(
              `${obj[key[0]][1]}:${obj[key[0]][2]}:${obj[key[0]][3]}`
            );

            if (obj[key[0]].length >= 25) {
              // label.push(label.length);
              localArray1.push({ name: label.length, Samples: obj[key[0]][9] });

              localArray2.push({ name: label.length, Samples: obj[key[0]][10] });
              // label.push(label.length);
              localArray3.push({ name: label.length, Samples: obj[key[0]][11] });
              localArray4.push({ name: label.length, Samples: obj[key[0]][12] });
              localArray5.push({ name: label.length, Samples: obj[key[0]][13] });
              localArray6.push({ name: label.length, Samples: obj[key[0]][14] });
              localArray7.push({ name: label.length, Samples: obj[key[0]][15] });
              localArray8.push({ name: label.length, Samples: obj[key[0]][16] });
              ir_lc1.push({ name: label_25.length, Samples: obj[key[0]][17] });
              ir_lc2.push({ name: label_25.length, Samples: obj[key[0]][18] });
              ir_sc.push({ name: label_25.length, Samples: obj[key[0]][19] });
              red_lc1.push({ name: label_25.length, Samples: obj[key[0]][20] });
              red_lc2.push({ name: label_25.length, Samples: obj[key[0]][21] });
              red_sc.push({ name: label_25.length, Samples: obj[key[0]][22] });
              x.push({ name: label_25.length, Samples: obj[key[0]][23] });
              y.push({ name: label_25.length, Samples: obj[key[0]][24] });
              z.push({ name: label_25.length, Samples: obj[key[0]][25] });

              // localPacketId.push({
              //   name: label_25.length,
              //   Samples: obj[key[0]][26],
              // });
              label_25.push(label_25.length);
              console.log(count, obj[key[0]][26], "count");
              if (count != obj[key[0]][26]) {
                console.log(totalCount, "count1231678");
                count = count + 1;
                setpacketLoss(count);
              }
              count = count + 1;
            } else {
              localArray1.push({ name: label.length, Samples: obj[key[0]][9] });

              localArray2.push({ name: label.length, Samples: obj[key[0]][10] });
              // label.push(label.length);
              localArray3.push({ name: label.length, Samples: obj[key[0]][11] });
              localArray4.push({ name: label.length, Samples: obj[key[0]][12] });
              localArray5.push({ name: label.length, Samples: obj[key[0]][13] });
              localArray6.push({ name: label.length, Samples: obj[key[0]][14] });
              localArray7.push({ name: label.length, Samples: obj[key[0]][15] });
              localArray8.push({ name: label.length, Samples: obj[key[0]][16] });
              // if (obj[key[0]][17] != localPacketId[localPacketId.length - 1]) {
              //   lossedPacketId.push(obj[key[0]][17]);
              // }
              localPacketId.push(obj[key[0]][17]);
            }
            label.push(label.length);
            // totalLabel.push(totalLabel.length);
            // localPacketId.push(obj[key[0]][13]);
            // label.push(key[0]);
          } else {
            // setcurrenttime(moment(key[1]).format("HH:mm:ss"));
            const time = key[1].split("T")[1];
            // console.log(time.split(".")[0]);
            setcurrenttime(time.split(".")[0]);
          }
        });
        // console.log(
        //   `${Object.entries(obj)[249][1]}:${obj[key[0]][2]}:${obj[key[0]][3]}:${
        //     obj[key[0]][4]
        //   }`
        // );
        const sec = label.length / Object.entries(obj).length;
        if (sec > 2) {
          localArray1.splice(0, 250);
          localArray2.splice(0, 250);
          localArray3.splice(0, 250);
          localArray4.splice(0, 250);
          localArray5.splice(0, 250);
          localArray6.splice(0, 250);
          localArray7.splice(0, 250);
          localArray8.splice(0, 250);
          // label.splice(0, 250);
          // console.log("Afteer 3 sec");
          // label_25.slice(0, 250);
          // if (obj[key[0]].length === 25) {
          //   label_25.slice(0, 250);
          // }
        }

        // console.log(localArray1);
        setArray1([...localArray1]);
        setArray2([...localArray2]);
        setArray3([...localArray3]);
        setArray4([...localArray4]);
        setArray5([...localArray5]);
        setArray6([...localArray6]);
        setArray7([...localArray7]);
        setArray8([...localArray8]);
        setArray9([...ir_lc1]);
        setArray10([...ir_lc2]);
        setArray11([...ir_sc]);
        setArray12([...red_lc1]);
        setArray13([...red_lc2]);
        setArray14([...red_sc]);
        setArray15([...x]);
        setArray16([...y]);
        setArray17([...z]);
        setpacketid(localPacketId);
        // console.log(label, "labelsss");
        setlabel(label);
        setlabel2(label_25);

        // setpacketLoss(lossedPacketId);
      });
    }
  };

  const [Array1, setArray1] = useState([]);
  const [Array2, setArray2] = useState([]);
  const [Array3, setArray3] = useState([]);
  const [Array4, setArray4] = useState([]);
  const [Array5, setArray5] = useState([]);
  const [Array6, setArray6] = useState([]);
  const [Array7, setArray7] = useState([]);
  const [Array8, setArray8] = useState([]);
  const [Array9, setArray9] = useState([]);
  const [Array10, setArray10] = useState([]);
  const [Array11, setArray11] = useState([]);
  const [Array12, setArray12] = useState([]);
  const [Array13, setArray13] = useState([]);
  const [Array14, setArray14] = useState([]);
  const [Array15, setArray15] = useState([]);
  const [Array16, setArray16] = useState([]);
  const [Array17, setArray17] = useState([]);
  const [packetLoss, setpacketLoss] = useState([]);
  const [lastPackRecieved, setlastPackRecieved] = useState();
  const [currenttime, setcurrenttime] = useState();
  const [packetid, setpacketid] = useState([]);
  const [label, setlabel] = useState([]);
  const [label2, setlabel2] = useState([]);

  useEffect(() => {
    startPlotting();
    return () => {};
  }, []);

  function customRadius(context) {
    let index = context.dataIndex;

    return 0;
  }
  return (
    <div>
      {/* <div
        style={{
          marginLeft: "auto",
          textAlign: "left",
          marginTop: "10px",
          marginBottom: "10px",
          width: "100%",
          marginLeft: "10px",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
        <h3 style={{ display: "inline" }}>Packet Lost : </h3>
        <h3 style={{ display: "inline" }}> {packetLoss.toString()}</h3>
      </div>
      <div
        style={{
          marginLeft: "auto",
          textAlign: "left",
          marginTop: "10px",
          marginBottom: "10px",
          width: "100%",
          marginLeft: "10px",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
        <h3 style={{ display: "inline" }}>Current Time : </h3>
        <h3 style={{ display: "inline" }}> {currenttime}</h3>
      </div> */}
      {/* <div
        style={{
          marginLeft: "auto",
          textAlign: "left",
          marginTop: "10px",
          marginBottom: "10px",
          width: "100%",
          marginLeft: "10px",
          boxSizing: "border-box",
          overflow: "auto",
        }}
      >
        <h3 style={{ display: "inline" }}>Last Packet Time : </h3>
        <h3 style={{ display: "inline" }}> {lastPackRecieved}</h3>
      </div> */}
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
        // label={label ? label : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        //                 dataSet={
        //                   dataSet
        //                     ? dataSet
        //                     : [0, 60, 60, 20, 20, 20, 40, 60, 72, 80]
      >
        {/* <Line
          ref={Chart1Ref}
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: [
                {
                  title: {
                    display: true,
                    text: "Samples",
                  },
                },
                {
                  type: "realtime",
                  realtime: {
                    onRefresh: function () {
                      Array1.push({
                        x: Date.now(),
                        y: Math.random() * 100,
                      });
                    },
                    delay: 300,
                    refresh: 300,
                  },
                },
              ],
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 1",
                data: Array1,
                borderColor: "#E35571",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#E35571",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
        <div style={{ marginTop: "10px" }}>Channel 1</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array1}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            // displayName="Channel 1"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" displayName="Samples" />
            <YAxis />
            <Tooltip />
            <Legend displayName="Channle 1" />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#8884d8"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
              // legendType={"String"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Channel 2</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            maintainAspectRatio: false,
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 2",
                data: Array2,
                borderColor: "#E37F55",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#E37F55",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Channel 3</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array3}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E3C655"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 3",
                data: Array3,
                borderColor: "#E3C655",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#E3C655",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Channel 4</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array4}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#B8E355"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 4",
                data: Array4,
                borderColor: "#B8E355",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#B8E355",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Channel 5</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array5}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#71E355"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 5",
                data: Array5,
                borderColor: "#71E355",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#71E355",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Channel 6</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array6}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" displayName="Samples" />
            <YAxis />
            <Tooltip />
            <Legend displayName="Channel 8" />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#55E37F"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 6",
                data: Array6,
                borderColor: "#55E37F",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55E37F",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Channel 7</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array7}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#55E3C6"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 7",
                data: Array7,
                borderColor: "#55E3C6",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55E3C6",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Channel 8</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array8}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#55B8E3"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label,
            datasets: [
              {
                label: "Channel 8",
                data: Array8,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>IR LC1</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array9}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "IR-LC1",
                data: Array9,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>IR LC2</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array10}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "IR-LC2",
                data: Array10,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>IR SC</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array11}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "IR-SC",
                data: Array11,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>RED LC1</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array12}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "RED-LC1",
                data: Array12,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>RED LC2</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array13}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "RED-LC2",
                data: Array13,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>RED SC</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array14}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "RED-SC",
                data: Array14,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>X</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array15}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "X",
                data: Array15,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Y</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array16}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "Y",
                data: Array16,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
      <div
        style={{
          display: "block",
          margin: "auto",
          width: "90%",
          height: "200px",
          marginTop: "20px",
        }}
      >
        <div style={{ marginTop: "3%" }}>Z</div>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={Array17}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Samples"
              stroke="#E37F55"
              activeDot={{ r: 0 }}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <Line
          options={{
            responsive: true,
            smoothing: 1,
            hover: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                // display: false,
                labels: {
                  font: {
                    size: 20,
                  },
                },
              },
              title: {
                display: false,
                text: "Chart.js Line Chart",
              },
            },
            scales: {
              y: {
                title: {
                  display: true,
                  text: "",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Samples",
                },
              },
            },
          }}
          data={{
            labels: label2,
            datasets: [
              {
                label: "Z",
                data: Array17,
                borderColor: "#55B8E3",
                backgroundColor: "rgba(75, 64, 144, 0.1)",
                fill: {
                  target: "origin",
                  above: "#55B8E3",
                },
                tension: 0.7,
                pointRadius: customRadius,
                pointBackgroundColor: "white",
                pointHoverBackgroundColor: "white",
              },
            ],
          }}
        /> */}
      </div>
    </div>
  );
}

export default PlotData;
