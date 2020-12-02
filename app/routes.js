const { fail } = require('assert');
const { error } = require('console');
const { title } = require('process');
module.exports = function(app, passport) {
let jobgood      = require('../app/models/jobgood');
let listjob      = require('../app/models/listjob');
let apply      = require('../app/models/applyjob');
let User      = require('../app/models/user');
const moment = require('moment'); 
var multer  = require('multer');
var bcrypt   = require('bcrypt-nodejs');
const fs = require('fs'); 
var path = require('path');
var upload_file = require("./models/file_upload.js");
var upload_image = require("./models/image_upload.js");
const request = require('request-promise')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    }, 
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
  var upload = multer({ storage: storage })
  app.post("/file_upload", function (req, res) {
    upload_file(req, function(err, data) {
  
      if (err) {
        return res.status(404).end(JSON.stringify(err));
      }
  
      res.send(data);
    });
  });
  // Image POST handler.
  app.post("/image_upload", function (req, res) {
    upload_image(req, function(err, data) {
      if (err) {
        return res.status(404).end(JSON.stringify(err));
      }
      res.send(data);
    });
  });
  
  // Create folder for uploading files.
    
  
    // show the home page (will also have our login links)
    app.get('/blog',function(req, res) {
        var page =  req.query.page 
        if(page){
            if(page < 1){
                page = 1 ;
            }
            page = parseInt(page)
            pagesize = parseInt(req.query.pagesize)
            if(pagesize < 1){
                pagesize = 36 ;
            }
            var skip = (page - 1 )*pagesize
            listjob.count({}, function(err, result) {
            var sl = result 
            var sltht =Math.ceil(result/pagesize) 
            listjob.find({}).skip(skip).limit(pagesize).sort({_id :-1}).exec((err,datajob)=>{
                titlee= "TẤT CẢ VIỆC LÀM TẠI VIỆC LÀM THÊM"
                res.render('Views-Client/blog.ejs',{datajob:datajob,pagesize:pagesize,sltht:sltht,user:req.user,title:titlee});
            }) 
        })
        }
        else{
            listjob.find({}).limit(12).sort({_id :-1}).exec((err,datajob)=>{
                listjob.count({}, function(err, result) {
                pagesize= 12;
                var sl = result 
                var sltht =Math.ceil(result/pagesize)
                titlee= "TẤT CẢ VIỆC LÀM TẠI VIỆC LÀM THÊM"
                res.render('Views-Client/blog.ejs',{datajob:datajob,pagesize:pagesize,sltht:sltht,user:req.user,title:titlee});
           })
         }) 
        }
        
    });
    app.get('/browsejobs',isLoggedIn, function(req, res) {
        var page =  req.query.page 
        if(page){
            if(page < 1){
                page = 1 ;
            }
            page = parseInt(page)
            pagesize = parseInt(req.query.pagesize)
            if(pagesize < 1){
                pagesize = 8 ;
            }
            var skip = (page - 1 )*pagesize
            listjob.count({}, function(err, result) {
            var sl = result 
            var sltht =Math.ceil(result/pagesize) 
            listjob.find({}).skip(skip).limit(pagesize).exec((err,datata)=>{
                titlee ="TÌM VIỆC LÀM"
                res.render('Views-Client/browsejobs.ejs',{datata:datata,pagesize:pagesize,sltht:sltht,user:req.user,title:titlee});
            }) 
        })
        }
        else{
            listjob.find({}).limit(8).sort({_id :-1}).exec((err,datata)=>{
                listjob.count({}, function(err, result) {
                var sl = result 
                var pagesize = 10
                var sl = result 
                var sltht =Math.ceil(result/pagesize)
                titlee ="TÌM VIỆC LÀM"
                res.render('Views-Client/browsejobs.ejs',{datata:datata,pagesize:pagesize,sltht:sltht,user:req.user,title:titlee});
           })
         }) 
        }
        
    });
    app.get('/candidates',isLoggedIn,function(req, res) {
        titlee="TÌM NHÂN VIÊN"
        res.render('Views-Client/candidates.ejs',{user:req.user,title:titlee});
    });
    app.get('/connect-local', function(req, res) {
        res.render('Views-Client/connect-local.ejs');
    });
    app.get('/test', function(req, res) {
        res.render('Views-Client/test.ejs');
    });
    app.get('/contact',function(req, res) {
        titlee = "LIÊN HỆ VỚI TÔI"
        request('http://api.ipstack.com/14.161.33.30?access_key=fd576e9fef3d445263f9f09077c87e27')
        .then(response => console.log(JSON.parse(response)))
        .catch(err => console.log(err))
            res.render('Views-Client/contact.ejs',{user:req.user,title:titlee});
        });
    app.get('/job-post', function(req, res) {
        res.render('Views-Client/job-post.ejs');
    });
    app.get('/new-application', function(req, res) {
        res.render('Views-Client/nhap-thong-tin-nhan-su.ejs');
    });
    app.get('/blog-single&idpost=:listjobs_id',isLoggedIn,function(req,res,done){
        listjob.find({_id : req.params.listjobs_id}).exec((err,listjobs)=>{
            listjob.find({}).limit(10).exec((err,datajobRelatedto)=>{
            titlee ="CHI TIẾT VIỆC LÀM"
             res.render("Views-Client/blog-single.ejs",{listjobs:listjobs,datajobRelatedto:datajobRelatedto,user:req.user,title:titlee,user:req.user})
            })
        })
    })
    app.post('/chosse-avata',upload.single('avata'),isLoggedIn,function(req, res) {
        User.updateOne({_id:req.user._id},{ $set:{"local.ImageUser": req.file.filename } }).exec((err,result)=>{
            res.redirect('profile?message='+ encodeURIComponent('applysussces'));
        })
    })
    app.post('/chosse-files',upload.single('name_file'),isLoggedIn,function(req, res) {
        User.updateOne({_id:req.user._id},{ $set:{"local.FileUser": req.file.filename } }).exec((err,result)=>{
            res.redirect('profile?message='+ encodeURIComponent('applysussces'));
        })
    })
    app.post('/detail-me',isLoggedIn,function(req, res) {
        User.updateOne({_id:req.user._id},{ $set:{"local.Detail": req.body.Detailt } }).exec((err,result)=>{
            res.redirect('profile?message='+ encodeURIComponent('applysussces'));
        })
    })
    app.get('/detailfilepdf',isLoggedIn,function(req, res) {
        User.find({_id:req.user._id}).exec((err,result)=>{
            res.render('Views-Admin/pdf-viewer.ejs',{result:result})
        })
    })
    app.get('/ungtuyen=:idpost&:idntv',isLoggedIn, function(req, res,) {
            listjob.findOne({_id:req.params.idpost}).exec((err,datajob)=>{
            newapply  = apply()
            newapply.title ="Việc làm";
            newapply.IdJob=req.params.idpost
            newapply.linhvuc = datajob.linhvuc
            newapply.loaihinh =datajob.loaihinh
            newapply.Namecompany =datajob.Namecompany
            newapply.NameJob =datajob.NameJob
            newapply.Address =datajob.Address
            newapply.idpost =datajob.idpost
            newapply.ImageCompany =datajob.ImageCompany
            newapply.Detail =datajob.Detail
            newapply.DetailCompany =datajob.DetailCompany
            newapply.Phone =datajob.daPhonetajob
            newapply.Email =datajob.Email
            newapply.TimecreatPostDay =datajob.TimecreatPostDay
            newapply.TimecreatPostHour =datajob.TimecreatPostHour
            newapply.IdNTV=req.params.idntv
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            newapply.TimecApplyDay = (date  + "-" + month + "-" + year)
            newapply.save(function(err) {
            res.redirect('profile?message='+ encodeURIComponent('applysussces'));
        });  
    })
    })
    app.get('/ungtuyenjobgood=:idpost&:idntv',isLoggedIn, function(req, res,) {
        jobgood.findOne({_id:req.params.idpost}).exec((err,datajob)=>{
        newapply  = apply()
        newapply.title ="Việc làm tốt";
        newapply.IdNTV=req.params.idntv
        newapply.IdJob =datajob.IdJob
        newapply.Namecompany =datajob.Namecompany
        newapply.linhvuc =datajob.linhvuc
        newapply.loaihinh =datajob.hinhthuc
        newapply.NameJob =datajob.NameJob
        newapply.Address =datajob.Address
        newapply.Email=datajob.Email
        newapply.ImageCompany =datajob.ImageCompany
        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();
        newapply.TimecApplyDay = (date  + "-" + month + "-" + year)
        newapply.save(function(err) {
        res.redirect('profile?message='+ encodeURIComponent('applysussces'));
    });  
})
})
    
    app.get('/new-post', isLoggedIn, function(req, res,) {
    res.render('Views-Client/new-post.ejs',{message:"",user:req.user});
    })
       
    app.get('/new-profile', isLoggedIn, function(req, res,) {
        res.render('Views-Client/new-profile.ejs',{message:"",user:req.user});
        })
    app.post('/post-new-job', isLoggedIn,upload.single('hinhanhtin'),function(req,res,done){ 
            let newJobpost  = new listjob();
            newJobpost.linhvuc = req.body.linhvuc;
            newJobpost.loaihinh = req.body.loaihinh;
            newJobpost.Namecompany = req.body.Namecompany;
            newJobpost.NameJob = req.body.Namejob;
            newJobpost.Address = req.user.local.AddressCompany;
            newJobpost.idpost = req.user._id;
            newJobpost.ImageCompany = req.file.filename;
            newJobpost.Detail = req.body.DetailJob;
            newJobpost.DetailCompany = req.user.local.Detail;
            newJobpost.Phone = req.user.local.PhoneCompany;
            newJobpost.Email = req.user.local.EmailContactCompany;
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            newJobpost.TimecreatPostHour = (hours + ":" + minutes)
            newJobpost.TimecreatPostDay = (date  + "-" + month + "-" + year)
            newJobpost.save(function(err) {
                if (err){
                    return done(err);
                }else{
                    res.redirect('/new-post?error='+ encodeURIComponent('Incorrect_Credential'));
                }         
            })  
    })
    app.get('/Home',isLoggedIn, function(req, res) {
        jobgood.find({}).limit(18).exec((err,datalistjobs)=>{
            jobgood.find({}).limit(11).exec((err,datahot)=>{
                    res.render('Views-Client/Trangchu.ejs',{user:req.user,datalistjob:datalistjobs,datahot:datahot});
            })
    })
    });
    // PROFILE SECTION =========================
    app.get('/profile',isLoggedIn, function(req, res,next) {
            apply.find({IdNTV:req.user._id}).exec((err,datajobapply)=>{
                listjob.find({idpost:req.user._id}).exec((err,dataNTDpost)=>{
                    dataNTDpost.forEach(function(item){
                        apply.count({IdJob:item._id}).exec((err,count)=>{
                            listjob.findOneAndUpdate({_id:item._id},{ $set:{"CountApply": count } }).exec((err,result)=>{
                            });
                        })
                    })
                    apply.find({idpost:req.user._id}).exec((err,dataApply)=>{
                        dataApply.forEach(function(item){
                            User.find({_id:item.IdNTV}).exec((err,datainfoNTV)=>{
                                datainfoNTV.forEach(function(item){
                                    apply.find({IdNTV:item._id}).exec((err,dataresult)=>{
                                        dataresult.forEach(function(item){
                                            if(item.EmailNTV=="" ||  item.FullnameNTV==""){
                                                apply.updateMany({IdNTV:item._id},{ $set:{"EmailNTV": item.local.email,"FullnameNTV":item.local.Fullname}})
                                            }
                                        })
                                    })
                                    
                                })
                            })
                        })
             return res.render('Views-Client/profile.ejs',{user : req.user,datajobapply:datajobapply,dataNTDpost:dataNTDpost,dataApply:dataApply});
            })})})
    });
    app.get('/deleteApply:id',isLoggedIn, function(req, res,next) {
        apply.find({_id : req.params.id}).remove(function(err,done){
            if(err){
                return err
            }else{
                res.redirect('/profile?error='+ encodeURIComponent('Incorrect_Credential'))
            }
        })
    })
    app.get('/deleteNewPost:id',isLoggedIn, function(req, res,next) {
        listjob.find({_id : req.params.id,idpost : req.user._id}).remove(function(err,done){
            if(err){
                return err
            }else{
                res.redirect('/profile?error='+ encodeURIComponent('Incorrect_Credential'))
            }
        })
    })
    app.get('/updatetypeaccountNTV:id', isLoggedIn, function(req, res) {
        User.updateOne({_id:req.user._id},{$set:{'local.TypeAccount': "NGƯỜI TÌM VIỆC",'facebook.TypeAccount': "NGƯỜI TÌM VIỆC",'google.TypeAccount': "NGƯỜI TÌM VIỆC"}}).exec((err,result)=>{
            res.redirect('/profile?error='+ encodeURIComponent('Incorrect_Credential'))
    })
    });
    app.get('/updatetypeaccountNTD:id', isLoggedIn, function(req, res) {
        User.updateOne({_id:req.user._id},{$set:{'local.TypeAccount': "NHÀ TUYỂN DỤNG",'facebook.TypeAccount': "NHÀ TUYỂN DỤNG",'google.TypeAccount': "NHÀ TUYỂN DỤNG"}}).exec((err,result)=>{

            res.redirect('/profile?error='+ encodeURIComponent('Incorrect_Credential'))
    })
    });
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/', function(req, res) {
            res.render('Views-Client/loginedit.ejs',{messagee: req.flash('loginMessage') ,message: req.flash('signupMessage') });
        });
        // process the login form
        app.post('/login',passport.authenticate('local-login', {
            successRedirect : 'profile', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
       

        // process the signup form
        app.post('/signup1', passport.authenticate('local-signup1', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
        app.post('/signup2', passport.authenticate('local-signup2', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));


    // google ---------------------------------

        // send to google to do the authentication
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
            passport.authenticate('google', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // locally --------------------------------
        app.get('/connect-local', function(req, res) {
            res.render('connect-local.ejs', { messagee: req.flash('loginMessage'),message: req.flash('loginMessage') });
        });
        app.post('/connect-local', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect-local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook', passport.authorize('facebook', { scope : ['public_profile', 'email'] }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/profile',
                failureRedirect : '/'
            }));

    // google ---------------------------------

        // send to google to do the authentication
        app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

        // the callback after google has authorized the user
        app.get('/connect/google/callback',
            passport.authorize('google', {
                successRedirect : 'profile',
                failureRedirect : '/'
            }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
