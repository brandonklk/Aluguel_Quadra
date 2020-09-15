const app = require('./app');
const logger = require('./logger/logger');

logger.info("Servidor escutando na porta 3333...")
app.listen(3333);