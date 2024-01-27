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
  hashtags.length = 0;
  const jcalData = ICAL.parse(ics);
  const comp = new ICAL.Component(jcalData);
  const calendarName = comp.getFirstPropertyValue("x-wr-calname") || `calendar-${Math.floor(Math.random() * 1000)}`
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
    if (event.isRecurring()) {
      let iterator = event.iterator();
      let next;
      while ((next = iterator.next())) {
        let start = next.toJSDate();
        if (start < fromDate) continue // Skip occurrences before your start date
        if (start > untilDate) break // Break loop if the date is past your end date
        if (start >= fromDate && start < untilDate) {
          calendarEvents.push({type: 'event',
            summary: event.summary,
            start: start,
            duration: event.duration.toSeconds()/60,
          })
        }
      }
    } else {
      const start = event.startDate.toJSDate()
      if (start >= fromDate && start < untilDate) {
        calendarEvents.push({
          type: 'event',
          summary: event.summary,
          start,
          duration: event.duration.toSeconds()/60
        })
      }
    }
  })
  calendarEvents.sort((a, b) => {
    return a.start > b.start ? 1 : -1
  })
  calendarEvents.forEach(({summary}) => {
    if (summary.indexOf(' (') !== -1 && !jobs.includes(extractJob(summary))) jobs.push(extractJob(summary))
    const tags = extractHashtags(summary)
    tags.forEach(tag => {
      if (!hashtags.includes(tag)) hashtags.push(tag)
    })
  })
  // filter out events that are not selected via job/hashtags
  const filteredCalendarEvents = calendarEvents.filter(({summary}) => {
    return (selectedTags.length === 0 || extractHashtags(summary).some(tag => selectedTags.includes(tag)))
      && (!selectedJobs || !selectedJobs.length || selectedJobs.includes(extractJob(summary)))
  })
  renderTitle(calendarName)
  renderTitleDate(fromDate, untilDate)
  renderTimeSheet(filteredCalendarEvents);
}

