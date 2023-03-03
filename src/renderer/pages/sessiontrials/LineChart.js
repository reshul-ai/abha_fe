import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import '../home/home.css';

const data = [
  {
    name: '10',
    pv: -15,
    amt: -80,
  },
  {
    name: '20',
    pv: -40,
    amt: 50,
  },
  {
    name: '30',
    pv: 50,
    amt: 90,
  },
  {
    name: '40',
    pv: -7,
    amt: 80,
  },
  {
    name: '50',
    pv: 39,
    amt: 70,
  },
  {
    name: '60',
    pv: -45,
    amt: 50,
  },
  {
    name: '70',
    pv: 60,
    amt: 100,
  },
];

const loop = [1, 2, 3, 4, 5, 6, 6, 8];

const LineCharts = () => {
  return (
    <div style={{ width: '95%' }} className="row mx-2 my-3">
      <div>
        <h3 className="my-2">Data</h3>
      </div>
      <h5>Channel 1</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-4">Channel 2</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-4">Channel 3</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-4">Channel 4</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-4">Channel 5</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-4">Channel 6</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-4">Channel 7</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h5 className="mt-4">Channel 8</h5>
      <div className="chart-box m-3">
        <ResponsiveContainer width="95%" height={170}>
          <LineChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineCharts;
