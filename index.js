var result = ''
function handleContents(contents) {
    splitlines = contents.split('\r\n')
    console.log('split lines is ', splitlines)
    result=splitlines.join('\n')
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