const incrementMinutes = (time, minutesToIncrement) => {
  let timeString = time;

  let timeParts = timeString.split(":");
  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);
  let seconds = parseInt(timeParts[2]);

  let date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  date.setMinutes(date.getMinutes() + minutesToIncrement);

  let newHours = date.getHours().toString().padStart(2, "0");
  let newMinutes = date.getMinutes().toString().padStart(2, "0");
  let newSeconds = date.getSeconds().toString().padStart(2, "0");

  return `${newHours}:${newMinutes}:${newSeconds}`;
};

module.exports = { incrementMinutes };
