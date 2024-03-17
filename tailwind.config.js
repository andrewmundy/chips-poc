module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			mobile: { max: '820px' },
			xs: { max: '640px' },
			xxs: { max: '370px' },
		},
		colors: {
			background: 'black',
			foreground: 'white',
			red: "red",
			black: "black",
		},
		extend: {},
	},
	plugins: [],
};
