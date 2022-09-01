app.controller("LoginController", function ($scope, LoginService) {

    $scope.agencylist = [];
    $scope.GetDashboardDetailsList = function () {
        LoginService.GetDashboardDetailsList().then(function (d) {
            $scope.agencylist = d.data;
        });
    };
    $scope.GetDashboardDetailsList();

}).factory('LoginService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    //fac.SaveFormData = function (data) {
    //    return $http.post("/TrainingPartnerManagement/SaveTraingPartner", data);
    //};
    fac.GetDashboardDetailsList = function () {
        return $http.get("/Home/GetDashboardDetails");
    };
    //fac.updateagencystatus = function (objAgency) {
    //    return $http.post("/Home/updateagencystatus", objAgency);
    //};
    return fac;
});