var jsonBaseURL = "http://localhost:8000/assets/content/medicaldata.json";

var jsonp = function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = jsonBaseURL;
    document.getElementsByTagName("head")[0].appendChild(script);
}();

function injectMedicalCondition(conditions) {
    console.log(conditions);
    var index;
    for (index = 0; index < conditions.length; index++) {
      var condition = conditions[index];
      var js = document.createElement('script');
      js.type = 'application/ld+json';
      js.text = JSON.stringify(condition);
      document.querySelector('head').appendChild(js);

      var header = document.getElementById('window');
      header.innerHTML = ('<h1>' + condition.name + ' injected successfully.</h1>');
    }
}
