require('dotenv').config();
const axios = require('axios').default;

module.exports = (metric, value) => axios({
  url: `https://${process.env.DATADOG_API_HOST}/api/v1/series?api_key=${process.env.DATADOG_API_KEY}`,
  method: 'POST',
  data: {
    series: [{
      metric,
      points: [[
        parseInt(new Date().getTime() / 1000, 10),
        value,
      ]],
    }],
  },
});
