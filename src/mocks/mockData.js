export const mockData = {
  userInfo: {
    profile: {
      firstName: "Clara",
      lastName: "Dupont",
      createdAt: "14 juin 2023",
      age: 29,
      gender: "Femme",
      weight: 58,
      height: "1m68",
      profilePicture: "/images/sophie.jpg",
    },
    statistics: {
      totalDistance: "2250.2",
      totalSessions: 348,
      totalDuration: 14625,
    },
    statisticsCards: [
      { label: "Temps total couru", value: "27h", unit: "15min" },
      { label: "Calories brulees", value: 25000, unit: "cal" },
      { label: "Distance totale parcourue", value: 312, unit: "km" },
      { label: "Nombre de jours de repos", value: 9, unit: "jours" },
      { label: "Nombre de sessions", value: 41, unit: "sessions" },
    ],
  },
  userActivity: [
    {
      date: "2025-01-04",
      distance: 5.8,
      duration: 38,
      heartRate: {
        min: 140,
        max: 178,
        average: 163,
      },
      caloriesBurned: 422,
    },
    {
      date: "2025-01-05",
      distance: 3.2,
      duration: 20,
      heartRate: {
        min: 148,
        max: 184,
        average: 171,
      },
      caloriesBurned: 248,
    },
    {
      date: "2025-01-09",
      distance: 6.4,
      duration: 42,
      heartRate: {
        min: 140,
        max: 176,
        average: 163,
      },
      caloriesBurned: 468,
    },
  ],
  distanceGraph: {
    title: "18km en moyenne",
    subtitle: "Total des kilometres 4 dernieres semaines",
    period: "28 mai - 25 juin",
    data: [
      { week: "S1", km: 20 },
      { week: "S2", km: 25 },
      { week: "S3", km: 16 },
      { week: "S4", km: 30 },
    ],
  },
  bpmGraph: {
    title: "163 BPM",
    subtitle: "Frequence cardiaque moyenne",
    period: "28 mai - 4 juin",
    data: [
      { day: "lun", min: 141, max: 178, average: 164 },
      { day: "mar", min: 143, max: 179, average: 166 },
      { day: "mer", min: 143, max: 179, average: 166 },
      { day: "jeu", min: 143, max: 179, average: 166 },
      { day: "ven", min: 143, max: 179, average: 166 },
      { day: "sam", min: 143, max: 179, average: 166 },
      { day: "dim", min: 143, max: 179, average: 166 },
    ],
  },
  donutGraph: {
    title: "Cette semaine",
    period: "Du 23/06/2025 au 30/06/2025",
    goal: 6,
    completed: 4,
    remaining: 2,
    centerLabel: "x4",
    centerSubLabel: "sur objectif de 6",
    subtitle: "Courses hebdomadaire realisees",
    data: [
      { name: "realisees", value: 4 },
      { name: "restants", value: 2 },
    ],
  },
};

