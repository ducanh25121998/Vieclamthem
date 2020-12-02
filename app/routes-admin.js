const { fail } = require('assert');
const { title } = require('process');
module.exports = function(app, passport) {
let listjob      = require('../app/models/listjob');
let jobgood      = require('../app/models/jobgood');
let User      = require('../app/models/user');
const moment = require('moment'); 
var multer  = require('multer');
var bcrypt   = require('bcrypt-nodejs');
const fs = require('fs'); 
var path = require('path');
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
                app.get('/404', function(req, res,) {
                    res.render('Views-Admin/404.ejs');
                })
                app.get('/500', function(req, res,) {
                    res.render('Views-Admin/500.ejs');
                })
                app.get('/accordion', function(req, res,) {
                    res.render('Views-Admin/accordion.ejs');
                })
                app.get('/add-course', function(req, res,) {
                    res.render('Views-Admin/add-course.ejs');
                })
                app.get('/add-department', function(req, res,) {
                    listjob.find({}).exec(function (err,datalistjob) {
                        jobgood.find({}).exec(function (err,jobgood) {
                        
                          res.render('Views-Admin/add-department.ejs',{datalistjob:datalistjob,jobgood:jobgood});
                    })
                })
                })
                app.get('/choose-jobgood:id',function(req, res,done) {
                    jobgood.count({}, function( err, sl){
                        if(sl >=18){
                            res.redirect('/add-department?error='+ encodeURIComponent('Incorrect_Credential2'))
                        }else{
                            listjob.find({_id : req.params.id}).exec((err,listjobs)=>{
                                listjobs.forEach(function(item){
                                    newjobgood = jobgood()
                                    newjobgood.IdJob = item._id
                                    newjobgood.linhvuc = item.linhvuc
                                    newjobgood.hinhthuc = item.loaihinh
                                    newjobgood.Namecompany = item.Namecompany
                                    newjobgood.NameJob =item.NameJob
                                    newjobgood.Address =item.Address
                                    newjobgood.Email=item.Email
                                    newjobgood.ImageCompany =item.ImageCompany
                                    newjobgood.STT = 1
                                    newjobgood.save(function(err) {
                                        if (err){
                                            return done(err);
                                        }else{
                                            res.redirect('/add-department?error='+ encodeURIComponent('Incorrect_Credential'))
                                        }         
                                    })  
                                })
                            })        

                        }
                    })
   
                })
                app.get('/delete:id',function(req, res,done) {
                    jobgood.find({_id : req.params.id}).remove(function(err,done){
                        if(err){
                            return err

                        }else{
                            res.redirect('/add-department?error='+ encodeURIComponent('Incorrect_Credential'))
                        }
                    })
                })
                app.get('/add-library-assets.', function(req, res,) {
                    res.render('Views-Admin/add-library-assets..ejs');
                })
                app.get('/add-professor', function(req, res,) {
                    res.render('Views-Admin/add-professor.ejs');
                })
                app.get('/add-student', function(req, res,) {
                    res.render('Views-Admin/add-student.ejs');
                })
                app.get('/advance-form-element', function(req, res,) {
                    res.render('Views-Admin/advance-form-element.ejs');
                })
                app.get('/alerts', function(req, res,) {
                    res.render('Views-Admin/alerts.ejs');
                })
                app.get('/all-courses', function(req, res,) {
                    res.render('Views-Admin/all-courses.ejs');
                })
                app.get('/all-professors', function(req, res,) {
                    res.render('Views-Admin/all-professors.ejs');
                })
                app.get('/all-students', function(req, res,) {
                    res.render('Views-Admin/all-students.ejs');
                })
                app.get('/analytics', function(req, res,) {
                    res.render('Views-Admin/analytics.ejs');
                })
                app.get('/area-charts', function(req, res,) {
                    res.render('Views-Admin/area-charts.ejs');
                })
                app.get('/area-charts', function(req, res,) {
                    res.render('Views-Admin/area-charts.ejs');
                })
                app.get('/bar-charts', function(req, res,) {
                    res.render('Views-Admin/bar-charts.ejs');
                })
                app.get('/basic-form-element', function(req, res,) {
                    res.render('Views-Admin/basic-form-element.ejs');
                })
                app.get('/buttons', function(req, res,) {
                    res.render('Views-Admin/buttons.ejs');
                })
                app.get('/c3', function(req, res,) {
                    res.render('Views-Admin/c3.ejs');
                })
                app.get('/code-editor', function(req, res,) {
                    res.render('Views-Admin/code-editor.ejs');
                })
                app.get('/course-info', function(req, res,) {
                    res.render('Views-Admin/course-info.ejs');
                })
                app.get('/course-payment', function(req, res,) {
                    res.render('Views-Admin/course-payment.ejs');
                })
                app.get('/data-maps', function(req, res,) {
                    res.render('Views-Admin/data-maps.ejs');
                })
                app.get('/data-table', function(req, res,) {
                    res.render('Views-Admin/data-table.ejs');
                })
                app.get('/departments', function(req, res,) {
                    res.render('Views-Admin/departments.ejs');
                })
                app.get('/dual-list-box', function(req, res,) {
                    res.render('Views-Admin/dual-list-box.ejs');
                })
                app.get('/edit-course', function(req, res,) {
                    res.render('Views-Admin/edit-course.ejs');
                })
                app.get('/edit-department', function(req, res,) {
                    res.render('Views-Admin/edit-department.ejs');
                })
                app.get('/edit-library-assets', function(req, res,) {
                    res.render('Views-Admin/edit-library-assets.ejs');
                })
                app.get('/edit-professor', function(req, res,) {
                    res.render('Views-Admin/edit-professor.ejs');
                })
                app.get('/edit-student', function(req, res,) {
                    res.render('Views-Admin/edit-student.ejs');
                })
                app.get('/events', function(req, res,) {
                    res.render('Views-Admin/events.ejs');
                })
                app.get('/google-map', function(req, res,) {
                    res.render('Views-Admin/google-map.ejs');
                })
                app.get('/images-cropper', function(req, res,) {
                    res.render('Views-Admin/images-cropper.ejs');
                })
                app.get('/HomeAdmin', function(req, res,) {
                    res.render('Views-Admin/index.ejs');
                })
                app.get('/library-assets', function(req, res,) {
                    res.render('Views-Admin/library-assets.ejs');
                })
                app.get('/line-charts', function(req, res,) {
                    res.render('Views-Admin/line-charts.ejs');
                })
                app.get('/lock', function(req, res,) {
                    res.render('Views-Admin/lock.ejs');
                })
                app.get('/login', function(req, res,) {
                    res.render('Views-Admin/login.ejs');
                })
                app.get('/mailbox-compose', function(req, res,) {
                    res.render('Views-Admin/mailbox-compose.ejs');
                })
                app.get('/mailbox-view', function(req, res,) {
                    res.render('Views-Admin/mailbox-view.ejs');
                })
                app.get('/mailbox', function(req, res,) {
                    res.render('Views-Admin/mailbox.ejs');
                })
                app.get('/modals', function(req, res,) {
                    res.render('Views-Admin/modals.ejs');
                })
                app.get('/multi-upload', function(req, res,) {
                    res.render('Views-Admin/multi-upload.ejs');
                })
                app.get('/notifications', function(req, res,) {
                    res.render('Views-Admin/notifications.ejs');
                })
                app.get('/password-meter', function(req, res,) {
                    res.render('Views-Admin/password-meter.ejs');
                })
                app.get('/password-recovery', function(req, res,) {
                    res.render('Views-Admin/password-recovery.ejs');
                })
                app.get('/pdf-viewer', function(req, res,) {
                    res.render('Views-Admin/pdf-viewer.ejs');
                })
                app.get('/peity', function(req, res,) {
                    res.render('Views-Admin/peity.ejs');
                })
                app.get('/preloader', function(req, res,) {
                    res.render('Views-Admin/preloader.ejs');
                })
                app.get('/professor-profile', function(req, res,) {
                    res.render('Views-Admin/professor-profile.ejs');
                })
                app.get('/404', function(req, res,) {
                    res.render('Views-Admin/404.ejs');
                })
                app.get('/register', function(req, res,) {
                    res.render('Views-Admin/register.ejs');
                })
                app.get('/rounded-chart', function(req, res,) {
                    res.render('Views-Admin/rounded-chart.ejs');
                })
                app.get('/sparkline', function(req, res,) {
                    res.render('Views-Admin/sparkline.ejs');
                })
                app.get('/static-table', function(req, res,) {
                    res.render('Views-Admin/static-table.ejs');
                })
                app.get('/student-profile', function(req, res,) {
                    res.render('Views-Admin/student-profile.ejs');
                })
                app.get('/tabs', function(req, res,) {
                    res.render('Views-Admin/tabs.ejs');
                })
                app.get('/tinymc', function(req, res,) {
                    res.render('Views-Admin/tinymc.ejs');
                })
                app.get('/tree-view', function(req, res,) {
                    res.render('Views-Admin/tree-view.ejs');
                })
                app.get('/widgets', function(req, res,) {
                    res.render('Views-Admin/widgets.ejs');
                })
                app.get('/x-editable', function(req, res,) {
                    res.render('Views-Admin/x-editable.ejs');
                })
               
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
        app.get('/dangnhap', function(req, res) {
            res.render('Views-Client/loginedit.ejs',{messagee: req.flash('loginMessage') ,message: req.flash('signupMessage') });
        });
        // process the login form
        app.post('/login',passport.authenticate('local-login', {
            successRedirect : 'Views-Client/profile', // redirect to the secure profile section
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
            res.redirect('profile');
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
