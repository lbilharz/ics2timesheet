function getJSDateFromICSDate(ISODateTime) {
  // Check if the string is in the standard ISO 8601 format (with optional time)
  if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?$/.test(ISODateTime)) {
    return new Date(ISODateTime);
  }

  // Handling the custom ICS date format without hyphens and colons
  const regex = /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/;
  const match = ISODateTime.match(regex);

  if (!match) {
    console.warn('Invalid ICS date format:', ISODateTime);
    return new Date(); // Return current date/time if input is invalid
  }

  const [, year, month, day, hour, minute] = match.map(Number);
  return new Date(year, month - 1, day, hour, minute);
}


function hourDecimal(totalMinutes) {
  return toLocaleString(totalMinutes/60)
}

function humanizeDate(then, short) {
  const options = short
    ? { year: 'numeric', month: '2-digit', day: '2-digit' }
    : { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };

  return new Intl.DateTimeFormat(locale, options).format(then);
}

function humanizeDuration(duration) {
  const days = Math.floor(duration / (60 * 8));
  const remainingDuration = duration % (60 * 8);
  const hours = Math.floor(remainingDuration / 60);
  const minutes = remainingDuration % 60;

  let result = '';
  if (days > 0) {
    result += `${days}d `;
  }
  if (hours > 0 || days > 0) {
    result += `${hours}h `;
  }
  result += `${padStart(minutes)}′`;

  return result.trim();
}

function padStart(number, targetLength = 2) {
  return String(number).padStart(targetLength, '0');
}

function updateSelectedJobs() {
  const checkboxes = document.querySelectorAll('#jobs input[type="checkbox"]:checked');
  selectedJobs = Array.from(checkboxes).map(checkbox => checkbox.value);
}
function updateSelectedTags() {
  const checkboxes = document.querySelectorAll('#hash input[type="checkbox"]:checked');
  selectedTags = Array.from(checkboxes).map(checkbox => checkbox.value);
}

function extractHashtags(text) {
  const hashtagRegex = /#(\w+)/g;
  const hashtags = text.match(hashtagRegex);
  return hashtags || []; // Return the array of hashtags, or an empty array if none found
}

function toLocaleString(num, digits = 2) {
  return num.toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

function formatCurrency(amount) {
  return `${toLocaleString(amount)} €`;
}

