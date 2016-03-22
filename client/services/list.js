Template.registrationResults.helpers({
  "keywords": function() {
    return Session.get("keywords") || "";
  },
  "readyflag": function() {
    var readyflag = false;
    var uuid = Session.get("uuid");
    var registrationLength = Session.get("registrationLength");
    if(registrationLength > 0) {
      return true;
    } else {
      var searchrecords = SearchRecords.findOne({
        'uuid': uuid
      });
      if(searchrecords && searchrecords.hasOwnProperty("readyflag")) {
        readyflag = searchrecords.readyflag;
      }
      return readyflag;
    }
  }
})

Template.searchRegistration.helpers({
  "searchtimes": function() {
    var searchtimes = SearchTimes.findOne({
      "keywords": "registration"
    });
    if (searchtimes) {
      return searchtimes.times || 0;
    } else {
      return 0;
    }
  },
  "querystart": function() {
    return Session.get("querystart") || false;
  },
  "displaynum": function() {
    var displaynum = $("panel-heading").length || 0;
    console.log($(".panel-heading"), $(".panel-heading").length)
    return displaynum;
  }
})
