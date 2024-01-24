const jobs = []
let selectedJobs = [];
const hashtags = []
let selectedTags = [];
let minAge
let maxAge
let now = new Date();
let ics
let webcalURL = undefined

document.addEventListener('DOMContentLoaded', function() {
  window.setInterval(function() {
    now = new Date();
    if (ics) parseCalendarInput()
  }, 1000*60);
  minAge = document.getElementById('minAge');
  maxAge = document.getElementById('maxAge');
  populateDropdown();
  populateUserName();
  populateShowDailySummary()
  intiWebCalForm();
  initIcsFileForm();
})

