(function() {

    'use strict';

    function dictionary() {
        this['[[db]]'] = {};
    };
    dictionary.prototype.encode = encode;
    dictionary.prototype.decode = decode;
    dictionary.prototype.getDictionary = getDictionary;
    dictionary.prototype.getKey = getKey;
    dictionary.prototype.removeKey = removeKey;
    dictionary.prototype.clear = clear;


    /**
     * 
     * @param {*} dictionary 
     */
    function encode(dictionary) {
        var ret = this['[[db]]'];

        /**
         * 
         * @param {*} obj 
         * @param {*} path 
         */
        function convert(obj, path) {
            path = path || [];
            for (var prop in obj) {
                path.concat(prop);
                if (typeof obj[prop] === "object") {
                    convert(obj[prop], path.concat(prop));
                } else {
                    ret[path.concat(prop).join(".")] = obj[prop];
                }
            }
        }

        convert(dictionary);

        ret = null;
        return this;
    }

    /**
     * 
     * @param {*} dictionary 
     */
    function decode(dictionary) {
        dictionary = dictionary || this['[[db]]'];
        var ret = {};
        /**
         * 
         * @param {*} prop 
         * @param {*} val 
         */
        function convert(prop, val) {
            var prev,
                splt = prop.split('.'),
                last = splt.pop();

            splt.forEach(function(key) {
                if (!prev) {
                    if (!ret[key]) {
                        ret[key] = {}
                    }

                    prev = ret[key];
                } else {
                    if (!prev[key]) {
                        prev[key] = {}
                    }

                    prev = prev[key];
                }
            });

            if (!prev) {
                ret[last] = val;
            } else {
                prev[last] = val;
            }
        }

        for (var prop in dictionary) {
            convert(prop, dictionary[prop]);
        }

        return ret;
    }

    function getDictionary() {
        return this['[[db]]'];
    }

    /**
     * 
     * @param {*} key 
     */
    function getKey(key) {
        return this['[[db]]'][key];
    }

    /**
     * 
     * @param {*} key 
     */
    function removeKey(key) {
        if (this['[[db]]'].hasOwnProperty(key)) {
            delete this['[[db]]'][key];
        }

        return this;
    }

    function clear() {
        this['[[db]]'] = {};
        return this;
    }

})();