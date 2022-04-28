# csv-manipulation

some notes - without a frontend fx, hooking events up to buttons involves 
  - giving the button an id
  - using document.querySelector and addEventListener to add the click event with a callback
  - files are not loaded from the location where the script is being run locally, but rather through the browser.  for local file manipulation use Node instead
  - file downloads involve creating a link with an attribute "download" 