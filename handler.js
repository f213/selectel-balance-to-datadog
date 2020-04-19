require('dotenv').config();

const getBalance = require('./lib/getBalance');
const postMetric = require('./lib/postMetric');

module.exports.update = async () => {
  const services = await getBalance();
  services.forEach(async ({ service, balance }) => {
    await postMetric(`selectel.balance.${service}`, balance);
  });
};
