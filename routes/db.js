const { Pool } = require('pg');

const pool = new Pool({
   user: 'admin',
   host: 'dpg-cl76i2f6e7vc738sr3hg-a.frankfurt-postgres.render.com',
   database: 'labos2',
   password: 'qW1Xrlfxs1C2j2GpNslpG1NK43IeFAm5',
   port: 5432, // Default PostgreSQL port,
   ssl: true
 });

module.exports = pool;