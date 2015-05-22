module.exports = {
	

	getYears: function (chartType, cb){
		var fs = require('fs');
		//var years = ['2015', '2014'];
		fs.readdir('./assets/data/'+chartType, cb);
  	},

	getMonths: function (chartType, year, cb){
		var fs = require('fs');
		fs.readdir('./assets/data/'+chartType+'/'+year, cb);
	},

	getData: function (chartType, year, month, cb){
		var fs = require('fs');
		fs.readFile('./assets/data/'+chartType+'/'+year+'/'+month+'/'+chartType+'.'+year+'.'+month+'.csv', cb);
	}
}