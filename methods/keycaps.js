var pcbs = require('/home/ubuntu/Documents/keyboardapi/data/pcbs.json')
module.exports = {

	execute(router) {      
        router.get('/keycaps', function (req, res) {
			//console.log(req.query.id);
			res.json(pcbs)
		});
		router.post('/keycaps', function (req, res) {
			res.json({ message: "POSTING!" })
		});
	},
};