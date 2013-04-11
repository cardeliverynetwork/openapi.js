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

    createJob: function (job, onSuccess, onFail) {
        this.createJobs([job], function (responseData) {
            onSuccess(responseData[0]);
        }, onFail);
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
cardeliverynetwork.Job = function () {
    this.Notes = "",
    this.CustomerReference = "",
    this.Customer = {
        AddressLines: "",
        City: ""
    }
    this.Pickup = {
        Destination: {
            AddressLines: "",
            City: "",
        },
        RequestedDate: null,
        RequestedDateIsExact: false
    },
    this.Dropoff = {
        Destination: {
            AddressLines: "",
            City: ""
        },
        RequestedDate: null,
        RequestedDateIsExact: false
    },
    this.Vehicles = [{}]
}

function call(apiUrl, apiKey, resuorce, method, onSuccess, onFail, isUsingRemoteIds, data) {
    var callUrl = apiUrl + "/" + resuorce + "?ApiKey=" + apiKey + "&format=json";
    $.ajax({
        dataType: "json",
        contentType: 'application/json',
        type: method,
        url: callUrl,
        data: JSON.stringify(data),
        success: function (responseData) {
            onSuccess(responseData);
        },
        error: function (errorData) {
            onFail(errorData.status, errorData.statusText);
        }
    });
}