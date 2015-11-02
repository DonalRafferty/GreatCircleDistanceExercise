'use strict';

module.exports = {
	app: {
		title: 'great-circle-distance',
		description: 'Portal piece for the HPIM',
		keywords: ''
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/fontawesome/css/font-awesome.min.css',
				'public/lib/angular-chart.js/angular-chart.min.css',
                'public/lib/angular-xeditable/dist/css/xeditable.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/Chart.js/Chart.js',
				'public/lib/angular-chart.js/angular-chart.js',
                'public/lib/angular-xeditable/dist/js/xeditable.min.js',
                'public/lib/angular-relative-date/angular-relative-date.min.js',
				'public/lib/angular-spinners/dist/angular-spinners.min.js',
				'public/lib/angular-utils-pagination/dirPagination.js',
                'public/lib/angular-cookies/angular-cookies.min.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
