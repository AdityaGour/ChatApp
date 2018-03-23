angular.module("demo", ["firebase", "ngRoute"])
    .config(config)
    .controller("chatappCtrl", chatappCtrl)
    .controller("homeCtrl",homeCtrl)
    

function config($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"login.html",
        controller:"chatappCtrl",
        controllerAs:"chat"
    })
    .when("/home",{
        templateUrl:"home.html",
        controller:"homeCtrl",
        controllerAs:"home"
    })
    .otherwise({redirectTo:"/"})

}

function chatappCtrl($firebaseArray, $firebaseAuth,$location) {
    chat = this;


    var rootref = firebase.database().ref();
    chat.tasks = $firebaseArray(rootref);
    var auth = $firebaseAuth();
    

    // chat.addTask = function () {
    //     var d = new Date()
    //     var obj = { id: d.getTime(), name: chat.message, status: false }
    //     chat.tasks.$add(obj)

    //     console.log(chat.tasks)
    //     chat.message = ""
    // }
    // chat.popTask = function () {
    //     chat.tasks.pop()
    //     console.log(chat.tasks)
    // }

    // chat.delTask = function (id) {

    //     chat.tasks.splice(fetchIndex(id), 1)
    //     console.log(chat.tasks)
    // }



    // function fetchIndex(id) {
    //     var index;

    //     for (i = 0; i < chat.tasks.length; i++) {
    //         if (chat.tasks[i].id == id) {
    //             index = i;
    //         }
    //     }
    //     return index
    // }
    chat.googlelogin = function () {
        auth.$signInWithPopup("google").then(function (result) {
            console.log("Signed in as:", result.user.displayName);
            console.log("Signed in as:", result.user.photoURL)
            chat.name = result.user.displayName;

            $location.path("/home")


        }).catch(function (error) {
            console.log("Authentication failed:", error);
        });

    }

    chat.facebooklogin = function () {
        auth.$signInWithPopup("facebook").then(function (result) {
            console.log("Signed in as:", result);
            $location.path("/home")

        }).catch(function (error) {
            console.log("Authentication failed:", error);
        });

    }
    chat.save = function () {
        var user = auth.$getAuth();

        if (user) {
            console.log("Signed in as:", user.uid);
        } else {
            console.log("Signed out");
        }
    }
    chat.save();
    // chat.googlelogin = function () {
    //     auth.$signInWithRedirect("google").then(function (result) {
    //         console.log("Signed in as:", result.uid);
    //         // Never called because of page redirect
    //         // Instead, use $onAuthStateChanged() to detect successful authentication
    //     }).catch(function (error) {
    //         console.error("Authentication failed:", error);
    //     });
    // }


}

function homeCtrl($firebaseArray){
  var home = this;
    console.log(home)
    var rootref = firebase.database().ref();
    home.tasks = $firebaseArray(rootref);

    home.addTask = function () {
        var d = new Date()
        var obj = { id: d.getTime(), name: home.message, status: false }
        chat.tasks.$add(obj)

        console.log(home.tasks)
        home.message = ""
    }
}



