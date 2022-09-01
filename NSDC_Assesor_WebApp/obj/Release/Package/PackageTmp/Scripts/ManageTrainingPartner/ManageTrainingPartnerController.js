app.controller("ManageTrainingPartnerController", function ($scope, TrainingPartnerService) {
        
    $scope.agencylist = [];   
    $scope.GetAllTrainingPartnerList = function ()  {       
        TrainingPartnerService.GetAllTrainingPartnerList().then(function (d) {
            $scope.agencylist = d.data;
        });
    }
    $scope.GetAllTrainingPartnerList();

    $scope.Closed = function () {
        $('#fileUpload').val('');
    };
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
        }; 
        
        
    }  
    $scope.SaveDetails = function () {
        if (ValidateFrom()) {
            TrainingPartnerService.SaveFormData($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllTrainingPartnerList();
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
            errorMsg += "Please Enter Training Partner Name.<br/>";
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
                Type: 'trainingpartner'
            };

            TrainingPartnerService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllTrainingPartnerList();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    };
    $scope.Isshown = false;
    $scope.Upload = function () {
        $scope.Isshown = true;
    };
    $scope.HideDiv = function () {
        $scope.Isshown = false;
    };

    $scope.UploadFile = function () {
        if (ValidateFrom1()) {
            var data = new FormData();
            var FIleUpload = "fileUpload";
            var files = $('#' + FIleUpload).get(0).files;
            data.append("UploadFile", files[0]);

            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/TrainingPartnerManagement/BulkUploadFileTrainingPartner",
                    data: data,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    async: false,
                    success: function (d) {
                        alertify.success('Record Saved successfully.');
                        $scope.GetAllTrainingPartnerList();
                        $('#fileUpload').val('');
                    },
                    error: function (data) {
                        alertify.error('Some error occured');
                    }
                });
            }, 1000);
        }
    }

    function ValidateFrom1() {
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
            if ($.inArray(get_ext[0].toLowerCase(), exts) > -1) { }
             else {
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
    };
    $scope.exportData = function () {
        var CompanyID = 0;
        $scope.TrainingCenterDetailExcel = [];

        TrainingPartnerService.GetAllTrainingPartnerList().then(function (d) {
            if ((d.data != null) && (d.data != '')) {
                $scope.TrainingCenterDetailExcel = d.data;

            }
            $scope.GetexelReportlist();

        });

    }
    $scope.GetexelReportlist = function () {



        var vhtml = '<table style="font-family: verdana,arial,sans-serif;font-size:11px; color:#333333; border-width: 1px; border-color: #999999; border-collapse: collapse;"><thead> <tr>';

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Training Partner Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Status</th>';

        vhtml = vhtml + '</tr></thead><tbody>';
        angular.forEach($scope.TrainingCenterDetailExcel, function (value, index) {


            vhtml = vhtml + '<tr>';

            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Name + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.NumberofAssessor + '</td> ';
            //
            if (value.Status)
                vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + 'Active' + '</td> ';
            else vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + 'In-Active' + '</td> ';


            vhtml = vhtml + ' </tr>';


        });
        vhtml = vhtml + '</tbody></table>';

        var html = vhtml;
        var blob = new Blob([html], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "TrainingPartnerList.xls");
    };
}).factory('TrainingPartnerService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/TrainingPartnerManagement/SaveTraingPartner", data);
    };
    fac.GetAllTrainingPartnerList = function () {
        return $http.get("/TrainingPartnerManagement/GetAllTrainingPartnerList");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    return fac;
});