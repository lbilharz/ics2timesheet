const jobs = []
let selectedJobs = [];
let minAge
let maxAge
const now = new Date();
let ics
let webcalURL = undefined

document.addEventListener('DOMContentLoaded', function() {
  minAge = document.querySelector('#minAge');
  maxAge = document.querySelector('#maxAge');
  populateDropdown();
  populateUserName();

  document.querySelector('#calendarForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    webcalURL = document.getElementById('calendarUrl').value;
    const calendarUrl = "/calendar?url=" + encodeURIComponent(webcalURL);
    fetch(calendarUrl)
      .then(response => response.text())
      .then(data => {
        ics = data
        if (minAge.value === "") loadThisMonth()
        else parseIcs2XML()
      })
      .catch(error => console.error('Error fetching calendar:', error));
  });


  minAge = document.querySelector('#minAge');
  maxAge = document.querySelector('#maxAge');
  document.querySelector('#userNameInput').addEventListener('change', function(event) {
    document.querySelector('#userName').innerHTML = event.target.value;
  })
  document.querySelector('#icsFile').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        ics = e.target.result;
        if (minAge.value === "") loadThisMonth()
        else parseIcs2XML()
      }
      reader.readAsText(file);
    }
  })
})

function parseIcs2XML() {
  jobs.length = 0;
  const jcalData = ICAL.parse(ics);
  const comp = new ICAL.Component(jcalData);
  const calendarName = comp.getFirstPropertyValue("x-wr-calname");
  if (webcalURL) {
    storeUrl(calendarName, webcalURL);
    populateDropdown();
    webcalURL = undefined;
  }
  const vevents = comp.getAllSubcomponents("vevent");
  const jSONEvents = []
  var min = new Date(Date.parse(minAge.value +" 00:00:00"));
  var max = new Date(Date.parse(maxAge.value +" 23:59:59"));
  document.getElementById('from').innerText = getNiceDateString(min, true)
  document.getElementById('until').innerText = getNiceDateString(max, true)
  vevents.forEach(function(vevent) {
    const event = new ICAL.Event(vevent);
    const start = getJSDateFromICSDate(event.startDate.toString());
    const end = getJSDateFromICSDate(event.endDate.toString());
    var duration = (end.getTime()-start.getTime())/1000/60;
    if (start.getTime()>min.getTime() && start.getTime()<max.getTime()) {
      const summary = event.summary;
      var job = (summary.split('('))[0].trim()
      if (!jobs.includes(job)) jobs.push(job)
      if (!selectedJobs || !selectedJobs.length || selectedJobs.includes(job)) {
        jSONEvents.push({type: 'event', summary, start, end, duration, job})
      }
    }
  })
  jSONEvents.sort((a, b) => {
    return a.start > b.start ? 1 : -1
  })
  printXML(jSONEvents, calendarName);
}

function printXML(json, name) {
  var result = "<table><thead><tr><th>What</th><th>When</th><th>Duration</th><th class='sort' >Sort</th></tr></thead><tbody>";
  const title = `– ${name} –`
  const selectedJobList = selectedJobs && selectedJobs.length !== 0 ?" ("+ selectedJobs.join(', ') +")":""
  document.getElementById('calName').innerText = title + selectedJobList
  document.title = document.getElementById('calName').innerText

  let currentDate;
  let dayTotal = 0;
  let total = 0;
  json.forEach(event => {
    const eventDate = formatDate(event.start);
    if (!currentDate) {
      currentDate = eventDate;
    }
    if (currentDate !== eventDate) {
      result += `<tr class="dayTotal"><td colspan="2">${getNiceDateString(new Date(currentDate), true)}</td><td>${humanizeDuration(dayTotal)}</td></tr>`;
      currentDate = eventDate;
      dayTotal = 0; // Reset dayTotal when the day changes
    }
    total += event.duration;
    dayTotal += event.duration;

    result += `<tr><td>${event.summary}</td>`;
    result += `<td>${getNiceDateString(event.start, false)}</td>`;
    result += `<td>${humanizeDuration(event.duration)}</td>`;
    result += `<td class='sort'>${event.start.getTime()}</td></tr>`;
  });

  // Add the last day's total if necessary
  if (dayTotal > 0) {
    result += `<tr class="dayTotal"><td colspan="2">${getNiceDateString(new Date(currentDate), true)}</td><td>${humanizeDuration(dayTotal)}</td></tr>`;
  }

  function formatCurrency(amount) {
    return `${amount.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })} €`;
  }
  const hourDecimal = (total/60).toFixed(2);
  result += `</tbody><tfoot><tr><th colspan='2'>Total Hours</br /><small>(8h days)</small></th><th>${hourDecimal} h<br /><small>(${Math.floor(total / 60 / 8)}d ${Math.floor((total / 60) % 8)}h ${Math.round(total % 60)}min)</small></th></tr>`;
  const hourlyRate = Number.parseInt(document.querySelector('#geld').value, 10)
  const vat = Number.parseInt(document.querySelector('#vat').value, 10)
  if (hourlyRate !== Number.NaN && hourlyRate > 0 ) {
    const net = formatCurrency(hourDecimal * hourlyRate)
    const tax = formatCurrency(hourDecimal * hourlyRate * vat / 100)
    const gross = formatCurrency(hourDecimal * hourlyRate * ((vat / 100)+1))
    result += `<tr><th colspan='2'>Net <small>(${hourDecimal} h x ${formatCurrency(hourlyRate)})</small></th><th>${net}</th></tr>`;
    result += `<tr><td colspan='2'>Value added Tax ${vat}%</td><td>${tax}</td></tr>`;
    result += `<tr><th colspan='2'>Gross</th><th>${gross}</th></tr>`;

  }
  result += "</tfoot></table>";
  document.querySelector('#results').innerHTML = result;
  const jobSelection = [];
  for (var i=0; i<jobs.length; i++) {
    const checked = selectedJobs && selectedJobs.includes(jobs[i]) ? ' checked="checked"' : '';
    if (i !== 0) jobSelection.push(" - ")
    jobSelection.push(`<span><input name='tasks' type='checkbox'${checked} value='${jobs[i]}'>${jobs[i]}</span>`)
  }
  jobSelection.push("")
  document.querySelector('#jobs').innerHTML = jobSelection.join('')

  document.querySelectorAll('#jobs input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      updateSelectedJobs()
      parseIcs2XML()
      return false
    })
  })
}
