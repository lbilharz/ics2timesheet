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

function getYesterday(date) {
  return new Date(date.setDate(date.getDate() - 1))
}

function getFirstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function getStartOfLastMonths(date, monthsAgo) {
  return new Date(date.getFullYear(), date.getMonth() - monthsAgo, 1);
}

function getEndOfLastMonths(date, monthsAgo) {
  return new Date(date.getFullYear(), date.getMonth() - monthsAgo + 1, 0);
}

function getStartOfWeek(date) {
  const dayOfWeek = date.getDay();
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
}

function getEndOfWeek(date) {
  const startOfWeek = getStartOfWeek(date);
  return new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6);
}

function loadToday() {
  const today = new Date();
  loadStartEnd(today, today);
}

function loadYesterday() {
  const today = new Date();
  const yesterday = getYesterday(today);
  loadStartEnd(yesterday, yesterday);
}

function loadThisMonth() {
  const now = new Date();
  loadStartEnd(getFirstDayOfMonth(now), getLastDayOfMonth(now));
}

function loadLastMonths(months = 1) {
  const now = new Date();
  loadStartEnd(getStartOfLastMonths(now, months), getEndOfLastMonths(now, 1));
}

function loadThisWeek() {
  const now = new Date();
  loadStartEnd(getStartOfWeek(now), getEndOfWeek(now));
}

function loadLastWeek() {
  const startOfThisWeek = getStartOfWeek(new Date());
  const endOfLastWeek = getYesterday(startOfThisWeek);
  const startOfLastWeek = getStartOfWeek(endOfLastWeek);
  loadStartEnd(startOfLastWeek, endOfLastWeek);
}

