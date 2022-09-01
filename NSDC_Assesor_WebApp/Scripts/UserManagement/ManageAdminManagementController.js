app.controller("ManageAdminManagementController", function ($scope, AdminService) {

    $scope.agencylist = [];
    $scope.GetAllAdminList = function () {
        AdminService.GetAllAdminList().then(function (d) {
            $scope.agencylist = d.data;
        });
    };
    $scope.GetAllAdminList();

    $scope.isEditMode = false;
    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.isEditMode = false;
        $scope.IsAdd = false;
    }
    function ClearForm() {
        $scope.User = {
            Id: 0,
            Name: '',
            Email: '',
            Mobile: ''
            
        };
        $scope.isEditMode = false;
    }
    ClearForm();
    formControlValidation();
    $scope.Edit = function (item, mode) {
        if (mode == "Edit") {
            $scope.isViewMode = false;
            $scope.isEditMode = true;
        }
        else {
            $scope.isViewMode = true;
        }

        $scope.User = {
            ID: item.ID,
            Name: item.Name,
            Email: item.Email,
            Mobile: item.Mobile
        };


    };
    $scope.SaveDetails = function () {
        if (ValidateFrom()) {
        AdminService.SaveFormData($scope.User).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllAdminList();
                    ClearForm();
                }
                else {
                    alertify.error(d.data.msg);
                    //$scope.IsAdd = true;
                }
            }, function (error) {

            });
        }
    };
    function ValidateFrom() {
        var IsValid = true;
        var errorMsg = "";
        if (isEmpty($scope.User.Name)) {
            errorMsg += "Please Enter User Name.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.Email)) {
            errorMsg += "Please Enter User Email.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.Mobile)) {
            errorMsg += "Please Enter User Mobile.<br/>";
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
                Type: 'ADMIN'
            };
            AdminService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllAdminList();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }
    //$scope.AgencyDDLList = [];
    //$scope.BindAgencyDropdown = function () {
    //    AdminService.BindAgencyDropdownList('Agency', 0).then(function (d) {
    //        $scope.AgencyDDLList = d.data;
    //    });
    //};
    //$scope.BindAgencyDropdown();


}).factory('AdminService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/UserManagement/SaveAdminDetails", data);
    };
    fac.GetAllAdminList = function () {
        return $http.get("/UserManagement/GetAllAdminList");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    fac.BindAgencyDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    return fac;
});