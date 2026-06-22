import './ProfilCard.css';

function formatHeight(h) {
    if (typeof h === 'number' && h >= 100) {
        const m = Math.floor(h / 100);
        const cm = h % 100;
        return `${m}m${cm.toString().padStart(2, '0')}`;
    }
    return h;
}

export default function ProfilCard({ profile }) {
    if (!profile) return null;

    const genderLabel =
        profile.gender === 'female' ? 'Femme'
        : profile.gender === 'male' ? 'Homme'
        : profile.gender ?? null;

    return (
        <div className="profil-card">
            <h2 className="profil-card__title">Votre profil</h2>
            <hr className="profil-card__divider" />
            <ul className="profil-card__list">
                <li>Age : {profile.age}</li>
                {genderLabel && <li>Genre : {genderLabel}</li>}
                <li>Taille : {formatHeight(profile.height)}</li>
                <li>Poids : {profile.weight}kg</li>
            </ul>
        </div>
    );
}