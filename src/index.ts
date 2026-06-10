import dotenv from 'dotenv';
dotenv.config();

import server from './server';
import colors from 'colors';

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(colors.blue(`Servidor funcionando en http://localhost:${port}`));
});