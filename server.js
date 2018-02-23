const cron = require('node-cron');
const db = require('./database');
const speedtest = require('./speedtest');

cron.schedule('0 0 * * * *', () => {
	speedtest.execute()
		.then(data => db.put(data))
		.catch(err => console.error(err));
});


const path = require('path');
const express = require('express');
const app = express();

const server = app.listen(process.env.PORT || 3000, () => {
	console.log('listen on ' + server.address().address + ':' + server.address().port);
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/speedlog', (req, res) => {
	db.get()
		.then(data => {
			res.set('content-type', 'application/json');
			res.send(JSON.stringify(data));
		})
		.catch(err => {
			console.error(err);
			res.send('something wrong', 500);
		});
});
