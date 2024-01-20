function storeUrl(name, url) {
  let urls = JSON.parse(localStorage.getItem('webcalUrls')) || [];

  // Check if the URL already exists
  const urlExists = urls.some(item => item.url === url);

  if (!urlExists) {
    // Add the new object to the array
    urls.push({ name, url });

    // Save the updated array back to local storage
    localStorage.setItem('webcalUrls', JSON.stringify(urls));
  } else {
    console.log('URL already exists in local storage.');
  }
}
function getStoredUrls() {
  // Fetch the array from local storage
  let urls = JSON.parse(localStorage.getItem('webcalUrls'));

  // Return the array or an empty array if it doesn't exist
  return urls || [];
}

function populateDropdown() {
  let urls = getStoredUrls();
  let dropdown = document.getElementById('urlDropdown');
  dropdown.innerHTML = ''
  let option = document.createElement('option');
  option.value = '';
  option.textContent = 'Recent URLs'
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

}
