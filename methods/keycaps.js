var keycapsData = require('/home/ubuntu/Documents/keyboardapi/data/keycaps.json')
module.exports = {

	execute(router) {      
        router.get('/keycaps', function (req, res) {
			//console.log(req.query.id);
			res.json(keycapsData)
		});
		router.post('/keycaps', function (req, res) {
			res.json({ message: "POSTING!" })
		});
	},
};
