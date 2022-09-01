app.controller("DistrictMasterController", function ($scope, DistrictService) {

    $scope.agencylist = [];
    $scope.GetAllDistrictList = function () {
        DistrictService.GetAllDistrictList().then(function (d) {
            $scope.agencylist = d.data;
        });
    }
    $scope.GetAllDistrictList();



    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.IsAdd = false;
    }
    function ClearForm() {
        $scope.Agency = {
            Id: 0,
            name: '',
            StateId:0
        };

    }
    ClearForm();
    //formControlValidation();
    $scope.Edit = function (item, mode) {
        if (mode == "Edit") {
            $scope.isViewMode = false;
        }
        else {
            $scope.isViewMode = true;
        }

        $scope.Agency = {
            ID: item.ID,
            name: item.Name,
            StateId:item.StateId
        };


    }
    $scope.SaveDetails = function () {
        if (ValidateFrom()) {
            DistrictService.SaveFormData($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllDistrictList();
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
        if ($scope.Agency.StateId === "" || $scope.Agency.StateId === 0 || $scope.Agency.StateId === undefined) {
            errorMsg += "Please select State Name.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.Agency.name)) {
            errorMsg += "Please Enter District Name.<br/>";
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

            DistrictService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllDistrictList();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }
    $scope.StateList = [];
    $scope.BindStateDropdown = function () {
        DistrictService.BindStateDropdownList('State',0).then(function (d) {
            $scope.StateList = d.data;
        });
    }
    $scope.BindStateDropdown();


}).factory('DistrictService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/Master/SaveDistrictDetails", data);
    };
    fac.GetAllDistrictList = function () {
        return $http.get("/Master/GetAllDistrictList");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    fac.BindStateDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    return fac;
});