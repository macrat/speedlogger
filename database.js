const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.DATABASE || 'speedlog.sqlite3');


db.run('CREATE TABLE IF NOT EXISTS speedlog (started TIMESTAMP PRIMARY KEY, ended TIMESTAMP NOT NULL, download REAL NOT NULL, upload REAL NOT NULL, client INTEGER NOT NULL, server INTEGER NOT NULL, ping REAL NOT NULL)');


module.exports.put = function(data) {
	return new Promise((resolve, reject) => {
		db.run('INSERT INTO speedlog VALUES (?, ?, ?, ?, ?, ?, ?)', [data.started, data.ended, data.download, data.upload, data.client, data.server, data.ping], err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}


module.exports.get = function() {
	return new Promise((resolve, reject) => {
		db.all('SELECT * FROM speedlog', (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows.map(x => {
					x.started = new Date(x.started);
					x.ended = new Date(x.ended);
					return x;
				}));
			}
		});
	});
}
