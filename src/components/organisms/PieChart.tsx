import { Pie } from 'react-chartjs-2';

export const PieChart = ({ chartData }: any) => {
  return (
    <div className="chart-container">
      <h2 className="text-center">Pie Chart</h2>
      <Pie
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
