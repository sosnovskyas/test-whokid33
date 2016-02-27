import angular from 'angular';
import uiRouter from 'angular-ui-router';

const ngApp = angular.module('app', [uiRouter]);

// including config
require('./app.config')(ngApp);
