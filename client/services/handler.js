Template.searchRegistration.events({
  "submit form": function(event, template) {
    event.preventDefault();
    template.$('.search-result').empty(); 
    var keywords = template.$("[name=keywords]").val() || "";

    if(typeof keywords === 'string' && keywords.length >= 2) {
      var uuid = Meteor.uuid()
      Router.go("/registrations?keywords=" + keywords + '&uuid=' + uuid);
      var options = {
        uuid: uuid,
        keywords: keywords
      };

      Meteor.call('crawlerRegistration', options);      
    }
  }
});

//------------------------------------------

Template.companyStatusQuery.events({
  "submit form": function(event, template) {
    event.preventDefault();
   var keywords = template.$("[name=keywords]").val() || "";
   if(typeof keywords === 'string' && keywords.length >= 2) {
      Router.go("/status?keywords=" + keywords);   
   } 
  }
})

//------------------------------------------

Template.feedback.events({
  "submit form": function(event, template) {
    event.preventDefault();
    var keywords = template.$("[name=keywords]").val() || "";
    if(typeof keywords === 'string' && keywords.length >= 2) {
      Router.go("/feedback?keywords=" + keywords);
    }

  }
})

//------------------------------------------

Template.registrationResults.events({
  "click #btn-more": function(event, template) {
    var keywords = Session.get("keywords") || "";
    var allpageNo = template.$("[class=allpageNo]").text() || "";
    var currentpage = parseInt(template.$("[class=currentpage]").text()) ;
    var alreadyhasCompanyNum = Session.get("registrationLength") || 0 ;
    var nextpage = currentpage + 1;

    if(typeof keywords === 'string' && keywords.length >= 2  && allpageNo >= nextpage) {
        var options = {
          keywords: keywords,
          allpageNo: allpageNo,
          pageNo: nextpage
        }

      Session.set("usecredit", true);
      Meteor.call('MoreRegistrations', options);
    }
  }
});

