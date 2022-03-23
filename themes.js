function changeTheme(value) {
  let toggle = document.querySelector('input[name=theme]');
  value = parseInt(value, 10);

  if (value === 1) {
    document.documentElement.setAttribute('data-theme', 'blue');
  } else if (value === 2) {
    document.documentElement.setAttribute('data-theme', 'white');
  } else {
    document.documentElement.setAttribute('data-theme', 'purple');
  }
  // TODO: Add purple theme
}
