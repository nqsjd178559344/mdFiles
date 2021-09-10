self.addEventListener('message', function (e) {
    // console.log('消息已进入', e.data)
    e.waitUntil(self.clients.matchAll().then(function (clients) {
        // console.log(clients, 'clients')
        if (!clients || clients.length === 0) return
        clients.forEach(function (client) {
            client.postMessage(e.data)
        })
    }))
})

// self.addEventListener('activate', event => {
//     clients.claim();
//     console.log('Ready!');
// });