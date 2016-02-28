'use strict';

module.exports = function (ngApp) {

    // CONFIG define
    ngApp.config(configFn);

    function configFn($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            // home route
            .state('home', {
                url: "/home",
                template: require('./templates/pages/home.html')
            })

            .state('home.modal1', {
                url: "/modal1",
                templateUrl: '/',
                onEnter: ['$stateParams', '$state', function ($stateParams, $state) {
                    $('.ui.modal')
                        .modal({
                            onHide: function () {
                                $state.go('^');
                            }
                        })
                        .modal('show')
                    ;
                }]

            })

            .state('modal', {
                url: "/modal",
                template: require('./templates/pages/modal.html')
            })

            .state('modal.modal1', {
                url: "/modal1",
                templateUrl: '/',
                onEnter: ['$stateParams', '$state', function ($stateParams, $state) {
                    $('.ui.modal')
                        .modal({
                            onHide: function () {
                                $state.go('^');
                            }
                        })
                        .modal('show')
                    ;
                }]

            })
        ;
    }
};