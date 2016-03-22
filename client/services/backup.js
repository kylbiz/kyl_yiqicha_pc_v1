
// //---------------------------------------------------------

// function getProperties(table) {
//   var properties = [];
//   if (table instanceof Array) {
//     var length = table.length;
//     for (var i = 0; i < length; i++) {
//       var key = table[i].key;
//       var type = table[i].type;
//       if (type !== "url") {
//         properties.push({
//           key: key
//         });
//       }
//     }
//   }
//   return properties;
// }

// //---------------------------------------------------------

// Template.ReigstrationModal.helpers({
//   "credit": function() {
//     var companyName = Session.get("companyName") || "";
//     var credit = Credit.findOne({
//       companyName: companyName
//     }) || {};
//     if(credit && credit.hasOwnProperty("registration")) {
//       credit.hasGotCredit = true;
//     } else {
//       credit.hasGotCredit = false;
//     }

//     if (credit && credit.hasOwnProperty("registration")
//      && credit.registration.hasOwnProperty("investorsTable")) {
//       var investorsTable = credit.registration.investorsTable;
//       var table = investorsTable[0];
//       credit.investorsTableProperties = getProperties(table) || [];
//     } else {
//       credit.investorsTableProperties = [];
//     }

//     if (credit && credit.hasOwnProperty("registration") 
//       && credit.registration.hasOwnProperty("recordInfo") 
//       && credit.registration.recordInfo.hasOwnProperty("branchTable")) {
//       var branchTable = credit.registration.recordInfo.branchTable;
//       var table = branchTable[0];
//       credit.branchTableProperties = getProperties(table) || [];
//     } else {
//       credit.branchTableProperties = [];
//     }

//     if (credit && credit.hasOwnProperty("registration") 
//       && credit.registration.hasOwnProperty("changeInfos")) {
//       var changeInfos = credit.registration.changeInfos;
//       var table = changeInfos[0];
//       credit.changeInfosProperties = getProperties(table) || [];
//     } else {
//       credit.changeInfosProperties = [];
//     }

//     if (credit && credit.hasOwnProperty("registration") 
//       && credit.registration.hasOwnProperty("revocationInfos")) {
//       var revocationInfos = credit.registration.revocationInfos;
//       var table = revocationInfos[0];
//       credit.revocationInfosProperties = getProperties(table) || [];
//     } else {
//       credit.revocationInfosProperties = [];
//     }
//     return credit;
//   }
// });