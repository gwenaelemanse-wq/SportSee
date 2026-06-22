import {
	Bar,
	ComposedChart,
	Line,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

import './BpmGraph.css';

function BpmTooltip({ active, payload, label }) {
	if (!active || !payload?.length) {
		return null;
	}

	return (
		<div className="bpm-graph__tooltip">
			<p>{label}</p>
			<p>Min : {payload.find((item) => item.dataKey === 'min')?.value}</p>
			<p>Max : {payload.find((item) => item.dataKey === 'max')?.value}</p>
			<p>Moy : {payload.find((item) => item.dataKey === 'average')?.value}</p>
		</div>
	);
}

export default function BpmGraph({
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
		<article className="bpm-graph">
			<header className="bpm-graph__header">
				<div>
					<h2 className="bpm-graph__title">{graph.title}</h2>
					<p className="bpm-graph__subtitle">{graph.subtitle}</p>
				</div>
				<div className="bpm-graph__period-nav">
					<button
						type="button"
						className="bpm-graph__period-arrow"
						onClick={onPreviousPeriod}
						disabled={!canGoPrevious}
						aria-label="Voir les semaines précédentes"
					>
						<svg className="bpm-graph__period-arrow-icon" viewBox="0 0 10 10" aria-hidden="true">
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
					<p className="bpm-graph__period">{graph.period}</p>
					<button
						type="button"
						className="bpm-graph__period-arrow"
						onClick={onNextPeriod}
						disabled={!canGoNext}
						aria-label="Voir les semaines suivantes"
					>
						<svg className="bpm-graph__period-arrow-icon" viewBox="0 0 10 10" aria-hidden="true">
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

			<div className="bpm-graph__chart">
				<ResponsiveContainer width="100%" height="100%" minWidth={280} minHeight={230}>
					<ComposedChart data={graph.data} margin={{ top: 12, right: 12, left: -26, bottom: 0 }}>
						<XAxis axisLine={false} tickLine={false} dataKey="day" stroke="#8b90ab" />
						<YAxis axisLine={false} tickLine={false} stroke="#8b90ab" domain={[130, 190]} />
						<Tooltip cursor={false} content={<BpmTooltip />} />
						<Bar dataKey="min" fill="#ffcfc7" radius={[10, 10, 10, 10]} barSize={10} />
						<Bar dataKey="max" fill="#ff5b2e" radius={[10, 10, 10, 10]} barSize={10} />
						<Line type="monotone" dataKey="average" stroke="#3552ff" strokeWidth={2} dot={{ r: 3 }} />
					</ComposedChart>
				</ResponsiveContainer>
			</div>

			<div className="bpm-graph__legend">
				<p><span className="bpm-graph__dot bpm-graph__dot--min" /> Min</p>
				<p><span className="bpm-graph__dot bpm-graph__dot--max" /> Max BPM</p>
				<p><span className="bpm-graph__dot bpm-graph__dot--average" /> Moy BPM</p>
			</div>
		</article>
	);
}