const staticCacheName = 'resturant-cache-01';

//install cache
self.addEventListener('install', function(event) {
	console.log('Install SW');
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			console.log('Cache all files');
			return cache.addAll([
				'index.html',
				'restaurant.html',
				'css/styles.css',
				'css/responsive.css',
				'js/dbhelper.js',
				'js/main.js',
				'js/restaurant_info.js',
				'data/restaurants.json',
				'img/1.jpg',
				'img/2.jpg',
				'img/3.jpg',
				'img/4.jpg',
				'img/5.jpg',
				'img/6.jpg',
				'img/7.jpg',
				'img/8.jpg',
				'img/9.jpg',
				'img/10.jpg'
			]).catch(function(error) {
				console.log('Caching failed');
			});
		})
	);
});



//Fetch or return cached data
self.addEventListener('fetch', function(fetchEvent) {
	console.log('fetching');
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(function(response) {
			return response || fetch(fetchEvent.request).then(function(fetchResponse) {
				return caches.open(staticCacheName).then(function(cache) {
					cache.put(fetchEvent.request, fetchResponse.clone());
					return fetchResponse;
				});
			});
		}).catch(function(error) {
		console.log('no internet connection!');
		})
	);
})


//delete old cache
self.addEventListener('activate', function(activateEvent) {
	activateEvent.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startsWith('resturant-') &&
					cacheName !== staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});