import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Performance } from './pages/performance';

Chart.register(CategoryScale);

function App() {
  return (
    <div className="p-4 mt-8">
      <Performance />
    </div>
  );
}

export default App;
