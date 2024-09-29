import { Assets, Portfolio, Price } from "./api.types"
import { assets, portfolio, prices } from "./mocks"

const commonApiDelayInMs = 600;

export const getAssets = () => new Promise<Assets[]>((resolve) => setTimeout(() => resolve(assets), commonApiDelayInMs))

export const getPrices = () => new Promise<Price[]>((resolve) => setTimeout(() => resolve(prices), commonApiDelayInMs))

export const getPortfolio = () => new Promise<Portfolio[]>((resolve) => setTimeout(() => resolve(portfolio), commonApiDelayInMs))