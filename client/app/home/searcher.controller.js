(function(){
	'use strict';

	angular
		.module('app')
		.controller('Searcher', Searcher);

	function Searcher(){
		var vm = this;

		vm.query = '';

		vm.list = [
			'Item 1',
			'Item 2',
			'Item 3',
			'Item 4',
			'Item 5',
			'Item 6',
			'Item 7',
			'Item 8',
			'Item 9',
			'Item 10',
			'Item 11',
			'Item 12',
			'Item 13'
		];
	}
})();
