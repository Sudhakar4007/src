app.controller("UpdateEndStatusController", function ($scope, UpdateEndStatusService) {

    $scope.updateAssessmentlist = [];
    $scope.GetAllEndedAssessmentDetails = function () {
        UpdateEndStatusService.GetAllEndedAssessmentDetails().then(function (d) {
            $scope.updateEndStatuslist = d.data;
        });
    }
    $scope.GetAllEndedAssessmentDetails();



    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.isViewMode1 = false;
    }
    function ClearForm() {
        $scope.Agency = {           
            PreferedAssessmentDate: '',
            BatchName: '',
            EndAssessmentStatus: '',
        };
        $scope.isViewMode = false;
        $scope.isViewMode1 = false;
    }
    ClearForm();
    $scope.isViewMode1 = false;
    $scope.Edit = function (item, mode) {
        if (mode == "Edit") {
            $scope.isViewMode = false;
            $scope.isViewMode1 = true;
        }
        else {
            $scope.isViewMode = true;
        }

        $scope.Agency = {
            Id: item.Id,
            PreferedAssessmentDate: item.PreferedAssessmentDate,
            BatchName: item.BatchName,
            EndAssessmentStatus: item.EndAssessmentStatus,
        };


    }
    $scope.SaveDetails = function () {
        if (ValidateFrom()) {
            UpdateEndStatusService.UpdateEndAssessmentStatus($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllEndedAssessmentDetails();
                    ClearForm();
                }
                else {
                    alertify.error(d.data.msg);
                    //$scope.IsAdd = true;
                }
            }, function (error) {

            });
        }
    }
    function ValidateFrom() {
        var IsValid = true;
        var errorMsg = "";
        if ($scope.Agency.EndAssessmentStatus === "" || $scope.Agency.EndAssessmentStatus === undefined) {
            errorMsg += "Please enter End Assessment Status.<br/>";
            IsValid = false;
        }     
        if (!IsValid)
            alertify.error(errorMsg);
        return IsValid;
    }

    $scope.OperactionAgency = function (item, action) {
        alertify.confirm(action + ' Record', 'Are you sure want to ' + action + ' this record?', function () {
            $scope.StatusEntity = {
                ID: item,
                Action: action,
                Type: 'DISTRICT'
            };

            UpdateEndStatusService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllEndedAssessmentDetails();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }
 


}).factory('UpdateEndStatusService', function ($http, $window) { 
    var fac = {};
    fac.UpdateEndAssessmentStatus = function (data) {
        return $http.post("/AgencyManagement/UpdateEndAssessmentStatus", data);
    };
    fac.GetAllEndedAssessmentDetails = function () {
        return $http.get("/AgencyManagement/GetAllEndedAssessmentDetails");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    return fac;
});