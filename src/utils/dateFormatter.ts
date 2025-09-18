export enum dateFormats {
  mdy = "MMM DD, YYYY",
  mdyt = "MMM DD, YYYY | hh:mm A",
  dmy = "DD-MM-YYYY | hh:mm:ss A",
  ymd = "YYYY-MM-DD | hh:mm:ss A",
  ddmy = "DD MMM, YYYY - hh:mm A",
}

export function formatDateTime(inputDateTime: string, format: dateFormats) {
  const dateObject = new Date(inputDateTime);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  const ampm = Number(hours) >= 12 ? "PM" : "AM";
  const formattedHours = Number(hours) % 12 || 12;

  let formattedDateTime = "";

  switch (format) {
    case dateFormats.mdy:
      formattedDateTime = `${month}/${day}/${year} `;
      break;
    case dateFormats.mdyt:
      formattedDateTime = `${month}/${day}/${year} | ${formattedHours}:${minutes} ${ampm}`;
      break;
    case dateFormats.dmy:
      formattedDateTime = `${day}-${month}-${year} | ${formattedHours}:${minutes}:${seconds} ${ampm}`;
      break;
    case dateFormats.ymd:
      formattedDateTime = `${year}-${month}-${day} | ${formattedHours}:${minutes}:${seconds} ${ampm}`;
      break;
    case dateFormats.ddmy:
      formattedDateTime = `${day} ${getMonthName(
        dateObject.getMonth()
      )}, ${year} - ${formattedHours}:${minutes} ${ampm}`;
      break;
    default:
      formattedDateTime = "Invalid format";
      break;
  }

  return formattedDateTime;
}

function getMonthName(monthIndex: number) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthIndex];
}
