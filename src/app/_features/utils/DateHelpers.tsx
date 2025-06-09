import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  try {
    const parsed = dayjs(dateString, "DD/MM/YYYY, HH:mm");
    return parsed.isValid()
      ? parsed.format("dddd, MMMM D, YYYY [at] h:mm A")
      : "Invalid date";
  } catch {
    return dateString;
  }
};

export const formatDateForInput = (date: string) => {
  return dayjs(date).format("YYYY-MM-DDTHH:mm");
};
