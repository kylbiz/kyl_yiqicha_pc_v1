var Fiber = Npm.require('fibers');

var reghost = 'http://localhost:3456';
var regurl = reghost + '/post/registration';
var crediturl = reghost + '/post/credit';
var regmoreurl = reghost + '/post/more'

//-------------------------------------------------------------------------
/**
 * 打印函数
 * @param  {Array} info information need to be print
 */
function log(info) {
  console.log('-------------------------------------------')
  var len = arguments.length;
  for (var i = 0; i < len; i++) {
    console.log(arguments[i]);
  }
}


function validAppId(app_id, uuid) {
  var flag = true;
  var key_pre = "kyl_app_id_";
  
  if(!app_id
    || !uuid
    || typeof("app_id") !== "string"
    || (key_pre + uuid) !== app_id) {
    flag = false;
  }
  return flag;
}

function validAppSecret(app_secret, uuid) {
  var flag = true;
  var key_pre = "kyl_app_secret_";

  if(!app_secret
    || !uuid
    || typeof("app_secret") !== "string"
    || (key_pre + uuid) !== app_secret) {
    flag = false;
  }
  return flag;
}

//-------------------------------------------------------------------------

function validKeywords(keywords) {
  var flag = true;

  if(typeof(keywords) !== "string"
    || keywords.length < 2) {
    flag = false;
  }
  return flag;
}









//-------------------------------------------------------------------------
/**
 * 抓取企业字号信息
 * @param  {json} options uuid, keywords 
 */
Meteor.methods({
  "crawlerRegistration": function(options) {
    log("crawlerRegistration called")
    if (!options || !options.keywords || !options.keywords.length >= 2) {
      log('查询字号信息不完整，不允许查询.', options);
    } else {
      var keywords = options.keywords || "";
      var uuid = options.uuid || Meteor.uuid()
      // 请求开始抓取 keywords 公司信息
      HTTP.call("POST", regurl, {
        data: {
          keywords: keywords,
          uuid: uuid,
          app_id: 'kyl_app_id_' + uuid ,
          app_secret: 'kyl_app_secret_' + uuid
        }
      }, function(err, result) {
        if(err) {
          log("crawlerRegistration: call registration crawl error", err);
        } else {
          var content = JSON.parse(result.content);
          if(content.success === true) {
            log("crawlerRegistration: start registration crawl");
          } else {
            log("crawlerRegistration: crawl registration error");
          }
        }
      })
    }
  }
})

//-------------------------------------------------------------------------

HTTP.methods({
  '/registration/service': {
    "post": function(data) {
      log("registration post called.")
      data = querystring.parse(data.toString());
      if(typeof(data) !== "object"
        || !data.hasOwnProperty("keywords")
        || !validKeywords(data["keywords"])
        || !data.hasOwnProperty("uuid")
        || !data.hasOwnProperty("app_id")
        || !data.hasOwnProperty("app_secret")
        || !validAppId(data["app_id"], data["uuid"])
        || !validAppSecret(data["app_secret"], data["uuid"])
        ) {
        return {status: 403, message: "options illegal."};
      } else {
        

        log(data)
        var uuid = data.uuid;
        var keywords = data.keywords;
        var app_id = data.app_id;
        var app_secret = data.app_secret;

        log("start calling yiqicha services.")
        HTTP.call("POST", regurl, {
          data: {
            keywords: keywords,
            uuid: uuid,
            app_id: app_id,
            app_secret: app_secret
          }
        }, function(err, result) {
          if(err) {
            log("post registration: call registration crawl error", err);
          } else {
            var content = JSON.parse(result.content);
            if(content.success === true) {
              log("post registration: then start registration crawl");
            } else {
              log("post registration: crawl registration error");
            }
          }
        })
        return {status: 200, data: data, uuid: data.uuid} + '\n' + "<script>window.close();</script>";
      }
    }
  }
});

//-------------------------------------------------------------------------

Meteor.methods({
  "GetCompanyCreditInfo": function(options) {
    console.log("start get company credit info")
    if (!options 
      || !options.companyName 
      || !options.companyName.length >=2) {
      log("get company credit info failed, you must provided keywords", options);
    } else {
      var companyId = options.companyId || "";
      var companyName = options.companyName || "";
      var creditOptions = {
          companyName: companyName,
          app_id: 'kyl_app_id',
          app_secret: 'kyl_app_secret'
        }
      // 抓取工商公示信息
      HTTP.call("POST", crediturl, {
        data: creditOptions
      }, function(err, result) {
        if(err) {
          log("call credit crawl error", err);
        } else {
          var content = JSON.parse(result.content);
          if(content.success === true) {
            log("start credit crawl");
          } else {
            log("crawl credit error");
          }
        }          
      })
    }
  }
})

//-------------------------------------------------------------------------

Meteor.methods({
  "UpdateCreditMoreRegistrations": function(moreRegistrations) {
    var registrationResults = moreRegistrations.detailResultsOutputs;
    Fiber(function() {
      registrationResults.forEach(function(registrationResult) {
        var company = registrationResult.company;

        Credit.update({
          "companyId": company.companyId,
          'companyName': company.companyName
        }, {
          companyName: company.companyName,
          companyId: company.companyId || "",
          companyQueryId: company.companyQueryId,
          companyStatus: company.companyStatus,
          companyAddress: company.address,
          basicDetail: registrationResult.basicDetail,
          annualCheckDetail: registrationResult.annualCheckDetail,
          createTime: new Date(),
          server: 'KYLYIQICHA'
        }, {
          upsert: true
        }, function(err) {
          if (err) {
            log('save registration error', err);
          } else {
            log('save registration succeed.');
          }
        })
      });
    }).run();
  }
})

//-------------------------------------------------------------------------
Meteor.methods({
  MoreRegistrations: function(options) {
    log("MoreRegistration Called", options);

    if(!options 
      || !options.keywords 
      || !options.keywords.length >=2 
      || !options.allpageNo 
      || !options.pageNo 
      || !(options.pageNo <= options.allpageNo)) {
      log("MoreRegistrations: options error", options);
    } else {
      var moreoptions = {
        keywords: options.keywords,
        allpageNo: options.allpageNo,
        pageNo: options.pageNo
      }
      // 抓取更多字号信息
      HTTP.call("POST", regmoreurl, {
        data: moreoptions
      }, function(err, result) {
        if(err) {
          log("call more registration crawl error", err);
        } else {
          var content = JSON.parse(result.content);
          if(content.success === true) {
            log("start more registration crawl");
          } else {
            log("crawl more registration error");
          }
        }          
      })
    }
  }
})

//-------------------------------------------------------------------------