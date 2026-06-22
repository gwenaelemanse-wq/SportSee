import './CardUser.css';

export default function UserCard({ profile }) {
    if (!profile) {
        return null;
    }

    const fullName = `${profile.firstName} ${profile.lastName}`;
    const createdAtLabel = profile.createdAt
        ? new Date(profile.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
        : '';

    return (
        <div className="user-card">
            <div className="user-avatar">
                <img src={profile.profilePicture} alt={fullName} />
            </div>
            <div className="user-info">
                <h1>{fullName}</h1>
                {createdAtLabel && <p>Membre depuis le {createdAtLabel}</p>}
            </div>
        </div>
    );
}