app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [{
                label: 'Home',
                state: 'home'
            }, {
                label: 'About',
                state: 'about'
            }, {
                label: 'Products',
                state: 'products'
            }, {
                label: 'Instructors',
                state: 'instructor'
            }, {
                label: 'Cart',
                state: 'cart',
                auth: true
            }, {
                label: 'Admin',
                state: 'admin',
                auth: true,
                admin: true
            }

            ];

            // scope.admin = {
            //     label: 'Admin',
            //     state: 'admin'
            // };

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.isAdmin = function() {
                return AuthService.isSuperUser();
            }

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = $rootScope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = $rootScope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});