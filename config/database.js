//config/database.js

const db = require('../models');

async function applyMigrations() {
  try {
    await db.sequelize.sync({
      alter: true
    });
    console.log('Sincronização com o banco de dados realizada.');
  } catch (error) {
    console.error('Erro sincronizando o banco de dados', error);
  }
}

module.exports = {
  applyMigrations,
};
