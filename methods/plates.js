var plates = require('/home/ubuntu/Documents/keyboardapi/data/plates.json')
module.exports = {

	execute(router) {      
        router.get('/plates', function (req, res) {
			//console.log(req.query.id);
			res.json(plates)
		});
		router.post('/plates', function (req, res) {
			res.json({ message: "POSTED!" })
		});
	},
};
