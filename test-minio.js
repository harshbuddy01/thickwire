const axios = require('axios');
axios.get('https://bucket-production-6fef.up.railway.app/streamkart-assets')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
