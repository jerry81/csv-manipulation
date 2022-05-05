var result = ''

/**
 * CSVToArray parses any String of Data including '\r' '\n' characters,
 * and returns an array with the rows of data.
 * @param {String} CSV_string - the CSV string you need to parse
 * @param {String} delimiter - the delimeter used to separate fields of data
 * @returns {Array} rows - rows of CSV where first row are column headers
 */
 function CSVToArray (CSV_string, delimiter) {
  delimiter = (delimiter || ","); // user-supplied delimeter or default comma

  var pattern = new RegExp( // regular expression to parse the CSV values.
    ( // Delimiters:
      "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
      // Standard fields.
      "([^\"\\" + delimiter + "\\r\\n]*))"
    ), "gi"
  );

  var rows = [[]];  // array to hold our data. First row is column headers.
  // array to hold our individual pattern matching groups:
  var matches = false; // false if we don't find any matches
  // Loop until we no longer find a regular expression match
  while (matches = pattern.exec( CSV_string )) {
      var matched_delimiter = matches[1]; // Get the matched delimiter
      // Check if the delimiter has a length (and is not the start of string)
      // and if it matches field delimiter. If not, it is a row delimiter.
      if (matched_delimiter.length && matched_delimiter !== delimiter) {
        // Since this is a new row of data, add an empty row to the array.
        rows.push( [] );
      }
      var matched_value;
      // Once we have eliminated the delimiter, check to see
      // what kind of value was captured (quoted or unquoted):
      if (matches[2]) { // found quoted value. unescape any double quotes.
       matched_value = matches[2].replace(
         new RegExp( "\"\"", "g" ), "\""
       );
      } else { // found a non-quoted value
        matched_value = matches[3];
      }
      // Now that we have our value string, let's add
      // it to the data array.
      rows[rows.length - 1].push(matched_value);
  }
  return rows; // Return the parsed data Array
}

function handleContents(contents) {
    // let splitlinesp = contents.split('\r')
    // console.log('split lines is ', splitlinesp)
    let resultarr = []
    let splitlines = CSVToArray(contents)
    console.log('splitlines new', splitlines)
    resultarr.push(['key','value'])
    for (let i = 1; i < splitlines.length; i++) {
       const elementArr =  splitlines[i]
       for (let j = 1; j < elementArr.length; j++) {
           if (elementArr[j]) {
             resultarr.push([elementArr[0], elementArr[j]])
           }
       }
       console.log('elementArr is ', elementArr)
    }
    console.log('resultarr is ', resultarr)
    resultarr = resultarr.map((x) => {
      return x.map((y) => {
        return `"${y}"`
      })
    })
    result = resultarr.join('\n') 
}


function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    handleContents(contents)
  };
  reader.readAsText(file);
}


document.querySelector("#file-input").addEventListener('change', function(ev) {
    console.log('ev is ', ev)
    readSingleFile(ev)
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

document.querySelector('#convert').addEventListener('click', function(ev) {
    console.log('will create file ')
    download('result.csv', result)
})