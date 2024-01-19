function dateFromISODateTime(isoDateTime) {
  return `${isoDateTime.getFullYear()}-${padStart(isoDateTime.getMonth()+1)}-${padStart(isoDateTime.getDate())}`
}

function loadStartEnd(start, end) {
  minAge.value = dateFromISODateTime(start);
  maxAge.value = dateFromISODateTime(end);
  loadIcs();
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
function loadLastMonth() {
  var now = new Date();
  var firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  var lastDay = new Date(now.getFullYear(), now.getMonth(), 0);
  loadStartEnd(firstDay, lastDay);
}

function loadThisWeek() {
  var now = new Date();
  var dayOfWeek = now.getDay();
  var differenceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Calculate difference to previous Monday
  var lastMonday = new Date(now);
  lastMonday.setDate(now.getDate() - differenceToMonday); // Set to last Monday
  loadStartEnd(lastMonday, now);
}
function loadLastWeek() {
  const dayOfWeek = now.getDay();
  const differenceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(now);
  lastMonday.setDate(now.getDate() - differenceToMonday - 7);
  const lastSunday = new Date(lastMonday);
  lastSunday.setDate(lastMonday.getDate() + 6);
  loadStartEnd(lastMonday, lastSunday);
}
