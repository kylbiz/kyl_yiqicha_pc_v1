Router.onBeforeAction(function() {
    this.next();
});

Router.configure({
  layoutTemplate:"layoutTemplate"
});

Router.route('/', {
  name: 'home',
  onBeforeAction: function() {
      this.layout('homeLayout');
      this.next();
  }
});

Router.route("logs")

Router.map(function() {

  this.route('/status', function() { //定义路由
    var self = this; //绑定this对象
    keywords = self.params.query.keywords || "";
    self.render('companyStatus');

    if(keywords && keywords.length >=2) {
      Meteor.call('companyNameStatus', keywords, function(err, result) { //调用异步方法test
        if (!err) {
          self.render('companyStatus', {
            data: function() {
              return {
                zeroresult: result.statuscode === 0,
                oneresult: result.statuscode === 1,
                multiresults: result.statuscode === 2,
                keywords: keywords,
                companynameInfo: result.companynameInfo
              }
            }
          });
        } else {
          // self.next();
          self.render('404'); //如果没数据，跳转到404
        }
      })
    }
  });


  // company registration status feedback detail
  this.route('/feedback', function() { //定义路由
    var self = this; //绑定this对象
    keywords = self.params.query.keywords || "";
    self.render('feedback');
    if(keywords && keywords.length >= 2) {
      Meteor.call('registrationFeedback', keywords, function(err, result) { //调用异步方法test
        if (!err) {
          self.render('feedback', {
            data: function() {
              return {
                zeroresult: result.statuscode === 0,
                oneresult: result.statuscode === 1,
                multiresults: result.statuscode === 2,
                keywords: keywords,
                registrationStatusInfo: result.registrationStatusInfo
              }
            }
          });
        } else {
          self.next();
          self.render('404'); //如果没数据，跳转到404
        }
      })
    } 
  });

  //----------------------------------------
});

