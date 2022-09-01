app.controller("LayoutController", function ($scope, LayoutService) {

    // for Layout
    $scope.agencylist = [];
    $scope.GetLayoutDetails = function () {
        LayoutService.GetLayoutDetails().then(function (d) {
            $scope.agencylist = d.data;
        });
    };
    $scope.GetLayoutDetails();

}).factory('LayoutService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    //fac.SaveFormData = function (data) {
    //    return $http.post("/TrainingPartnerManagement/SaveTraingPartner", data);
    //};
    fac.GetLayoutDetails = function () {
        return $http.get("/Home/GetLayoutDetails");
    };
    //fac.updateagencystatus = function (objAgency) {
    //    return $http.post("/Home/updateagencystatus", objAgency);
    //};
    return fac;
});