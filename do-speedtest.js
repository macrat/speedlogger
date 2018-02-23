const speedtest = require('./speedtest');
const db = require('./database');


speedtest.execute()
	.then(data => {
		console.dir(data);
		return db.put(data);
	})
	.catch(err => console.error(err));
