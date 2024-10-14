const BASE_URL = "http://192.168.1.16:3000/scores";

export const saveScore = async (
    userUuid: string,
    dayId: number | null,
    points: number,
    reason: string
) => {
    try {
        const response = await fetch(`${BASE_URL}`, {
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

export const getScore = async (userUuid: string) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userUuid}`);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to get score: ${errorMessage}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting score:", error);
    }
};
