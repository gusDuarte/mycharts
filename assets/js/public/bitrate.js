angular.module('BitrateModule', []);
angular.module('BitrateModule').controller('BitrateController', ['$scope', '$http', function($scope, $http){
	$scope.monthChoose = 0;
	$scope.yearChoose = false;
	$scope.csvData = false;

	$http.get('/bitrate/years').
      success(function(data, status, headers, config) {
      	console.log("Years OK: " + data);
        $scope.years = data;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("Years ERROR: " + data);
        $scope.years = '';
      })

      $scope.choiceMonth = function(month){
      	console.log("Month choose: " + month);
      	$scope.monthChoose = month;
      	if ($scope.yearChoose){
      		getData();
      	}
      }

      $scope.choiceYear = function(year){
      	console.log("Year choose: " + year);
      	$scope.yearChoose = year;
      	$http.get('/bitrate/months?year=' + $scope.yearChoose).
      		success(function(data, status, headers, config) {
        	$scope.months = data;
      	}).
      	error(function(data, status, headers, config) {
        	// called asynchronously if an error occurs
        	// or server returns response with an error status.
        $scope.months = '';
      	})
      }

      getData = function(){
      	$http.get('/bitrate/data?'+'year='+ $scope.yearChoose + '&month=' + $scope.monthChoose).
      		success(function(data, status, headers, config) {
      		console.log("CSV: "+data);	
        	$scope.csvData = data;
      	}).
      	error(function(data, status, headers, config) {
        	// called asynchronously if an error occurs
        	// or server returns response with an error status.
        	$scope.csvData = '';
        	console.log("CSV error: "+data);
      	})
      }
}]);