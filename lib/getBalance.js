require('dotenv').config();
const axios = require('axios').default;


module.exports = () => axios({
  url: 'https://my.selectel.ru/api/v3/billing/balance',
  headers: {
    'X-Token': process.env.SELECTEL_TOKEN,
  },
}).then(({ data }) => {
  if (data.status !== 'success') {
    return console.error(`Non-ok response from selectel: ${data}`);
  }

  const balance = [];

  Object.keys(data.data).forEach((serviceName) => {
    const service = data.data[serviceName];
    if (service && Object.keys(service).includes('main')) {
      balance.push({
        service: serviceName,
        balance: service.main / 100, // Russian rubles
      });
    }
  });
  return balance;
}).catch((error) => console.error(`Non-ok selectel response: ${error.status}`));
