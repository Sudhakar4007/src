app.controller("UpdateAssessmentController", function ($scope, UpdateAssessmentService) {

    $scope.updateAssessmentlist = [];
    $scope.GetAssessmentToUpdate = function () {
        UpdateAssessmentService.GetAssessmentToUpdate().then(function (d) {
            $scope.updateAssessmentlist = d.data;
        });
    }
    $scope.GetAssessmentToUpdate();



    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.isViewMode1 = false;
    }
    function ClearForm() {
        $scope.Agency = {
           
            PreferedAssessmentDate: '',
            BatchName: '',
            Latitude: '',
            Longitude: ''
        };

    }
    ClearForm();
    //formControlValidation();
    $scope.isViewMode1 = false;
    $scope.Edit = function (item, mode) {
        debugger;
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
            Latitude: item.Latitude,
            Longitude: item.Longitude
        };


    }
    $scope.SaveDetails = function () {
        var now = new Date($scope.Agency.PreferedAssessmentDate);
        var dateString = moment(now).format('YYYY-MM-DD');
        $scope.Agency.PreferedAssessmentDate = dateString;
        if (ValidateFrom()) {
            UpdateAssessmentService.SaveUpdatedAssessment($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAssessmentToUpdate();
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
        if ($scope.Agency.PreferedAssessmentDate === "" || $scope.Agency.PreferedAssessmentDate === undefined) {
            errorMsg += "Please enter PreferedAssessmentDate.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.Agency.Latitude)) {
            errorMsg += "Please Enter Latitude.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.Agency.Longitude)) {
            errorMsg += "Please Enter Longitude.<br/>";
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

            UpdateAssessmentService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAssessmentToUpdate();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }
    $scope.StateList = [];
    $scope.BindStateDropdown = function () {
        UpdateAssessmentService.BindStateDropdownList('State',0).then(function (d) {
            $scope.StateList = d.data;
        });
    }
    $scope.BindStateDropdown();


}).factory('UpdateAssessmentService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveUpdatedAssessment = function (data) {
        return $http.post("/AgencyManagement/SaveUpdatedAssessment", data);
    };
    fac.GetAssessmentToUpdate = function () {
        return $http.get("/AgencyManagement/GetAssessmentToUpdate");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    fac.BindStateDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    return fac;
});