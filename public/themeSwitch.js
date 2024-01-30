function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
  if (localStorageTheme !== null) return localStorageTheme;
  if (systemSettingDark.matches) return "dark";
  return "light";
}

function updateButton({ buttonEl, isDark }) {
  buttonEl.setAttribute("aria-label", isDark ? "Change to light theme" : "Change to dark theme");
  if (!isDark) {
    document.querySelector('.lightToggleIcon').classList.add('hidden')
    document.querySelector('.darkToggleIcon').classList.remove('hidden')
  } else {
    document.querySelector('.darkToggleIcon').classList.add('hidden')
    document.querySelector('.lightToggleIcon').classList.remove('hidden')
  }
}
function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector("[data-theme-toggle]");
  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
  updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
  updateThemeOnHtmlEl({ theme: currentThemeSetting });
  button.addEventListener("click", () => {
    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    updateButton({ buttonEl: button, isDark: newTheme === "dark" });
    updateThemeOnHtmlEl({ theme: newTheme });
    currentThemeSetting = newTheme;
  });

});
