# AD Robot Performance Chart

Небольшое тестовое задание: воспроизведение графика из референса с четырьмя time-series:

- Area: Cost
- Bar: CPA
- Spline: ROI confirmed
- Line: Conversions

Стек: React, TypeScript, Vite, Recharts.

## Требования

- Node.js 20+
- npm 10+

## Запуск

```bash
git clone https://github.com/VitalyShrugged/ad-robot-chart-test.git
cd ad-robot-chart-test
npm install
npm run dev
```

После запуска Vite выведет локальный адрес приложения.

Для production-сборки:

```bash
npm run build
npm run preview
```

## Данные

Все данные для графика находятся в `src/data.ts`.

График принимает обычный массив объектов:

```ts
type ChartPoint = {
  date: string
  cost: number
  cpa: number
  roiConfirmed: number
  conversions: number
}
```

Пример:

```ts
const data = [
  {
    date: '2026-06-12',
    cost: 44.36,
    cpa: 1.23,
    roiConfirmed: 161.47,
    conversions: 36,
  },
]
```

Компонент можно использовать отдельно:

```tsx
<PerformanceChart data={data} />
```

## Реализация

Для воспроизведения визуального поведения четыре метрики приводятся к общей plot-scale перед отрисовкой. При этом исходные значения не меняются и именно они используются в tooltip.

Это позволяет визуально показать метрики с сильно разными диапазонами значений одновременно, как в референсе.

Tooltip показывает:

- дату выбранной точки
- Cost
- CPA
- ROI confirmed
- Conversions

При наведении на график появляется вертикальный hover-контрол и подсветка активных точек.

## Структура

```text
src/
├── components/
│   └── PerformanceChart.tsx
├── App.tsx
├── data.ts
├── index.css
├── main.tsx
└── types.ts
```

`PerformanceChart` не зависит от demo data и получает данные через props.
