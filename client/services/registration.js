//----------------------------------------------------------

Template.registrationResults.events({
  "click .regdetail": function(event) {
    var companyName = $(event.currentTarget).attr("data-companyname") || "";
    var companyId = $(event.currentTarget).attr("data-companyid") || "";
    Session.set("companyId", companyId);
    Session.set("companyName", companyName);
  }
})

//----------------------------------------------------------

Template.registrations.onRendered(function() {

  $(document).on("click", ".list-group-item", function() {
    $(this).addClass('selected').siblings().removeClass('selected');
  });

  $(document).on("click", ".modal-dialog a.toggle", function() {
    var group = $(this).closest("table").find("tr.toggle-table");
    var object = $(this).closest("tr").next();
    var oIndex = group.index(object);
    object.toggleClass("hidden");
    $(group).each(function(index, element) {
      if (index !== oIndex) {
        var self = $(element);
        if (!self.hasClass("hidden")) {
          self.addClass("hidden");
        }
      }
    });
  });
});

//----------------------------------------------------------

Template.ReigstrationModal.helpers({
  "credit": function() {
    var companyId = Session.get("companyId") || "";
    var companyName = Session.get("companyName") || "";

    return Credit.findOne({companyId: companyId, companyName: companyName});
  }
})

//----------------------------------------------------------