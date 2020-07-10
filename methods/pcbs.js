var pcbs = require('/home/ubuntu/Documents/keyboardapi/data/pcbs.json')
module.exports = {

	execute(router) {      
        router.get('/pcbs', function (req, res) {
			//console.log(req.query.id);
			res.json(pcbs)
		});
		router.post('/pcbs', function (req, res) {
			res.json({ message: "POSTED!" })
		});
	},
};
