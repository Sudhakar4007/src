app.controller("DashboardController", function ($scope, DashboardService) {

     // List For Stats SSC
    $scope.SSClist = [];
    $scope.GetSSCDashboardDetails = function () {
        DashboardService.GetSSCDashboardDetails().then(function (d) {
            $scope.SSClist = d.data;
        });
    };
    $scope.GetSSCDashboardDetails();

    // List For Stats Agency and Admin
    $scope.agencylist = [];
    $scope.GetDashboardDetailsList = function () {
        DashboardService.GetDashboardDetailsList().then(function (d) {
            $scope.agencylist = d.data;
        });
    };
    $scope.GetDashboardDetailsList();

    // List For Grid
    $scope.AssessmentList = [];
    $scope.GetAllAssessmentDashboardDetail = function () {
        debugger;
        DashboardService.GetAllAssessmentDashboardDetailList().then(function (d) {
            $scope.AssessmentList = d.data;
            $scope.Assemnt = d.data;
        });
    };

    $scope.GetAllAssessmentDashboardDetail();

    $scope.DashboardList = [];   
    $scope.GetDashboardChartDetails = function () {
        DashboardService.GetDashboardChartDataList().then(function (d) {
            $scope.DashboardList = d.data;
                $scope.myDataSource.dataset = [];   // Reinitialize dataset 
                $scope.myDataSource.categories[0].category = [];   // Reinitialize dataset 

                var dataSetObj1 = {
                    seriesname: "Completed",
                    data: [],
                    color: '#ffa500'//orange
                };
                var dataSetObj2 = {
                    seriesname: "Pending",
                    data: [],
                    color: '#00adff'//blue
                };
                var dataSetObj3 = {
                    seriesname: "Upcoming",
                    data: [],
                    color: '#e2d811' //yellow
                };
                var dataSetObj4 = {
                    seriesname: "Inprogress",
                    data: [],
                    color: '#188063'//green
                };
                angular.forEach($scope.DashboardList, function (value, key) {
                    var categoryArr = {
                        label: value.label,
                    };

                    var dataArr1 = {
                        value: value.Completed,
                        color: '#ffa500'//orange
                    };
                    var dataArr2 = {
                        value: value.Pending,
                        color: '#00adff'//blue
                    };
                    var dataArr3 = {
                        value: value.Upcoming,
                        color: '#e2d811' //yellow
                    };
                    var dataArr4 = {
                        value: value.Inprogress,
                        color: '#188063'//green

                    };   
                    dataSetObj1.data.push(dataArr1);
                    dataSetObj2.data.push(dataArr2);
                    dataSetObj3.data.push(dataArr3);
                    dataSetObj4.data.push(dataArr4);

                    $scope.myDataSource.categories[0].category.push(categoryArr);
                });
                $scope.myDataSource.dataset.push(dataSetObj1);
                $scope.myDataSource.dataset.push(dataSetObj2);
                $scope.myDataSource.dataset.push(dataSetObj3);
                $scope.myDataSource.dataset.push(dataSetObj4);
            })
    }

    //$scope.myDataSource = {
    //    chart: {
    //        plottooltext: "Number Of $seriesName in $label are $dataValue",
    //        theme: "fusion",
    //        "rotateValues": "0",
    //        "showValues": "1"
    //    },
    //    categories: [
    //        {
    //            category: []
    //        }
    //    ],
    //    data: []
    //};

    $scope.myDataSource = {
        chart: {
            plottooltext: "Number Of $seriesName in $label are $dataValue",
            theme: "zune",
            "rotateValues": "0",
            "showValues": "1"
        },
        categories: [
            {
                category: []
            }
        ],
        dataset: []
    };


    $scope.GetDashboardChartDetails();

}).factory('DashboardService', function ($http, $window) { 
    var fac = {};
    //fac.SaveFormData = function (data) {
    //    return $http.post("/TrainingPartnerManagement/SaveTraingPartner", data);
    //};
    fac.GetDashboardDetailsList = function () {
        return $http.get("/Home/GetDashboardDetails");
    };
    fac.GetSSCDashboardDetails = function () {
        return $http.get("/Home/GetSSCDashboardDetails");
    };
    fac.GetAllAssessmentDashboardDetailList = function () {
        return $http.get("/AssessmentManagement/GetAllAssessmentDashboardDetailList");
    };
    fac.GetDashboardChartDataList = function () {
        return $http.get("/Home/GetDashboardChartDataList");
    };
    return fac;
});