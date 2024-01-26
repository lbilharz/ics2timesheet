function renderTitle(calendarName) {
  let title = calendarName
  const selectedJobList = selectedJobs && selectedJobs.length !== 0 ?`${selectedJobs.join(', ')} `:""
  const selectedTagList = selectedTags && selectedTags.length !== 0 ?`${selectedTags.join(', ')} `:""
  if (selectedJobList || selectedTagList) title = `${selectedJobList + selectedTagList} – ${title}`
  document.getElementById('calName').innerText = title
  document.title = title
}

function renderTitleDate(fromDate, untilDate) {
  document.getElementById('from').innerText = humanizeDate(fromDate, true)
  document.getElementById('until').innerText = humanizeDate(untilDate, true)
}

function renderJobSelection() {
  const jobSelection = [];
  if (jobs.length > 0) jobSelection.push('<span class="label">Projects</span>')
  jobs.forEach((job, index) => {
    const checked = selectedJobs && selectedJobs.includes(job) ? ' checked="checked"' : '';
    if (index !== 0) jobSelection.push(" - ")
    jobSelection.push(`<span><input name='tasks' type='checkbox'${checked} value='${job}'>${job}</span>`)

  })
  document.getElementById('jobs').innerHTML = jobSelection.join('')
  document.querySelectorAll('#jobs input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      updateSelectedJobs()
      parseCalendarInput()
      return false
    })
  })
}

function renderHashtagSelection() {
  const hashSelection = [];
  if (jobs.length > 0 && hashtags.length > 0) hashSelection.push('<span class="label"></span> OR <br />')
  if (hashtags.length > 0) hashSelection.push('<span class="label">#Hashtags</span>')
  hashtags.forEach((hash, index) => {
    const checked = selectedTags && selectedTags.includes(hash) ? ' checked="checked"' : '';
    if (index !== 0) hashSelection.push(" - ")
    hashSelection.push(`<span><input name='hash' type='checkbox'${checked} value='${hash}'>${hash}</span>`)

  })
  document.getElementById('hash').innerHTML = hashSelection.join('')
  document.querySelectorAll('#hash input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      updateSelectedTags()
      parseCalendarInput()
      return false
    })
  })
}

function renderSummary(totalMinutes) {
  document.getElementById('summary__totalHours').innerHTML = `<p>${hourDecimal(totalMinutes)}h – ${humanizeDuration(totalMinutes)}</p>`
}

function renderTimeSheet(calendarJson) {
  const showDailySummaries = document.getElementById('dailySummaries').checked;
  const result = ["<table><thead><tr><th>What</th><th>When</th><th>Duration</th></tr></thead><tbody>"];
  let currentDate;
  let dayTotalMinutes = 0;
  let totalMinutes = 0;
  calendarJson.forEach(event => {
    const eventDate = formatDate(event.start);
    if (showDailySummaries) {
      if (!currentDate) {
        currentDate = eventDate;
      }
      if (currentDate !== eventDate) {
        result.push(`<tr class="dayTotal"><td></td><td>${humanizeDate(new Date(currentDate), true)}</td><td>${humanizeDuration(dayTotalMinutes)}</td></tr>`)
        currentDate = eventDate;
        dayTotalMinutes = 0; // Reset dayTotal when the day changes
      }
      dayTotalMinutes += event.duration;
    }

    totalMinutes += event.duration;
    result.push(`<tr><td>${event.summary}</td>`)
    result.push(`<td>${humanizeDate(event.start, false)}</td>`)
    result.push(`<td>${humanizeDuration(event.duration)}</td>`)
  });

  // Add the last day's total if necessary
  if (showDailySummaries && dayTotalMinutes > 0) {
    result.push(`<tr class="dayTotal"><td colspan="2">${humanizeDate(new Date(currentDate), true)}</td><td>${humanizeDuration(dayTotalMinutes)}</td></tr>`)
  }
  result.push("</tbody>")

  result.push('<tfoot>')
  result.push(`<tr><th colspan='2'>Total Hours</br /><small>(8h days)</small></th><th>${hourDecimal(totalMinutes)} h<br /><small>(${humanizeDuration(totalMinutes)})</small></th></tr>`)
  const hourlyRate = Number.parseInt(document.getElementById('geld').value, 10)
  const vat = Number.parseInt(document.getElementById('vat').value, 10)
  if (hourlyRate !== Number.NaN && hourlyRate > 0 ) {
    const net = formatCurrency(totalMinutes / 60 * hourlyRate)
    const tax = formatCurrency(totalMinutes / 60 * hourlyRate * vat / 100)
    const gross = formatCurrency(totalMinutes / 60 * hourlyRate * ((vat / 100)+1))
    result.push(`<tr><th colspan='2'>Net<br/><small>(${hourDecimal(totalMinutes)} h x ${formatCurrency(hourlyRate)})</small></th><th style="vertical-align: top">${net}</th></tr>`)
    result.push(`<tr><td colspan='2'><small>Value added Tax ${vat}%</small></td><td><small>${tax}</small></td></tr>`)
    result.push(`<tr><th colspan='2'>Gross</th><th>${gross}</th></tr>`)

  }
  result.push("</tfoot></table>")
  document.getElementById('timesheet__content').innerHTML = result.join('\n');
  renderSummary(totalMinutes)
  renderJobSelection();
  renderHashtagSelection();
}
