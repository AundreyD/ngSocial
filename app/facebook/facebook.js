/**
 * Created by miralemcebic on 05/02/16.
 */
'use strict';

angular.module('ngsocial.facebook', ['ngRoute', 'ngFacebook'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/facebook', {
            templateUrl: 'facebook/facebook.html',
            controller: 'FacebookCtrl'
        });
    }])

    .config(['$facebookProvider', function($facebookProvider) {
        $facebookProvider.setAppId('');
        $facebookProvider.setPermissions('email, public_profile, user_posts, user_photos, publish_actions');
    }])

    .run(function( $rootScope ) {
        // Cut and paste the "Load the SDK" code from the facebook javascript sdk page.
        // Load the facebook SDK asynchronously

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    })

    .controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
        
        $scope.isLoggedIn = false;
        
        $scope.login = function() {
            $facebook.login().then(function() {
               console.log('Logged in'); 
                $scope.isLoggedIn = true;
                refresh();
            });
        }
        
        $scope.logout = function() {
            $facebook.logout().then(function() {
               console.log('Logged out'); 
                $scope.isLoggedIn = false;
                refresh();
            });
        }
        
        function refresh() {
            $facebook.api("/me").then(function(response){
                $scope.welcomeMsg = "Welcome " + response.name;
                $scope.isLoggedIn = true;
                $scope.userInfo = response;
                console.log("userInfo-response " + response)
                console.log("userInfo-response: first_name " + response.first_name)
                
                $facebook.api("/me/picture").then(function(respnse){
                    $scope.picutre = respnse.data.url;
                    
                    $facebook.api("/me/permissions").then(function(response){
                        $scope.permissions = response.data;
                        console.log("permissions-response " + response.data)
                        
                        $facebook.api("/me/posts").then(function(response) {
                            $scope.posts = response.data;
                            console.log("post-response " + response.data)
                        });
                    });
                });
            }, 
            function(error){
                $scope.welcomeMsg = "Please Log in";   
            });
        }
        
        refresh();
    }]);