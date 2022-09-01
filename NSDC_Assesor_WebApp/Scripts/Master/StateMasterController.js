app.controller("StateMasterController", function ($scope, StateService, Excel, $timeout) {

    $scope.agencylist = [];
    $scope.GetAllStateList = function () {
        StateService.GetAllStateList().then(function (d) {
            $scope.agencylist = d.data;
        });
    }
    $scope.GetAllStateList();

    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.IsAdd = false;
    }
    function ClearForm() {
        $scope.Agency = {
            Id: 0,
            name: ''
        };

    }
    ClearForm();
    $scope.Edit = function (item, mode) {
        if (mode == "Edit") {
            $scope.isViewMode = false;
        }
        else {
            $scope.isViewMode = true;
        }

        $scope.Agency = {
            ID: item.ID,
            name: item.Name
        };


    }
    $scope.SaveDetails = function () {
        if (ValidateFrom()) {
            StateService.SaveFormData($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllStateList();
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

    //$scope.AddNew = function () {
    //    $scope.IsAdd = true;
    //}
    function ValidateFrom() {
        var IsValid = true;
        var errorMsg = "";
        if (isEmpty($scope.Agency.name)) {
            errorMsg += "Please Enter State Name.<br/>";
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
                Type: 'STATE'
            };
            StateService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllStateList();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }

    //$('#dataTable1').DataTable({
    //    dom: 'Bfrtip',
    //    buttons: [
    //        'copy', 'csv', 'excel', 'pdf', 'print'
    //    ]
    //});
 
   
        $scope.exportToExcel = function (tableId) { // ex: '#my-table'
            var exportHref = Excel.tableToExcel(tableId, 'WireWorkbenchDataExport');
            $timeout(function () { location.href = exportHref; }, 100); // trigger download
        }
    


}).factory('StateService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/Master/SaveStateDetails", data);
    };
    fac.GetAllStateList = function () {
        return $http.get("/Master/GetAllStateList");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    return fac;
});




