//import jquery from 'jquery';
import semantic from './Semantic-UI-CSS-master/semantic.js';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

const ngApp = angular.module('ngApp', [uiRouter]);
// including config
require('./app.config')(ngApp);
