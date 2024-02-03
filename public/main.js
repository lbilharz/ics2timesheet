const locale = navigator.language || 'de-DE';
console.log('locale', locale)
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
  document.querySelector("[data-print-button]").addEventListener("click", function() {
    window.print();
  });
  document.querySelector("[data-info-button]").addEventListener("click", function() {
    toggleReadMe();
  });
})

function toggleReadMe() {
  const infoView = document.querySelector("[data-info-view]")
  if (infoView.classList.contains('hidden')) {
    fetch('https://raw.githubusercontent.com/lbilharz/ics2timesheet/main/README.md')
      .then(response => response.text())
      .then(markdown => {
        const converter = new showdown.Converter();
        infoView.querySelector("div").innerHTML = converter.makeHtml(markdown);
        infoView.classList.remove('hidden');
      })
      .catch(error => console.error('Error fetching README:', error));
  } else infoView.classList.add('hidden');

}

