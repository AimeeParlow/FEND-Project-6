//SW will be registered when the page loaded

if (navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js')
	.then(registration => {
		console.log('SW registered.', registration.scope);
	}).catch(error => {
		console.log('Registration failed!');
	});
}