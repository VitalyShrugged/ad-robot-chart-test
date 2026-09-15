import { PerformanceChart } from './components/PerformanceChart'
import { demoData } from './data'

const legend = [
  { label: 'Cost', className: 'cost' },
  { label: 'CPA', className: 'cpa' },
  { label: 'ROI confirmed', className: 'roi' },
  { label: 'Conversions', className: 'conversions' },
]

function App() {
  return (
    <main className="page">
      <section className="demo-card">
        <header className="card-header">
          <div>
            <p className="eyebrow">AD ROBOT</p>
            <h1>Performance</h1>
          </div>
        </header>

        <div className="legend" aria-label="Chart legend">
          {legend.map((item) => (
            <span className="legend-item" key={item.label}>
              <span className={`legend-mark ${item.className}`} />
              {item.label}
            </span>
          ))}
        </div>

        <div className="chart-area">
          <PerformanceChart data={demoData} />
        </div>
      </section>
    </main>
  )
}

export default App
