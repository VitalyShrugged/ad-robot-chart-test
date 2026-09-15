import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ChartPoint, PerformanceChartProps } from '../types'

const SERIES = {
  cost: {
    label: 'Cost',
    color: '#f8e88a',
  },
  cpa: {
    label: 'CPA',
    color: '#3d6ee8',
  },
  roiConfirmed: {
    label: 'ROI confirmed',
    color: '#17921e',
  },
  conversions: {
    label: 'Conversions',
    color: '#8d00ed',
  },
} as const

type PlotPoint = ChartPoint & {
  costPlot: number
  cpaPlot: number
  roiPlot: number
  conversionsPlot: number
}

function normalize(values: number[], min = 8, max = 92): number[] {
  const sourceMin = Math.min(...values)
  const sourceMax = Math.max(...values)

  if (sourceMax === sourceMin) {
    return values.map(() => (min + max) / 2)
  }

  return values.map(
    (value) => min + ((value - sourceMin) / (sourceMax - sourceMin)) * (max - min),
  )
}

function prepareData(data: ChartPoint[]): PlotPoint[] {
  const cost = normalize(data.map((point) => point.cost))
  const cpa = normalize(data.map((point) => point.cpa), 2, 10)
  const roi = normalize(data.map((point) => point.roiConfirmed))
  const conversions = normalize(data.map((point) => point.conversions), 3, 90)

  return data.map((point, index) => ({
    ...point,
    costPlot: cost[index],
    cpaPlot: cpa[index],
    roiPlot: roi[index],
    conversionsPlot: conversions[index],
  }))
}

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`)
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function formatValue(key: string, value: number): string {
  if (key === 'cost' || key === 'cpa') {
    return value.toFixed(2)
  }

  if (key === 'roiConfirmed') {
    return value.toFixed(2)
  }

  return value.toLocaleString('en-US')
}

type TooltipPayload = {
  payload?: ChartPoint
}

type CustomTooltipProps = {
  active?: boolean
  payload?: TooltipPayload[]
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length || !payload[0]?.payload) {
    return null
  }

  const point = payload[0].payload

  return (
    <div className="chart-tooltip">
      <div className="tooltip-date">{formatDate(point.date)}</div>

      <div className="tooltip-row">
        <span className="tooltip-dot cost" />
        <span>Cost:</span>
        <strong>{formatValue('cost', point.cost)}</strong>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-dot cpa" />
        <span>CPA:</span>
        <strong>{formatValue('cpa', point.cpa)}</strong>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-dot roi" />
        <span>ROI confirmed:</span>
        <strong>{formatValue('roiConfirmed', point.roiConfirmed)}</strong>
      </div>

      <div className="tooltip-row">
        <span className="tooltip-dot conversions" />
        <span>Conversions:</span>
        <strong>{formatValue('conversions', point.conversions)}</strong>
      </div>
    </div>
  )
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const plotData = prepareData(data)

  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={plotData}
          margin={{ top: 18, right: 26, bottom: 4, left: 0 }}
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SERIES.cost.color} stopOpacity={0.72} />
              <stop offset="100%" stopColor={SERIES.cost.color} stopOpacity={0.16} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#e6d7d8"
            strokeDasharray="0"
          />

          <XAxis
            dataKey="date"
            hide
            padding={{ left: 12, right: 10 }}
          />

          <YAxis
            domain={[0, 100]}
            hide
          />

          <Tooltip
            cursor={{
              stroke: '#b8aaad',
              strokeWidth: 1,
              strokeDasharray: '4 4',
            }}
            content={<CustomTooltip />}
            isAnimationActive={false}
          />

          <Area
            type="linear"
            dataKey="costPlot"
            stroke={SERIES.cost.color}
            strokeWidth={1.8}
            fill="url(#areaFill)"
            activeDot={false}
            animationDuration={650}
          />

          <Line
            type="monotone"
            dataKey="roiPlot"
            stroke={SERIES.roiConfirmed.color}
            strokeWidth={2.1}
            dot={false}
            activeDot={{
              r: 4,
              fill: SERIES.roiConfirmed.color,
              stroke: '#fff',
              strokeWidth: 2,
            }}
            animationDuration={650}
          />

          <Line
            type="linear"
            dataKey="conversionsPlot"
            stroke={SERIES.conversions.color}
            strokeWidth={2}
            dot={{
              r: 3.2,
              fill: SERIES.conversions.color,
              stroke: SERIES.conversions.color,
            }}
            activeDot={{
              r: 4.5,
              fill: SERIES.conversions.color,
              stroke: '#fff',
              strokeWidth: 2,
            }}
            animationDuration={650}
          />

          <Bar
            dataKey="cpaPlot"
            fill={SERIES.cpa.color}
            barSize={26}
            radius={[2, 2, 0, 0]}
            animationDuration={650}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
