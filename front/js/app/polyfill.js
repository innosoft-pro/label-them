// Polyfill
if (!Object.create) {
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error(activeLanguage.objectCreateImplementationOnlyAcceptsTheFirstParameter);
        }
        function F() {
        }

        F.prototype = o;
        return new F();
    };
}