app.controller("SectorMasterController", function ($scope, SectorService) {

    $scope.agencylist = [];
    $scope.GetAllSectorList = function () {
        SectorService.GetAllSectorList().then(function (d) {
            $scope.agencylist = d.data;
        });
    };
    $scope.GetAllSectorList();



    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.IsAdd = false;
    };
    $scope.Closed = function () {
        $('#fileUpload').val('');
    };
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


    };
    $scope.SaveDetails = function () {
        if (ValidateFrom1()) {
            SectorService.SaveFormData($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllSectorList();
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
    function ValidateFrom1() {
        var IsValid = true;
        var errorMsg = "";
        if (isEmpty($scope.Agency.name)) {
            errorMsg += "Please Enter Sector Name.<br/>";
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
                Type: 'SECTOR'
            };

            SectorService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllSectorList();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }
    $scope.Isshown = false;
    $scope.Upload = function () {
        $scope.Isshown = true;
    };
    $scope.HideDiv = function () {
        $scope.Isshown = false;
    };

    $scope.UploadFile = function () {
        if (ValidateFrom()) {
            var data = new FormData();
            var FIleUpload = "fileUpload";
            var files = $('#' + FIleUpload).get(0).files;
            data.append("UploadFile", files[0]);

            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/Master/BulkUploadFileSector",
                    data: data,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    async: false,
                    success: function (d) {
                        alertify.success('Record Saved successfully.');
                        $scope.GetAllAgencyList();
                        $('#fileUpload').val('');
                    },
                    error: function (data) {

                    }
                });
            }, 1000);
        }
    }

    function ValidateFrom() {
        var rtn = true;

        var FIleUpload = "fileUpload";

        if (typeof (FormData) == 'undefined') {
            // This browser does not have native FormData support. Use the FormDataCompatibility
            // class which implements the needed fucncitonlity foro building multi part HTTP POST requests
            alertify.error("Browser not supported. Suggested browser Chrome and Mozilla.");
            rtn = false;
        }
        else {
            var data = new FormData();
        }
        var files = $('#' + FIleUpload).get(0).files;
        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }

        if (files.length == 0) {
            alertify.error("Please Upload file.");
            rtn = false;
        }

        var exts = ['xlsx', 'xls', 'csv'];
        // first check if file field has any value
        if (files) {
            // split file name at dot
            var get_ext = files[0].name.split('.');
            // reverse name to check extension
            get_ext = get_ext.reverse();
            // check file type is valid as given in 'exts' array
            if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) {

            } else {
                $('#progress').hide();
                alertify.error('Invalid file format!, only .xlsx,.xls &.csv is allowed.');
                rtn = false;
            }
        }

        if (files) {
            var get_size = files[0].size;
            if (get_size > 5242880) {
                alertify.error(files[0].name + '" document of size less than 5 MB.');
                rtn = false;
            }
        }


        return rtn;
    }


    $scope.DownloadFile = function (url) {
        window.location.href = url;
    }

}).factory('SectorService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/Master/SaveSectorDetails", data);
    };
    fac.GetAllSectorList = function () {
        return $http.get("/Master/GetAllSectorList");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    return fac;
});