module.exports = {
	years: function (req, res){
		Utils.getYears('MC', 'bitrates', function(err, results){
			return res.jsonx (results);
		});
	},

	months: function (req, res){
		Utils.getMonths('MC','bitrates', req.param('year'), function(err, results){
			return res.jsonx (results);
		});
	},

	data: function(req, res){
		console.log("Se pide CSV data para: " + req.param('year')+" "+req.param('month'));
		Utils.getData('MC','bitrates', req.param('year'), req.param('month'), function(err, results){
			return res.send(results);
		});	
	}
}
