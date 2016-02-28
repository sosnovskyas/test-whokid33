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
                templateUrl: './templates/pages/home.html'
            })

            .state('home.modal', {
                url: "/:id",
                onEnter: ['$stateParams', '$state', function ($stateParams, $state) {
                    let modalWindow = $('.ui.modal');

                    modalWindow
                        .modal({
                            onHide: function () {
                                // after close modal go back to previous route
                                $state.go('^');
                                console.log('onHide');
                            },
                            onShow: function () {
                                // loading data
                                $.ajax({
                                    url: './templates/content/' + $stateParams.id + '.html',
                                    statusCode: {
                                        // if content page not exist
                                        404: function () {
                                            modalWindow.
                                                children('.content').html('<div class="ui red message">Sorry, but content file not found!</div>');
                                        }
                                    }
                                }).done(function (data) {
                                    // load data from content file
                                    modalWindow.children('.content').html(data);
                                });
                            }
                        })
                        .modal('show');

                    console.log('modal');
                }],
                onExit: function () {
                }
            })
            // help route
            .state('help', {
                url: "/help",
                template: require('./templates/pages/help.html')
            })
        ;
    }
};