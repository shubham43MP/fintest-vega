import { useEffect, useMemo, useState } from 'react';
import { getAssets, getPortfolio } from '../../api/api';
import { Assets, Portfolio } from '../../api/api.types';
import { PieChart } from '../../components/organisms/PieChart';
import { GenericObject } from '../../utils/common.type';
import { LineChart } from '../../components/organisms/LineChart';
import { AssetView } from './types';
import { PerfTimeline } from './common';

export const Performance = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [assets, setAssets] = useState<Assets[]>([]);
  const [view, setView] = useState<AssetView>(AssetView.ASSETCLASS);
  const [perfTimeline, setPerfTimeline] = useState<number>(0);

  useEffect(() => {
    getPortfolio().then(folio => setPortfolio(folio));
    getAssets().then(asset => setAssets(asset));
  }, []);

  const portfolioPos = useMemo(() => {
    let assetsMap = {};
    let latestPortfolioMapByAsset = {};
    let portfolioMapByAssetClass = {};
    if (assets.length > 0) {
      assets.forEach(mapper => {
        assetsMap = {
          ...assetsMap,
          [mapper.name]: mapper
        };
      });

      portfolio[portfolio.length - 1].positions.forEach(pos => {
        latestPortfolioMapByAsset = {
          ...latestPortfolioMapByAsset,
          [assetsMap[pos.asset].type]:
            (latestPortfolioMapByAsset[assetsMap[pos.asset].type] || 0) +
            pos.price * pos.quantity
        };
      });

      portfolio[portfolio.length - 1].positions.forEach(pos => {
        portfolioMapByAssetClass = {
          ...portfolioMapByAssetClass,
          [pos.asset]: pos.price * pos.quantity
        };
      });
    }

    return {
      latestPortfolioMapByAsset,
      portfolioMapByAssetClass
    };
  }, [assets, portfolio]);

  const pieChartDataBuilder = (assetData: GenericObject<number>) => {
    return {
      labels: Object.keys(assetData),
      datasets: [
        {
          label: 'PortolioPosition',
          data: Object.values(assetData),
          backgroundColor: [
            '#8BC1F7',
            '#BDE2B9',
            '#A2D9D9',
            '#B2B0EA',
            '#F9E0A2',
            '#F4B678'
          ],
          borderColor: 'black',
          borderWidth: 2
        }
      ]
    };
  };

  const lineChartDataBuilder = useMemo(() => {
    let lineChartData = {};
    portfolio.slice(-perfTimeline).forEach(item => {
      const asOfDate = new Date(item.asOf);
      const totalValue = item.positions.reduce((sum, position) => {
        return sum + position.quantity * position.price;
      }, 0);
      lineChartData = {
        ...lineChartData,
        [`${asOfDate.getDate()}-${
          asOfDate.getMonth() + 1
        }-${asOfDate.getFullYear()}`]: totalValue
      };
    });
    return {
      labels: Object.keys(lineChartData),
      datasets: [
        {
          label: 'Balance Performance',
          data: Object.values(lineChartData),
          backgroundColor: [
            '#8BC1F7',
            '#BDE2B9',
            '#A2D9D9',
            '#B2B0EA',
            '#F9E0A2',
            '#F4B678'
          ],
          borderColor: 'black',
          borderWidth: 2
        }
      ]
    };
  }, [portfolio, perfTimeline]);

  const viewBasedPieChart = useMemo(() => {
    if (view === AssetView.ASSET) return portfolioPos.latestPortfolioMapByAsset;
    return portfolioPos.portfolioMapByAssetClass;
  }, [view, portfolioPos]);

  const changeViewHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setView(e?.target.value as AssetView);
  };

  return (
    <div className="flex justify-center gap-12">
      <div className="h-96 w-96 flex flex-col gap-4">
        <select
          className="self-center"
          value={view}
          onChange={changeViewHandler}
        >
          <option value={AssetView.ASSETCLASS}>Asset class view</option>
          <option value={AssetView.ASSET}>Asset type view</option>
        </select>
        <PieChart chartData={pieChartDataBuilder(viewBasedPieChart)} />
      </div>
      <div className="h-full w-full">
        <div className="flex gap-2 justify-center">
          {Object.keys(PerfTimeline).map(item => (
            <button
              onClick={() =>
                setPerfTimeline(PerfTimeline[item as keyof typeof PerfTimeline])
              }
              className="p-4 bg-gray-100 rounded-2xl cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
        <LineChart chartData={lineChartDataBuilder} />
      </div>
    </div>
  );
};
