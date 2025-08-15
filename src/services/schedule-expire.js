import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function scheduleExpired() {
  try {
    const currentDate = dayjs(new Date());

    const data = await fetch(`${apiConfig.baseURL}/schedules`);

    const response = await data.json();

    for (const schedule of response) {
      if (dayjs(schedule.when).isBefore(currentDate)) {
        await fetch(`${apiConfig.baseURL}/history`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(schedule),
        });
        await fetch(`${apiConfig.baseURL}/schedules/${schedule.id}`, {
          method: "DELETE",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
