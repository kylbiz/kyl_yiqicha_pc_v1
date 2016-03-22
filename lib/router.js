Router.route('/registrations', {
  "mame": "registrations",
  "onBeforeAction": function() {
    var keywords = this.params.query.keywords || "";
    var uuid = this.params.query.uuid;
    if (keywords && uuid) {
      Session.set("keywords", keywords);
      Session.set("uuid", uuid);
      Session.set("querystart", true);
      Session.set("usecredit", false);
    } else {
      Session.set("querystart", false);
    }
    this.next()
  },
  "subscriptions": function() {
    var keywords = this.params.query.keywords || "";
    var uuid = this.params.query.uuid || "";
    return Meteor.subscribe("registrationLists", keywords);
  },
  fastRender: true,
  data: function() {
    var keywords = this.params.query.keywords || "";
    var uuid = this.params.query.uuid || "";
    var zone = '上海';

    var keywordsHandleResults = handleKeywords(keywords, zone);
    var keywordsArray = keywordsHandleResults.searchKeywords;

    var keywordsString = '';
    for (var i = 0; i < keywordsArray.length - 1; i++) {
      keywordsString += keywordsArray[i] + '|';
    }
    keywordsString += keywordsArray[keywordsArray.length - 1];

    var usecredit = Session.get("usecredit") || false;
    if (usecredit === true || usecredit === "true") {
      var registrations = Credit.find({
        companyName: new RegExp(keywordsString)
      })
    } else {
      var registrations = Registration.find({
        companyName: new RegExp(keywordsString)
      }, {
        fields: {
          companyName: 1,
          companyAddress: 1,
          companyStatus: 1,
          companyId: 1,
          basicDetail: 1
        }
      });
    }

    var registrationLength = registrations.count() || 0;
    Session.set("registrationLength", registrationLength);
    var allpageNo = 0;
    var currentpage = 1;
    var numberOfResults = registrationLength;
    // var readyflag = false;
    var hasnextpage = false;

    var searchrecords = SearchRecords.findOne({
      'uuid': uuid
    });
    if (searchrecords) {
      // readyflag = searchrecords.readyflag || false;
      allpageNo = searchrecords.allpageNo || 0;
      numberOfResults = searchrecords.numberOfResults || registrationLength;
      if(registrationLength % 5 === 0) {
        currentpage = Math.floor(registrationLength / 5);
      } else {
        currentpage = Math.floor(registrationLength / 5) + 1;
      }

      Session.set("currentpage", currentpage);
      Session.set("apppageNo", searchrecords.allpageNo)
      hasnextpage = searchrecords.allpageNo > currentpage ? true : false
    }
    return {
      kylresults: {
        registrations: registrations,
        // readyflag: readyflag,
        registrationLength: registrationLength,
        currentpage: currentpage,
        allpageNo: allpageNo,
        numberOfResults: numberOfResults,
        hasnextpage: hasnextpage
      }
    }
  }
})