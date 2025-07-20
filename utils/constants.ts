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

export const currencies = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "NGN", label: "NGN" },
    { value: "GBP", label: "GBP" },
];

export const tone = [
    { value: "Professional", label: "Professional" },
    { value: "Friendly and approachable", label: "Friendly and approachable" },
    { value: "Confident and persuasive", label: "Confident and persuasive" },
    { value: "Custom", label: "Custom (please describe below)" },
];

export const tone_2 = [
    { value: "Professional", label: "Professional" },
    { value: "Personal and authentic", label: "Personal and authentic" },
    { value: "Strategic and achievement-focused", label: "Strategic and achievement-focused" },
    { value: "Other", label: "Other (please specify below)" },
];

export const portfolio_type = [
    { value: "Creative", label: "Creative (design, writing, photography)" },
    { value: "Professional", label: "Professional (consulting, coaching, technical case studies)" },
    { value: "Developer/Tech", label: "Developer/Tech" },
    { value: "Other", label: "Other (please specify)" },
];