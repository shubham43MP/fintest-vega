import { useEffect, useMemo, useState } from 'react';
import { getAssets, getPortfolio } from '../../api/api';
import { Assets, Portfolio } from '../../api/api.types';
import { PieChart } from '../../components/organisms';

export const Performance = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [assets, setAssets] = useState<Assets[]>([]);
  useEffect(() => {
    getPortfolio().then(folio => setPortfolio(folio));
    getAssets().then(asset => setAssets(asset));
  }, []);

  const portfolioPos = useMemo(() => {
    let assetsMap = {};
    let latestPortfolioMap = {};
    if (assets.length > 0) {
      assets.forEach(mapper => {
        assetsMap = {
          ...assetsMap,
          [mapper.name]: mapper
        };
      });

      portfolio[portfolio.length - 1].positions.forEach(pos => {
        latestPortfolioMap = {
          ...latestPortfolioMap,
          [assetsMap[pos.asset].type]:
            (latestPortfolioMap[assetsMap[pos.asset].type] || 0) +
            pos.price * pos.quantity
        };
      });
    }

    return {
      assetsMap,
      latestPortfolioMap
    };
  }, [assets, portfolio]);

  const pieChartData = {
    labels: Object.keys(portfolioPos.latestPortfolioMap),
    datasets: [
      {
        label: 'PortolioPosition',
        data: Object.values(portfolioPos.latestPortfolioMap),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        borderColor: 'black',
        borderWidth: 2
      }
    ]
  };
  return (
    <div className="">
      <PieChart chartData={pieChartData} />
    </div>
  );
};
