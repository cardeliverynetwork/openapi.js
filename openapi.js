var cardeliverynetwork = {}
cardeliverynetwork.openapi = function (apiUrl, apiKey) {
    this._apiUrl = apiUrl;
    this._apiKey = apiKey;
}
cardeliverynetwork.openapi.prototype = {

    createJobs: function (jobs, success, fail) {
        this.call("POST", "Jobs", success, fail, false, jobs);
    },

    createJob: function (job, success, fail) {
        this.createJobs([job], function (responseData) {
            success(responseData[0]);
        }, fail);
    },

    getJob: function (id, success, fail) {
        this.call("GET", "Jobs/" + id, success, fail);
    },

    getJobBids: function (id, success, fail) {
        this.call("GET", "Jobs/" + id + "/Bids", success, fail);
    },

    getJobDocuments: function (id, success, fail) {
        this.call("GET", "Jobs/" + id + "/Documents", success, fail);
    },

    getJobHistory: function (id, success, fail) {
        this.call("GET", "Jobs/" + id + "/History", success, fail);
    },

    getJobVehicles: function (id, success, fail) {
        this.call("GET", "Jobs/" + id + "/Vehicles", success, fail);
    },

    getNetworks: function (success, fail) {
        this.call("GET", "Networks", success, fail);
    },

    getNetworkUsers: function (id, success, fail) {
        this.call("GET", "Networks/" + id + "/Users", success, fail);
    },
    
    call: function (method, resuorce, success, fail, isUsingRemoteIds, data) {
        $.ajax({
            dataType: "json",
            contentType: 'application/json',
            type: method,
            url: this._apiUrl + "/" + resuorce + "?ApiKey=" + this._apiKey + "&format=json",
            data: JSON.stringify(data),
            success: success,
            error: function (errorData) {
                fail(errorData.status, errorData.statusText);
            }
        });
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