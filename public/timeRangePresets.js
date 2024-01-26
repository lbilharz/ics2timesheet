
function formatDate(date) {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date).replace(/\//g, '-');
}

function loadStartEnd(start, end) {
  minAge.value = formatDate(start);
  maxAge.value = formatDate(end);
  parseCalendarInput()
}

function loadToday() {
  loadStartEnd(now, now);
}

function loadYesterday() {
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  loadStartEnd(yesterday, yesterday);
}

function loadThisMonth() {
  var now = new Date();
  var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  loadStartEnd(firstDay, lastDay);
}

function loadLastMonths(months = 1) {
  var now = new Date();
  var firstDay = new Date(now.getFullYear(), now.getMonth() - months, 1);
  var lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
  loadStartEnd(firstDay, lastDay);
}

function loadThisWeek() {
  var now = new Date();
  var dayOfWeek = now.getDay();
  var differenceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Calculate difference to previous Monday
  var lastMonday = new Date(now);
  lastMonday.setDate(now.getDate() - differenceToMonday); // Set to last Monday
  var nextSunday = new Date(lastMonday);
  nextSunday.setDate(lastMonday.getDate() + 6);
  loadStartEnd(lastMonday, nextSunday);
}

function loadLastWeek() {
  const dayOfWeek = now.getDay();
  const differenceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(now);
  lastMonday.setDate(now.getDate() - differenceToMonday - 7); // Set to last Monday of previous week
  const nextSunday = new Date(lastMonday);
  nextSunday.setDate(lastMonday.getDate() + 6);
  loadStartEnd(lastMonday, nextSunday);
}

