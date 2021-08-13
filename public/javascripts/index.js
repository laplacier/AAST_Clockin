function downloadCSV() {
    // Convert back to CSV
    //var csv = Papa.unparse(Punches.find().fetch());
    console.log('csv');

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI('csv');
    hiddenElement.target = '_blank';
    hiddenElement.download = 'timesheet.csv';
    hiddenElement.click();
}
