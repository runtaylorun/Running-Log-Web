module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		minWidth: {
			sm: '300px',
			base: '400px',
			lg: '600px'
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
