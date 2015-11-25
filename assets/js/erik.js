var jsonBaseURL = "http://liberationroasting.com/assets/js/";
var jsonSuffix = ".json";

function jsonp(symptom) {
    // ensure we gracefully handle no symptom
    symptom = symptom || '';
    if (symptom !== ''){
      // inject a script tag requesting symptom json data
      // ...assumes files are named by symptom
      var js = document.createElement("script");
      js.type = "text/javascript";
      js.src = jsonBaseURL + symptom + jsonSuffix;
      document.getElementsByTagName("head")[0].appendChild(js);
    }
};

function injectMedicalCondition(conditions) {
    console.log(conditions);
    var index;
    // iterate all data in the list returned
    // from the jsonp call
    for (index = 0; index < conditions.length; index++) {
      var condition = conditions[index];
      // inject a script tag in the head
      // containing the pertinent json data
      var js = document.createElement('script');
      js.type = 'application/ld+json';
      js.text = JSON.stringify(condition);
      document.querySelector('head').appendChild(js);

      var header = document.getElementById('window');
      header.innerHTML = ('<h1>' + condition.name + ' injected successfully.</h1>');
    }
}

var detectSymptom = function() {
  // inspect the page to understand
  // what symptom we need to request
  var div = document.getElementById('erik');
  var symptom = div.className;
  jsonp(symptom);
}();
