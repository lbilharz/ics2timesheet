function storeUserName(name) {
  localStorage.setItem('userName', name);
}
function getStoredUserName() {
  return localStorage.getItem('userName');
}
function populateUserName() {
  let userName = getStoredUserName();
  if (userName) {
    document.getElementById('userNameInput').value = userName;
    document.getElementById('userName').innerHTML = userName;
  }
}
function storeShowDailySummary(checked) {
  localStorage.setItem('showDailySummary', checked);
  parseCalendarInput()
}
function getStoreShowDailySummary() {
  return localStorage.getItem('showDailySummary') === 'true' ;
}
function populateShowDailySummary() {
  document.getElementById('dailySummaries').checked = getStoreShowDailySummary() ? 'checked' : '';
}

function storeUrl(name, url) {
  let urls = JSON.parse(localStorage.getItem('webcalUrls')) || [];
  if (urls.some(item => item.url === url)) {
    console.log('URL already exists in local storage.');
    return false;
  }
  urls.push({ name, url });
  localStorage.setItem('webcalUrls', JSON.stringify(urls));
}
function getStoredUrls() {
  return JSON.parse(localStorage.getItem('webcalUrls')) || [];
}

function populateDropdown() {
  let urls = getStoredUrls();
  let dropdown = document.getElementById('urlDropdown');
  dropdown.innerHTML = ''
  let option = document.createElement('option');
  option.value = '';
  option.textContent = 'recent calendar'
  dropdown.appendChild(option);

  urls.forEach(item => {
    let option = document.createElement('option');
    option.value = item.url;
    option.selected = item.url === document.getElementById('calendarUrl').value;
    option.textContent = item.name;
    dropdown.appendChild(option);
  });

  function onDropdownChange(event) {
    event.preventDefault();
    const dropdown = document.getElementById('urlDropdown');
    document.getElementById('calendarUrl').value = dropdown.value;
    if (dropdown.value === '')  return false;
    document.querySelector('#calendarForm').dispatchEvent(new Event('submit'));
  }
  document.getElementById('urlDropdown').addEventListener('change', onDropdownChange);
  if (urls.length > 0) {
    document.getElementById('urlDropdown').classList.remove('hidden');
  }
}
