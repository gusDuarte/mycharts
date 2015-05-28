module.exports = {
	

	getYears: function (customer, chartType, cb){
		var fs = require('fs');
		//var years = ['2015', '2014'];
		fs.readdir('./assets/data/'+customer+'/'+chartType, cb);
  	},

	getMonths: function (customer, chartType, year, cb){
		var fs = require('fs');
		fs.readdir('./assets/data/'+customer+'/'+chartType+'/'+year, cb);
	},

	getData: function (customer, chartType, year, month, cb){
		var fs = require('fs');
		fs.readFile('./assets/data/'+customer+'/'+chartType+'/'+year+'/'+month+'/'+chartType+'.'+year+'.'+month+'.csv', cb);
	},

	get_customer_folder: function (company){
		if (company == 'Nuevosiglo'){
			return 'NS';
		}
		if (company == 'Montecable'){
			return 'MC';
		}
		return 'MC';
	}
}