module.exports =
    function (server) {
        function registerClosingEvents() {
            process.on('uncaughtException', function (err) {
                console.log('******* UNCAUGHT EXCEPTION **********');
                console.log(err);
                server.close();
            });
            process.on('SIGTERM', function () {
                server.close();
            });
            process.on('SIGINT', function () {
                server.close();
            });
        }
        return registerClosingEvents;
    };
