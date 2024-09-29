import { Line } from 'react-chartjs-2';

export const LineChart = ({ chartData }: any) => {
  return (
    <div>
      <h2 className="text-center">Portfolio Balance</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true
            }
          }
        }}
      />
    </div>
  );
};
