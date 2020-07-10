var stabilizers = require('/home/ubuntu/Documents/keyboardapi/data/stabilizers.json')
module.exports = {

	execute(router) {      
        router.get('/stabilizers', function (req, res) {
			//console.log(req.query.id);
			res.json(stabilizers)
		});
		router.post('/stabilizers', function (req, res) {
			res.json({ message: "POSTED!" })
		});
	},
};
