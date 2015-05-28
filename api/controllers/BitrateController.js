module.exports = {
	years: function (req, res){

		Utils.getYears(Utils.get_customer_folder(req.session.company), 'bitrates', function(err, results){
			return res.jsonx (results);
		});
	},

	months: function (req, res){
		Utils.getMonths(Utils.get_customer_folder(req.session.company),'bitrates', req.param('year'), function(err, results){
			return res.jsonx (results);
		});
	},

	data: function(req, res){
		Utils.getData(Utils.get_customer_folder(req.session.company),'bitrates', req.param('year'), req.param('month'),
			function(err, results){
				if (!err) {
					return res.send(results);
				} else {
					return res.notFound(results);
				}
			});
	}
}
