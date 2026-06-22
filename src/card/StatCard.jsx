import './StatCard.css';

function formatValue(value) {
    if (typeof value === 'number') {
        return value.toLocaleString('fr-FR');
    }

    return value;
}

export default function StatCard({ label, value, unit = '', icon = null, tone = 'blue' }) {
    return (
        <article className={`stat-card stat-card--${tone}`}>
            {icon ? (
                <div className="stat-card__icon" aria-hidden="true">
                    {icon}
                </div>
            ) : null}
            <div className="stat-card__content">
                <p className="stat-card__label">{label}</p>
                <p className="stat-card__value">
                    <strong>{formatValue(value)}</strong>
                    {unit ? <span className="stat-card__unit"> {unit}</span> : null}
                </p>
            </div>
        </article>
    );
}