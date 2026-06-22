import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import './DonutGraph.css';

const COLORS = ['#2538ff', '#cfd5ff'];

export default function DonutGraph({ graph }) {
	if (!graph) {
		return null;
	}

	return (
		<article className="donut-graph">
			<header className="donut-graph__header">
				<h2 className="donut-graph__title">{graph.title}</h2>
				<p className="donut-graph__period">{graph.period}</p>
			</header>

			<p className="donut-graph__progress">
				<strong>{graph.centerLabel}</strong> {graph.centerSubLabel}
			</p>
			<p className="donut-graph__subtitle">{graph.subtitle}</p>

			<div className="donut-graph__chart">
				<ResponsiveContainer width="100%" height="100%" minWidth={220} minHeight={180}>
					<PieChart>
						<Pie
							data={graph.data}
							dataKey="value"
							innerRadius={52}
							outerRadius={84}
							paddingAngle={2}
							stroke="none"
						>
							{graph.data.map((entry, index) => (
								<Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="donut-graph__legend">
				<p><span className="donut-graph__dot donut-graph__dot--done" /> {graph.completed} realisees</p>
				<p><span className="donut-graph__dot donut-graph__dot--left" /> {graph.remaining} restants</p>
			</div>
		</article>
	);
}