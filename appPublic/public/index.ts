'use strict';

const SOCKET_DIR: string = '/tmp/gaudo-net';
const SOCKET_NAME: string = 'default.sock';

import * as Path from 'path';
import * as Http from 'http';
import * as Filesystem from 'fs';
import * as routes from 'APP/routes';
import * as registerClosingEvents from 'CORE/registerClosingEvents';

import 'CORE/Date';
const createApplication = require('APP/helpers/createApplication');

const app = createApplication(routes);
const server: Http.Server = Http.createServer(app);
server.on('listening', registerClosingEvents(server));

const socketPath : string = Path.join(SOCKET_DIR, SOCKET_NAME);

if (!Filesystem.existsSync(SOCKET_DIR)) {
    Filesystem.mkdirSync(SOCKET_DIR, 755);
}

server.listen(socketPath);
