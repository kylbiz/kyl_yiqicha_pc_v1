var Crawler = Meteor.npmRequire('mycrawl').Crawler;

var crawler = new Crawler();

var companyStatusOptions = {
  targetUrl: 'http://www.sgs.gov.cn/shaic/workonline/appStat!toNameAppList.action'
};

var registrationStatusOption = {
  targetUrl: 'http://www.sgs.gov.cn/shaic/workonline/appStat!toEtpsAppList.action'
}



function log(info) {
  console.log('----------------------------------')
  var len = arguments.length;
  for (var i = 0; i < len; i++) {
    console.log(arguments[i]);
  }
}

Meteor.onConnection(function(conn) {
  ip = conn.clientAddress || '192.168.0.1';
  clientInfo = conn.httpHeaders['user-agent']
});


Meteor.methods({
  companyNameStatus: function(keywords) {
    function CompanyStatusResults(callback) {
      crawler.searchCompanyNameStatus(
        companyStatusOptions, 
        keywords, 
        function(err, companyNameStatusInfo) {
        callback(err, companyNameStatusInfo);
      });
    }

    return Async.wrap(CompanyStatusResults)();
  },

  registrationFeedback: function(keywords) {
    function RegistrationFeedbackResults(callback) {
      crawler.searchRegistrationStatus(
        registrationStatusOption, 
        keywords, 
        function(err, registrationfeedbackInfo) {
        callback(err, registrationfeedbackInfo);
      });
    }

    return Async.wrap(RegistrationFeedbackResults)();
  }
});