(function() {
	'use strict';

	angular
		.module('app', [
			'partials',
			'gettext',
			'app.routes'
		])
		.run(runBlock);

	runBlock.$inject = ['gettextCatalog', '$rootScope'];

	function runBlock(gettextCatalog, $rootScope) {
		gettextCatalog.debug = true;

		$rootScope.setLanguage = function(lang) {
			$rootScope.currentLanguage = lang;
			gettextCatalog.setCurrentLanguage(lang);
		};

		$rootScope.setLanguage('es');
	}
})();
