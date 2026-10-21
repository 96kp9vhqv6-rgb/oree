/* Orée · cache hors-ligne. Mettre à jour la version à chaque publication. */
var V='oree-v106';
var CORE=['./','index.html','pro-manifest.json','pro-manifest-discret.json','pro-icon-192.png','pro-icon-512.png','pro-icon-neutre-192.png','pro-icon-neutre-512.png','pro-icon-neutre-180.png','i18n-en.json','i18n-ar.json','i18n-es.json','i18n-pt.json','i18n-ro.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  var u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){
    var net=fetch(e.request).then(function(res){if(res&&res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(e.request,cp);});}return res;}).catch(function(){return r;});
    return r||net;
  }));
});
