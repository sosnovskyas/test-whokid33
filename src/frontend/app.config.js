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
                onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                    $uibModal
                        // for open
                        .open({
                            template: require('./templates/pages/modal1.html'),
                            controller: ['$scope', function ($scope, item) {
                                $scope.ok = function () {
                                    $scope.$dismiss();
                                };

                                $scope.save = function () {
                                    item.update().then(function () {
                                        $scope.$close(true);
                                    });
                                };
                            }]
                        })
                        // after close
                        .result.finally(function () {
                            $state.go('^');
                        });
                }]
            })
        ;
    }
};