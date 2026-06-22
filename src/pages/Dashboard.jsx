import BpmGraph from '../components/BpmGraph';
import DistanceGraph from '../components/DistanceGraph';
import DonutGraph from '../components/DonutGraph';
import { useAppContext } from '../context/AppContext';
import './Dashboard.css';
import { useFetch } from '../services/HookApi';
import { useMemo, useState } from 'react';

function getWeekBounds(weeksAgo, baseDate) {
    const date = new Date(baseDate);
    const day = date.getDay();
    const daysToMon = day === 0 ? 6 : day - 1;
    const monday = new Date(date);
    monday.setDate(date.getDate() - daysToMon - weeksAgo * 7);
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return { start: monday, end: sunday };
}

const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];
const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function startOfWeek(date) {
    const copy = new Date(date);
    const day = copy.getDay();
    const daysToMon = day === 0 ? 6 : day - 1;
    copy.setDate(copy.getDate() - daysToMon);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

function getWeeksDiff(newerDate, olderDate) {
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const diff = startOfWeek(newerDate).getTime() - startOfWeek(olderDate).getTime();
    return Math.max(0, Math.floor(diff / msPerWeek));
}

export default function Dashboard() {
    useAppContext();
    const [distanceOffset, setDistanceOffset] = useState(0);
    const [bpmOffset, setBpmOffset] = useState(0);

    const today = useMemo(() => new Date(), []);
    const activityUrl = useMemo(() => {
        const twoYearsAgo = new Date(today);
        twoYearsAgo.setFullYear(today.getFullYear() - 2);
        return `/api/user-activity?startWeek=${twoYearsAgo.toISOString().split('T')[0]}&endWeek=${today.toISOString().split('T')[0]}`;
    }, [today]);

    const { data: userInfo, loading: loadingInfo, error: errorInfo } = useFetch('/api/user-info');
    const { data: userActivity, loading: loadingActivity, error: errorActivity } = useFetch(activityUrl);

    const sessions = useMemo(() => {
        if (!Array.isArray(userActivity)) {
            return [];
        }
        return [...userActivity].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [userActivity]);

    const currentWeekStart = useMemo(() => startOfWeek(today), [today]);
    const earliestSessionDate = sessions[0] ? new Date(sessions[0].date) : null;
    const maxWeekOffset = earliestSessionDate
        ? getWeeksDiff(currentWeekStart, earliestSessionDate)
        : 0;

    // ── Weekly distance graph (last 4 weeks) ────────────────────────────
    const weeklyData = [3, 2, 1, 0].map((weeksAgo, idx) => {
        const targetWeeksAgo = weeksAgo + distanceOffset;
        const { start, end } = getWeekBounds(targetWeeksAgo, today);
        const km = sessions
            .filter(s => { const d = new Date(s.date); return d >= start && d <= end; })
            .reduce((sum, s) => sum + s.distance, 0);
        return { week: `S${idx + 1}`, km: parseFloat(km.toFixed(1)) };
    });
    const avgKm = weeklyData.reduce((sum, w) => sum + w.km, 0) / 4;
    const { start: w0Start } = getWeekBounds(3 + distanceOffset, today);
    const { end: w3End } = getWeekBounds(distanceOffset, today);
    const periodDist = `${w0Start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${w3End.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;

    const canDistanceGoNext = distanceOffset > 0;
    const canDistanceGoPrevious = distanceOffset < maxWeekOffset;

    const distanceGraph = {
        title: `${Math.round(avgKm)}km en moyenne`,
        subtitle: 'Total des kilomètres 4 dernières semaines',
        period: periodDist,
        data: weeklyData,
    };

    // ── BPM graph: selected week ─────────────────────────────────────────
    const { start: bpmWeekStart, end: bpmWeekEnd } = getWeekBounds(bpmOffset, today);
    const bpmWeekSessions = sessions.filter((session) => {
        const d = new Date(session.date);
        return d >= bpmWeekStart && d <= bpmWeekEnd;
    });
    const bpmData = DAY_ORDER.map((dayIndex, idx) => {
        const daySessions = bpmWeekSessions.filter((session) => new Date(session.date).getDay() === dayIndex);
        if (!daySessions.length) {
            return {
                day: DAY_NAMES[idx],
                min: null,
                max: null,
                average: null,
            };
        }

        const min = Math.min(...daySessions.map((session) => session.heartRate.min));
        const max = Math.max(...daySessions.map((session) => session.heartRate.max));
        const average = Math.round(
            daySessions.reduce((sum, session) => sum + session.heartRate.average, 0) / daySessions.length,
        );

        return {
            day: DAY_NAMES[idx],
            min,
            max,
            average,
        };
    });

    const validBpmValues = bpmData.filter((item) => item.average !== null).map((item) => item.average);
    const avgBpm = validBpmValues.length
        ? Math.round(validBpmValues.reduce((sum, value) => sum + value, 0) / validBpmValues.length)
        : 0;
    const periodBpm = `${bpmWeekStart.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${bpmWeekEnd.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;

    const canBpmGoNext = bpmOffset > 0;
    const canBpmGoPrevious = bpmOffset < maxWeekOffset;

    const bpmGraph = {
        title: `${avgBpm} BPM`,
        subtitle: 'Fréquence cardiaque moyenne',
        period: periodBpm,
        data: bpmData,
    };

    // ── This week ────────────────────────────────────────────────────────
    const { start: thisWeekStart, end: thisWeekEnd } = getWeekBounds(0, today);
    const thisWeekSessions = sessions.filter(s => {
        const d = new Date(s.date);
        return d >= thisWeekStart && d <= thisWeekEnd;
    });
    const weeklyGoal = userInfo?.weeklyGoal ?? 3;
    const weekCount = thisWeekSessions.length;
    const remaining = Math.max(0, weeklyGoal - weekCount);
    const weekDuration = thisWeekSessions.reduce((sum, s) => sum + s.duration, 0);
    const weekDistance = parseFloat(thisWeekSessions.reduce((sum, s) => sum + s.distance, 0).toFixed(1));

    const formatWeekRange = (start, end) => {
        const fmt = (d) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `Du ${fmt(start)} au ${fmt(end)}`;
    };

    const donutGraph = {
        title: 'Cette semaine',
        period: formatWeekRange(thisWeekStart, thisWeekEnd),
        goal: weeklyGoal,
        completed: weekCount,
        remaining,
        centerLabel: `x${weekCount}`,
        centerSubLabel: `sur objectif de ${weeklyGoal}`,
        subtitle: 'Courses hebdomadaires réalisées',
        data: [
            { name: 'realisees', value: weekCount > 0 ? weekCount : 0.01 },
            { name: 'restants', value: remaining > 0 ? remaining : (weekCount > 0 ? 0.01 : weeklyGoal) },
        ],
    };

    const totalDistance = parseFloat(userInfo?.statistics?.totalDistance ?? 0);
    const profile = userInfo?.profile;

    const isLoading = loadingInfo || loadingActivity;
    const hasError = errorInfo || errorActivity;

    if (isLoading) {
        return (
            <main className="dashboard-page">
                <p className="dash-loading">Chargement des données…</p>
            </main>
        );
    }

    if (hasError) {
        return (
            <main className="dashboard-page">
                <p className="dash-error">Impossible de charger les données. Vérifiez que le serveur est démarré.</p>
            </main>
        );
    }

    return (
        <main className="dashboard-page">
            {/* ── User hero card ── */}
            <section className="dash-hero-card">
                <div className="dash-hero-user">
                    <img
                        src={profile?.profilePicture}
                        alt={profile ? `${profile.firstName} ${profile.lastName}` : ''}
                        className="dash-hero-avatar"
                    />
                    <div>
                        <h1 className="dash-hero-name">{profile?.firstName} {profile?.lastName}</h1>
                        <p className="dash-hero-since">
                            Membre depuis le{' '}
                            {profile?.createdAt
                                ? new Date(profile.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                                : ''}
                        </p>
                    </div>
                </div>
                <div className="dash-hero-stat">
                    <span className="dash-hero-stat-label">Distance totale parcourue</span>
                    <span className="dash-hero-stat-value">{totalDistance} km</span>
                </div>
            </section>

            {/* ── Performances ── */}
            <section className="dash-section">
                <h2 className="dash-section-title">Vos dernières performances</h2>
                <div className="dash-graphs-grid">
                    <DistanceGraph
                        graph={distanceGraph}
                        onPreviousPeriod={() => setDistanceOffset((prev) => Math.min(prev + 1, maxWeekOffset))}
                        onNextPeriod={() => setDistanceOffset((prev) => Math.max(prev - 1, 0))}
                        canGoPrevious={canDistanceGoPrevious}
                        canGoNext={canDistanceGoNext}
                    />
                    <BpmGraph
                        graph={bpmGraph}
                        onPreviousPeriod={() => setBpmOffset((prev) => Math.min(prev + 1, maxWeekOffset))}
                        onNextPeriod={() => setBpmOffset((prev) => Math.max(prev - 1, 0))}
                        canGoPrevious={canBpmGoPrevious}
                        canGoNext={canBpmGoNext}
                    />
                </div>
            </section>

            {/* ── Cette semaine ── */}
            <section className="dash-section">
                <h2 className="dash-section-title">Cette semaine</h2>
                <p className="dash-section-sub">{formatWeekRange(thisWeekStart, thisWeekEnd)}</p>
                <div className="dash-week-grid">
                    <DonutGraph graph={donutGraph} />
                    <div className="dash-week-stats">
                        <article className="week-stat-card">
                            <p className="week-stat-label">Durée d&apos;activité</p>
                            <p className="week-stat-value">{weekDuration} <span className="week-stat-unit">minutes</span></p>
                        </article>
                        <article className="week-stat-card">
                            <p className="week-stat-label">Distance</p>
                            <p className="week-stat-value">{weekDistance} <span className="week-stat-unit">kilomètres</span></p>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}