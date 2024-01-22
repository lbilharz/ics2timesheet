function getJSDateFromICSDate(ISODateTime) {
  // Check if the string is in ISO 8601 format (with hyphens and colons)
  if (ISODateTime.includes('-') && ISODateTime.includes('T')) {
    return new Date(ISODateTime);
  }
  const regex = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/;
  const match = ISODateTime.match(regex);

  if (!match) {
    console.warn('Invalid ICS date format:', ISODateTime);
    return now // Return current date/time if input is invalid
  }

  const [, year, month, day, hour, minute] = match.map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

function getNiceDateString(then, short) {
  if (short) return padStart(then.getDate()) +"."+ padStart((then.getMonth()+1))+"."+then.getFullYear();
  return padStart(then.getDate()) +"."+ padStart((then.getMonth()+1))+"."+then.getFullYear() +" "+padStart(then.getHours()) +":"+padStart(then.getMinutes());
}

function humanizeDuration(duration) {
  const hours = duration >= 60 ? Math.floor(duration/60) + "' " : ""
  return hours + padStart(duration%60) +"\""
}

function padStart(number, targetLength = 2) {
  return String(number).padStart(targetLength, '0');
}

function updateSelectedJobs() {
  const checkboxes = document.querySelectorAll('#jobs input[type="checkbox"]:checked');
  selectedJobs = Array.from(checkboxes).map(checkbox => checkbox.value);
}
