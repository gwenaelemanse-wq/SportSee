import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import './DistanceGraph.css';

function DistanceTooltip({ active, payload }) {
	if (!active || !payload?.length) {
		return null;
	}

	return (
		<div className="distance-graph__tooltip">
			<p>{payload[0].value} km</p>
		</div>
	);
}

export default function DistanceGraph({
	graph,
	onPreviousPeriod,
	onNextPeriod,
	canGoPrevious,
	canGoNext,
}) {
	if (!graph) {
		return null;
	}

	return (
		<article className="distance-graph">
			<header className="distance-graph__header">
				<div>
					<h2 className="distance-graph__title">{graph.title}</h2>
					<p className="distance-graph__subtitle">{graph.subtitle}</p>
				</div>
				<div className="distance-graph__period-nav">
					<button
						type="button"
						className="distance-graph__period-arrow"
						onClick={onPreviousPeriod}
						disabled={!canGoPrevious}
						aria-label="Voir les semaines précédentes"
					>
						<svg className="distance-graph__period-arrow-icon" viewBox="0 0 10 10" aria-hidden="true">
							<path
								d="M6.5 1.5L3 5l3.5 3.5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<p className="distance-graph__period">{graph.period}</p>
					<button
						type="button"
						className="distance-graph__period-arrow"
						onClick={onNextPeriod}
						disabled={!canGoNext}
						aria-label="Voir les semaines suivantes"
					>
						<svg className="distance-graph__period-arrow-icon" viewBox="0 0 10 10" aria-hidden="true">
							<path
								d="M3.5 1.5L7 5 3.5 8.5"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</header>

			<div className="distance-graph__chart">
				<ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={230}>
					<BarChart
						data={graph.data}
						margin={{ top: 12, right: 12, left: -24, bottom: 0 }}
					>
						<CartesianGrid vertical={false} stroke="#eef1ff" />
						<XAxis
							axisLine={false}
							tickLine={false}
							dataKey="week"
							stroke="#8b90ab"
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							stroke="#8b90ab"
						/>
						<Tooltip cursor={{ fill: 'rgba(44, 60, 255, 0.08)' }} content={<DistanceTooltip />} />
						<Bar dataKey="km" fill="#b9befe" radius={[10, 10, 10, 10]} barSize={22} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			<p className="distance-graph__legend">
				<span className="distance-graph__legend-dot" /> Km
			</p>
		</article>
	);
}