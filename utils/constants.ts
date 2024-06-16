export const sectors = [{ value: "technology", label: "Technology" }];

export const experiencesMap: Record<string, string> = {
    "0-5": "0-5 years",
    "6-10": "6-10 years",
    "11-15": "11-15 years",
    "15+": "15years+",
};

export const experiences = Object.keys(experiencesMap).map((value) => ({ value, label: experiencesMap[value] }));

export const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
];
