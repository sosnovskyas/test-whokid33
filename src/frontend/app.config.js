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
            .state('modal', {
                url: "/modal",
                template: require('./templates/pages/modal.html')
            })
            .state('modal.modal1', {
                url: "/modal1",
                onEnter: ['$stateParams', '$state', function ($stateParams, $state, $uibModal) {
                    $('.ui.modal').modal('show');
                }]
            })
        ;
    }
};