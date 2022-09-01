app.controller("UpdateRefKeyController", function ($scope, UpdateRefKeyService) {

    $scope.updateAssessmentlist = [];
    $scope.GetAllAssessorRefKeyList = function () {
        UpdateRefKeyService.GetAllAssessorRefKeyList().then(function (d) {
            $scope.updateEndStatuslist = d.data;
        });
    }
    $scope.GetAllAssessorRefKeyList();



    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.isViewMode1 = false;
    }
    function ClearForm() {
        $scope.Agency = {
            Id:0,
            Email: '',
            RefKey: '',
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
            Id: item.ID,
            Email: item.Email,
            RefKey: item.RefKey,
        };


    }
    $scope.SaveDetails = function () {
        if (ValidateFrom()) {
            UpdateRefKeyService.UpdateReferenceKey($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllAssessorRefKeyList();
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
        if ($scope.Agency.Email === "" || $scope.Agency.Email === undefined) {
            errorMsg += "Please enter Email.<br/>";
            IsValid = false;
        }  
        if ($scope.Agency.RefKey === "" || $scope.Agency.RefKey === undefined) {
            errorMsg += "Please enter Reference Key.<br/>";
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

            UpdateRefKeyService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllAssessorRefKeyList();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }
 


}).factory('UpdateRefKeyService', function ($http, $window) { 
    var fac = {};
    fac.UpdateReferenceKey = function (data) {
        return $http.post("/AgencyManagement/UpdateReferenceKey", data);
    };
    fac.GetAllAssessorRefKeyList = function () {
        return $http.get("/AgencyManagement/GetAllAssessorRefKeyList");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    return fac;
});