const BASE_URL = "http://192.168.1.16:3000";

export const saveScore = async (
    userUuid: string,
    dayId: number | null,
    points: number,
    reason: string
) => {
    try {
        const response = await fetch(`${BASE_URL}/scores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userUuid: userUuid,
                dayId: dayId,
                points: points,
                reason: reason,
            }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to save score: ${errorMessage}`);
        }
    } catch (error) {
        console.log("Error saving score:", error);
    }
};
