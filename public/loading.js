function intiWebCalForm() {
  document.getElementById('calendarForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    webcalURL = document.getElementById('calendarUrl').value;
    const calendarUrl = "/calendar?url=" + encodeURIComponent(webcalURL);
    fetch(calendarUrl)
      .then(response => response.text())
      .then(data => {
        ics = data
        if (minAge.value === "") loadThisMonth()
        else parseCalendarInput()
      })
      .catch(error => console.error('Error fetching calendar:', error));
  });
}

function initIcsFileForm() {
  document.getElementById('icsFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        ics = e.target.result;
        if (minAge.value === "") loadThisMonth()
        else parseCalendarInput()
      }
      reader.readAsText(file);
    }
  })
}

function parseCalendarInput() {
  if (!ics) {
    return
  }
  jobs.length = 0;
  const jcalData = ICAL.parse(ics);
  const comp = new ICAL.Component(jcalData);
  const calendarName = comp.getFirstPropertyValue("x-wr-calname");
  if (webcalURL) {
    storeUrl(calendarName, webcalURL);
    populateDropdown();
    webcalURL = undefined;
  }
  const fromDate = new Date(minAge.value);
  fromDate.setHours(0, 0, 0, 0);

  const untilDate = new Date(maxAge.value);
  untilDate.setHours(0, 0, 0, 0);
  untilDate.setDate(untilDate.getDate() + 1); // Move to the start of the next day

  const vevents = comp.getAllSubcomponents("vevent");
  const calendarEvents = []
  vevents.forEach(function(vevent) {
    const event = new ICAL.Event(vevent);
    const start = getJSDateFromICSDate(event.startDate.toString());
    const end = getJSDateFromICSDate(event.endDate.toString());
    const duration = (end.getTime()-start.getTime())/1000/60;
    if (
      start.getTime() > fromDate.getTime() &&
      start.getTime() < untilDate.getTime()
    ) {
      let hashMatch = false
      const summary = event.summary;
      const tags = extractHashtags(summary)
      if (tags.length > 0) {
        tags.forEach(tag => {
          if (!hashtags.includes(tag)) hashtags.push(tag)
          if (!hashMatch && selectedTags.includes(tag)) {
            calendarEvents.push({type: 'event', summary, start, end, duration, tag})
            hashMatch = true
          }
        })
      }
      const job = (summary.split(' ('))[0]
      if (summary.indexOf(' (') !== -1 && !jobs.includes(job)) jobs.push(job)
      if (!hashMatch && selectedTags.length === 0 && (!selectedJobs || !selectedJobs.length || selectedJobs.includes(job))) {
        calendarEvents.push({type: 'event', summary, start, end, duration, job})
      }
    }
  })
  calendarEvents.sort((a, b) => {
    return a.start > b.start ? 1 : -1
  })
  renderTitle(calendarName)
  renderTitleDate(fromDate, untilDate)
  renderTimeSheet(calendarEvents);
}

