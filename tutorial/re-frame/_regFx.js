let {reFrame: rf, util: {assocIn}} = require('mreframe');


// side-effect alert(arg)
rf.regFx('alert', arg => alert(arg));

// event alert{msg} causes side-effect alert
rf.regEventFx('alert', (cofx, [_, msg]) => ({alert: msg});


let _jsonRequest = response =>
  (response.ok ? response.json() : Promise.reject(response.status));
// downloads JSON from a URL, then evokes passed event with added param
rf.regFx('fetchJson', ({url, params, onSuccess, onFailure}) =>
  fetch(url, params).then(_jsonRequest)
                    .then(data => rf.disp(onSuccess, data))
                    .catch(status => rf.disp(onFailure, status));

// event fetch-json{key, url} causes side-effect fetchJson
rf.regEventFx('fetch-json', ({db}, [_, key, url]) =>
  ({fetchJson: {url,  params: db.params,  onSuccess: ['-fetch-json', key]}}));

// evoked by fetchJson on success
rf.regEventFx('-fetch-json', ({db}, [_, key, data]) =>
  ({db:    assocIn(db, ['cache', key], data),
    alert: "Fetched '" + key + "'!"}));
