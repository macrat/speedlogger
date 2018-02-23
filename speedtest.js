const speedTest = require('speedtest-net');


module.exports.execute = function() {
	return new Promise((resolve, reject) => {
		const started = new Date();
		const test = speedTest({maxTime: 5000});
		test.on('data', data => {
			resolve({
				started: started,
				ended: new Date(),
				download: data.speeds.download,
				upload: data.speeds.upload,
				client: data.client.ip,
				server: Number(data.server.id),
				ping: data.server.ping,
				_raw: data,
			});
		});
		test.on('error', reject);
	});
}
