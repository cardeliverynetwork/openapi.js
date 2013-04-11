var cardeliverynetwork = {}
cardeliverynetwork.openapi = function (apiUrl, apiKey) {
    this._apiUrl = apiUrl;
    this._apiKey = apiKey;
}
cardeliverynetwork.openapi.prototype = {

    createJobs: function (jobs, onSuccess, onFail) {
        var resource = "Jobs";
        call(this._apiUrl, this._apiKey, resource, "POST", onSuccess, onFail, false, jobs);
    },

    getJob: function (id, onSuccess, onFail) {
        var resource = "Jobs/" + id;
        call(this._apiUrl, this._apiKey, resource, "GET", onSuccess, onFail);
    },

    getJobBids: function (id, onSuccess, onFail) {
        var resource = "Jobs/" + id + "/Bids";
        call(this._apiUrl, this._apiKey, resource, "GET", onSuccess, onFail);
    },

    getJobDocuments: function (id, onSuccess, onFail) {
        var resource = "Jobs/" + id + "/Documents";
        call(this._apiUrl, this._apiKey, resource, "GET", onSuccess, onFail);
    },

    getJobHistory: function (id, onSuccess, onFail) {
        var resource = "Jobs/" + id + "/History";
        call(this._apiUrl, this._apiKey, resource, "GET", onSuccess, onFail);
    },

    getJobVehicles: function (id, onSuccess, onFail) {
        var resource = "Jobs/" + id + "/Vehicles";
        call(this._apiUrl, this._apiKey, resource, "GET", onSuccess, onFail);
    },

    getNetworks: function (onSuccess, onFail) {
        var resource = "Networks";
        call(this._apiUrl, this._apiKey, resource, "GET", onSuccess, onFail);
    },

    getNetworkUsers: function (id, onSuccess, onFail) {
        var resource = "Networks/" + id + "/Users";
        call(this._apiUrl, this._apiKey, resource, "GET", onSuccess, onFail);
    }
}

function call(apiUrl, apiKey, resuorce, method, onSuccess, onFail, isUsingRemoteIds, data) {
    var callUrl = apiUrl + "/" + resuorce + "?ApiKey=" + apiKey + "&format=json";
    $.ajax({
        dataType: "json",
        contentType: 'application/json',
        type: method,
        url: callUrl,
        data: stringify(data),
        success: function (responseData) {
            onSuccess(responseData);
        },
        error: function (errorData) {
            onFail(errorData.status, errorData.statusText);
        }
    });
}

function stringify(value, replacer, space) {
    var i;
    gap = '';
    indent = '';
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    } else if (typeof space === 'string') {
        indent = space;
    }
    rep = replacer;
    if (replacer && typeof replacer !== 'function' &&
        (typeof replacer !== 'object' ||
        typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }
    return str('', {
        '': value
    });
};

function str(key, holder) {
    var i,
        k,
        v,
        length,
        mind = gap,
        partial,
        value = holder[key];
    if (value && typeof value === 'object' &&
        typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }
    switch (typeof value) {
		case 'string':
			return quote(value);
		case 'number':
			return isFinite(value) ? String(value) : 'null';
		case 'boolean':
		case 'null':
			return String(value);
		case 'object':
			if (!value) {
				return 'null';
			}
			gap += indent;
			partial = [];
			if (Object.prototype.toString.apply(value) === '[object Array]') {
				length = value.length;
				for (i = 0; i < length; i += 1) {
					partial[i] = str(i, value) || 'null';
				}
				v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
				gap = mind;
				return v;
			}

			if (rep && typeof rep === 'object') {
				length = rep.length;
				for (i = 0; i < length; i += 1) {
					if (typeof rep[i] === 'string') {
						k = rep[i];
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			} else {
				for (k in value) {
					if (Object.prototype.hasOwnProperty.call(value, k)) {
						v = str(k, value);
						if (v) {
							partial.push(quote(k) + (gap ? ': ' : ':') + v);
						}
					}
				}
			}

			v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
			gap = mind;
			return v;
		}
}