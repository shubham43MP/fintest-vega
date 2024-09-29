import { Pie } from 'react-chartjs-2';

export const PieChart = ({ chartData }: any) => {
  return (
    <>
      <h2 className="text-center">Portfolio Composition</h2>
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
    </>
  );
};
