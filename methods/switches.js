var switches = require('/home/ubuntu/Documents/keyboardapi/data/switches.json')
module.exports = {

	execute(router) {      
        router.get('/switches', function (req, res) {
			//console.log(req.query.id);
			res.json(switches)
		});
		router.post('/switches', function (req, res) {
			res.json({ message: "POSTED!" })
		});
	},
};
