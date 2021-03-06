(function () {
    function poStorage(name, type) {
        return poStorage.get(name, type);
    }

    poStorage.set = function (name, val) {
        var namespace = window.webclientStorageNamespace || 'po.';
        if (Array.isArray(val) || (val && val.toString() === '[object Object]')) {
            val = JSON.stringify(val);
        }

        localStorage.setItem(namespace + name, val);
    };

    poStorage.get = function (name, type) {
        type = type || "string";

        var namespace = window.webclientStorageNamespace || 'po.';
        var value = localStorage.getItem(namespace + name);
        if (value == null) {
            return value; // undefined
        }

        if (type === "string") {
            return value;
        } else {
            return JSON.parse(value);
        }
    };

    poStorage.remove = function (name) {
        var namespace = window.webclientStorageNamespace || 'po.';
        localStorage.removeItem(namespace + name);
    };

    poStorage.clear = function () {
        localStorage.clear();
    };

    poStorage.length = function () {
        return localStorage.length;
    };

    poStorage.keys = function () {
        var namespace = window.webclientStorageNamespace || 'po.';
        var keys = Object.keys(localStorage), len, i;
        var list = [];
        for (i = 0, len = keys.length; i < len; i += 1) {
            if (keys[i].substr(0, namespace.length) === namespace) {
                list.push(keys[i]);
            }
        }

        return list;
    };

    poStorage.toString = function () {
        return 'poStorage [' + poStorage.keys().map(function (k) { return '"' + k + '"'; }).join(', ') + ']';
    };

    window.poStorage = poStorage;
}());
