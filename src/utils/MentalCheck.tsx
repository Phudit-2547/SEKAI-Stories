export const mentalCheck = (text: string): boolean => {
    const mentalHealthRelatedWords = [
        "kill myself",
        "kill yourself",
        "suicide",
        "end my life",
        "take my life",
        "i want to die",
        "i want to disappear",
        "i don't want to live",
        "i dont want to live",
        "better off dead",
        "i should die",
        "i wish i was dead",
        "self harm",
        "self-harm",
        "hurt myself",
        "cut myself",
        "cut yourself",
        "cutting myself",
        "cutting yourself",
        "i deserve pain",
    ];

    const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const hasMentalHealth = mentalHealthRelatedWords.some((word) =>
        new RegExp(escape(word), "i").test(text)
    );

    return hasMentalHealth;
};
