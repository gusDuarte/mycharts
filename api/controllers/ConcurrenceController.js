module.exports = {
	years: function (req, res){
		Utils.getYears('MC', 'concurrentes', function(err, results){
			return res.jsonx (results);
		});
	},

	months: function (req, res){
		Utils.getMonths('MC','concurrentes', req.param('year'), function(err, results){
			return res.jsonx (results);
		});
	},

	data: function(req, res){
		console.log("Se pide CSV data para: " + req.param('year')+" "+req.param('month'));
		Utils.getData('MC','concurrentes', req.param('year'), req.param('month'), function(err, results){
			if (!err) {
				return res.send(results);
			} else {
				return res.notFound(results);
			}
		});	
	}
}