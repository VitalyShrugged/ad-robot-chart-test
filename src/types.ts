export type ChartPoint = {
  date: string
  cost: number
  cpa: number
  roiConfirmed: number
  conversions: number
}

export type PerformanceChartProps = {
  data: ChartPoint[]
}
