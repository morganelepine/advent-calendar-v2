const BASE_URL = "http://192.168.1.16:3000";

export const isDayOpen = async (userUuid: string, dayId: number) => {
    try {
        const response = await fetch(
            `${BASE_URL}/days-opened/${userUuid}/${dayId}`
        );
        if (!response.ok) {
            throw new Error("Failed to check if the day is open");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error checking if day is open: ", error);
        return false;
    }
};

export const addDayOpening = async (userUuid: string, dayId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/days-opened`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userUuid: userUuid, dayId: dayId }),
        });
        if (!response.ok) {
            throw new Error("Failed to add day's opening");
        }
    } catch (error) {
        console.log("Error adding day opening: ", error);
    }
};
