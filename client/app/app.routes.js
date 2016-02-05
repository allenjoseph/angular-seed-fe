(function(){
	'use strict';

	angular
		.module('app.routes', [
			'ui.router'
		])
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider){

		$urlRouterProvider
			.otherwise('/');

		$stateProvider
			.state('body', {
				abstract: true,
				templateUrl: 'layout/body.html'
			})
			.state('body.layout', {
				abstract: true,
				views: {
					'header@body': { templateUrl: 'layout/header.html' },
					'footer@body': { templateUrl: 'layout/footer.html' }
				}
			})
			.state('home', {
				parent: 'body.layout',
				url: '*path',
				views: {
					'@body': {
						controller: 'Searcher as searcher',
						templateUrl: 'home/search.html'
					},
					'results@home': {
						templateUrl: 'home/results.html'
					}
				}
			});
	}
})();
