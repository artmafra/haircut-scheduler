import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

const currentDate = dayjs(new Date()).format("YYYY-MM-DD");
selectedDate.value = currentDate;
selectedDate.min = currentDate;

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const name = clientName.value.trim();
    const hourSelected = document.querySelector(".hour-selected");
    if (!hourSelected) {
      return alert("Por favor selecione um horário.");
    }

    const [hour] = hourSelected.innerText.split(":");
    const when = dayjs(selectedDate.value).add(hour, "hour");
    const id = new Date().getTime();

    await scheduleNew({
      id,
      name,
      when,
    });

    await schedulesDay();

    clientName.value = "";
  } catch (error) {
    alert("Não foi possível realizar o agendamento");
    console.log(error);
  }
};
