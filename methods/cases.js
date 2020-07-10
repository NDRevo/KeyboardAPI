var cases = require('/home/ubuntu/Documents/keyboardapi/data/cases.json')
module.exports = {

	execute(router) {      
        router.get('/cases', function (req, res) {
			//console.log(req.query.id);
			res.json(cases)
		});
		router.post('/cases', function (req, res) {
			res.json({ message: "POSTED!" })
		});
	},
};
