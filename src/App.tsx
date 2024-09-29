import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

import { Performance } from './pages/performance';

function App() {
  return <Performance />;
}

export default App;
