import { useAppContext } from '../context/AppContext';
import UserCard from '../card/CardUser';
import ProfilCard from '../card/ProfilCard';
import StatCard from '../card/StatCard';
import './Profile.css';
import { useFetch } from '../services/HookApi';

function formatDuration(totalMinutes) {
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return { value: `${h}h`, unit: `${m}min` };
}

export default function Profile() {
    useAppContext();
    const { data, loading, error } = useFetch('/api/user-info');
    const profile = data?.profile;
    const stats = data?.statistics;

    let statsCards = null;
    if (stats) {
        const { value: durVal, unit: durUnit } = formatDuration(stats.totalDuration);
        statsCards = [
            { label: 'Temps total couru', value: durVal, unit: durUnit },
            { label: 'Calories brûlées', value: Math.round(stats.totalCalories).toLocaleString('fr-FR'), unit: 'cal' },
            { label: 'Distance totale parcourue', value: stats.totalDistance, unit: 'km' },
            { label: 'Nombre de jours de repos', value: stats.restDays, unit: 'jours' },
            { label: 'Nombre de sessions', value: stats.totalSessions, unit: 'sessions' },
        ];
    }

    const createdAtLabel = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    if (loading) {
        return (
            <main className="profile-page">
                <p className="profile-loading">Chargement du profil…</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="profile-page">
                <p className="profile-error">Impossible de charger les données. Vérifiez que le serveur est démarré.</p>
            </main>
        );
    }

    return (
        <main className="profile-page">
            <div className="profile-hero">
                <section className="profile-left-column">
                    <div className="profile-user-card">
                        <UserCard profile={profile} />
                    </div>
                    <div className="profile-info-card">
                        <ProfilCard profile={profile} />
                    </div>
                </section>

                <section className="profile-stats-panel">
                    <header className="profile-stats-header">
                        <h2>Vos statistiques</h2>
                        {createdAtLabel && <p>depuis le {createdAtLabel}</p>}
                    </header>
                    <div className="profile-stats-grid">
                        {statsCards?.map((stat) => (
                            <StatCard key={stat.label} label={stat.label} value={stat.value} unit={stat.unit} />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}