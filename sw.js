const staticCacheName = 'resturant-cache';

// install cache
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
      ]).catch(error => {
          console.log('Caching failed');
	  });
    })
	);
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => { // new
        return caches.open(staticCacheName).then(cache => {           // new
          cache.put(event.request, fetchResponse.clone());            // new
          return fetchResponse;                                       // new
        });                                                           // new
      });                                                             // new
    }).catch(error => {
      if (event.request.url.includes('.jpg')) {
        return caches.match('/img/fixed/offline_img1.png');
      }
      return new Response('Not connected to the internet', {
        status: 404,
        statusText: "Not connected to the internet"
      });
    })
  );
});