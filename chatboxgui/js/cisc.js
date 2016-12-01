
$(document).ready(function () {

//---------------------------------

  $('#myFileTableframe').hide();
  $('#chatbotCLI').hide();

  document.addEventListener("dragover", function (event) {
    event.preventDefault();
    return false;}, false
  );

  document.addEventListener("drop", function (event){
    event.preventDefault();
    buildTable();
    return false;}, false
  );



  $('#submitToBot').click(function() {

    const sessionId = "session1";
    const context0 = {};

    var myBotCommand = $('#enterBot').val();

    client.runActions(sessionId, myBotCommand , context0).then((context1) => {

      var arg = JSON.stringify(context1);

      $('#displayResult').text(arg);

      return context1;
      })
      .catch((e) => {
          alert('Oops! Got an error: ' + e);
      });
  });

  $('#submitHash').click(function() {

    var myUrl = "http://fcas-test.us-east-1.elasticbeanstalk.com";
    var myKey = "/devel";
    var myCommand = "/threat/analysis/";
    var myHash = $('#enterHash').val();
    var myFullUrl = myUrl + myKey + myCommand + myHash;

    httpGetAsync(myFullUrl, jsonThreatAnalysis);

  });


  $('#chatbotCLI').terminal(function(userEntry, term){

    const sessionId = "session1";
    const context0 = {};

    client.runActions(sessionId, userEntry , context0).then((context1) => {

      term.echo($('#displayResult').text());

    }).catch((e) => {

      term.echo('Oops! Got an error: ' + e);

    });
  },{prompt: '>',
    height: 400,
    width: 700,
    history: true,
    greetings: 'ChatBot!!',
    name: 'test'
  });

  $('#chatBox').click(function() {
    $('#chatbotCLI').toggle('slow');
  });







  function buildTable(){

    $('#myFileTableframe').show();

    var sha256 = require('js-sha256');
    var files = event.target.files || event.dataTransfer.files;
    var table = document.getElementById("reportTable");

    for (var i = 0, file; file = files[i]; i++) {

        // Append a new row to the HTML document
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0); // file name
        var cell2 = row.insertCell(1); // file type
        var cell3 = row.insertCell(2); // file size
        var cell4 = row.insertCell(3); // sha-256 hash

        cell1.innerHTML = files[i].name;
        cell2.innerHTML = files[i].size;
        cell3.innerHTML = files[i].type;
        cell4.innerHTML = sha256(files[i].name);

    };

    return;

  };

/*
 $('#tableRow, fileHash').mouseover( function() {
     $(this).css("background-color", "red")
 });
 $('#tableRow, fileHash').mouseleave( function() {
     $(this).css("background-color", "white");// or whatever
 });
*/

  $('#hideTable').click(function() {

    var tableHeaderRowCount = 1;
    var table = document.getElementById('reportTable');
    var rowCount = table.rows.length;

    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    };


    $('#myFileTableframe').hide();

  });





//-----------------------

}); // close js
