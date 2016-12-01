const {Wit, log} = require('node-wit');

var outp = "default";

function httpGetAsync(myFullUrl, callback) {
  console.log("Entering \"httpGetAsync\"");
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4){
      console.log("Entering \"callback\"");
      callback(xmlHttp.responseText,xmlHttp.status);
      console.log("Exiting \"callback\"");
    };
  };
  xmlHttp.open("GET", myFullUrl, true); // true for asynchronous
  xmlHttp.send(null);
  console.log("Exiting \"httpGetAsync\"");
};

function xxprocessJSONText(responseText){

  var obj = JSON.parse(responseText);

  /*Code to Return weather this is Mal/Goodware*/
  var verdict = "N/A"
  var good = Number(obj["results"]["predictions"]["detector-0"]["Goodware"]);
  var bad = Number(obj["results"]["predictions"]["detector-0"]["Malware"]);
  if ( good > bad ) {
    verdict = "No";
  } else {
    verdict = "Yes";
  }

  if ( verdict == "Yes") {
    /*Code to determine the best predition of what this*/
    var classifications = obj["results"]["predictions"]["classifier-0"];
    var max = 0.0;
    var bestPrediction = "N/A";

    for (var key in classifications) {
      // Does not process a prototype property
      if (!classifications.hasOwnProperty(key)) continue;
      var predVal = Number(classifications[key]);

      if (predVal > max) {
        bestPrediction = key;
        max = predVal;
      }
    }

    $('#displayResult').html(`Malware: ${verdict}\nProgram Family: ${bestPrediction}\nConfidence: ${(bad*100).toFixed(1)+"%"}`);

  } else {

    $('#displayResult').text(`Malware: ${verdict}`);

  }

};



function saveAsJsonResponseString(jsonData, status)
{
  console.log("Entering \"saveAsJsonResponseString\"");
  outp = JSON.stringify(jsonData);
  console.log("Outp after stringify: " + outp);
  console.log("Exiting \"saveAsJsonResponseString\"");

  return;
}

function traverseJSON(x, level) {
  if (isArray(x)) {
    traverseArray(x, level);
  } else if ((typeof x === 'object') && (x !== null)) {
    traverseObject(x, level);
  } else {
    oput +=  x + ", ";
  };
};

const client = new Wit({
  accessToken: '2YVUT2ZS2DHHXWFWNSUNN5TLRQOJ4LPU',
  actions: {
    send(request, response) {
      return new Promise(function(resolve, reject) {
        console.log(JSON.stringify(response));
        return resolve();
      });
    },
    myAction({sessionId, context, text, entities}) {
      console.log(`Session ${sessionId} received ${text}`);
      console.log(`The current context is ${JSON.stringify(context)}`);
      console.log(`Wit extracted ${JSON.stringify(entities)}`);
      return Promise.resolve(context);
    },

    // Interact with JSON to get threats ANALYSIS
    ['getThreatAnalysis']({entities, context}) {
    return new Promise(function(resolve, reject) {
      context.date = "getJsonAnalysis"; // needs to interact with JSON
      alert("here");
      return resolve(context);
    });
    },

    // Interact with JSON to get threats date
    ['getThreatDate']({entities, context}) {
    return new Promise(function(resolve, reject) {
      context.date = "getJsonDate"; // needs to interact with JSON
      return resolve(context);
    });
    },

    // Interact with JSON to get highest correlated threat family
    ['getHighestFamily']({entities, context}) {
    return new Promise(function(resolve, reject) {
      context.family = "getFamilyDate"; // needs to interact with JSON
      return resolve(context);
    });
    },

    // These next three are remnants from original skeleton,
    // not entirely sure how they will fit
    ['getRecentThreats']({entities, context}) {
    return new Promise(function(resolve, reject) {

      console.log("Entering \"getRecentThreats\"");
      console.log("outp" + outp);

      var myUrl = "http://fcas-test.us-east-1.elasticbeanstalk.com";
      var myKey = "/devel";
      var myCommand = "/threat/analysis/";
      var myHash = $('#enterHash').val();

      var myFullUrl = myUrl + myKey + myCommand + myHash;

      httpGetAsync(myFullUrl, xxprocessJSONText);
      // set context to result of request
      context.threats = outp;

      // do some logging
      console.log(context.threats);
      console.log("outp" + outp);

      console.log("Exiting \"getRecentThreats\"");

      // set outp back to default for next fn callback
      outp = "default";

      return resolve(context);
    });
    },

    ['getThreatsSinceTime']({entities, context}) {
    return new Promise(function(resolve, reject) {
      context.threatsSinceTime = "This is a list of threats since some time ago";
      return resolve(context);
    });
    },

    ['getThreats']({entities, context}) {
    return new Promise(function(resolve, reject) {
      context.listOfThreats = "this is a list of threats";
      return resolve(context);
    });
    },

    // currently not used
    ['lastTenThreats']({entities, context}){
      return new Promise(function(resolve, reject) {
      return resolve(context);
    })
    },

}});



// if we want to run it locally, maybe redirecting console input...
// interactive(client);

// However, we probably need to send the text explicitely to the witAI client.
// Maybe we can run the client interactively on the backend [or FE for now]
// or use client.message("User message here");
