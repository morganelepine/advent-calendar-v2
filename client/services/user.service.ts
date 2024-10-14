const BASE_URL = "http://192.168.1.16:3000";

export const saveUser = async (userUuid: string, score: number) => {
    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uuid: userUuid,
                score: score,
            }),
        });
        if (!response.ok) {
            throw new Error("Failed to save user");
        }
    } catch (error) {
        console.log("Error saving user:", error);
    }
};
