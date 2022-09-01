app.controller("SectorSkillCouncilController", function ($scope, SSCService) {
    $scope.IsAdd = false;
    $scope.Roles = null;
    $scope.LoginType = null;
    $scope.lstSelectedItem = [];
      
    $scope.agencylist = [];
   
    $scope.GetAllSSCList = function ()  {
        
        SSCService.GetAllSSCList().then(function (d) {
            $scope.agencylist = d.data;
        });
    }

    $scope.GetAllSSCList();

   
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
            Name: '',
            Address: '',
            Email: '',
            Mobile: '',
            RefSectorID:0
        }; 
       
    }
    ClearForm();
    //formControlValidation();
    $scope.Edit = function (item, mode) {
        debugger;
        if (mode == "Edit") {
            $scope.isViewMode = false;
        }
        else {
            $scope.isViewMode = true;
        }

        $scope.Agency = {
            ID: item.ID,
            Name: item.Name,
            Address: item.Address,
            Email: item.Email,
            Mobile: item.Mobile,
            RefSectorID: item.RefSectorID
        }; 
        
        
    }

    $scope.SaveAgency = function () {
        if (ValidateFrom()) {
            SSCService.SaveFormData($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllSSCList();
                    ClearForm();
                }
                else {
                    alertify.error(d.data.msg);
                    alertify.error(d.data.msg);
                }
            }, function (error) {

            });
        }
    };
    $scope.ResendMailforVerification = function (UserId) {
        // alertify.confirm(' Resend Mail', 'Are you sure want to resend the mail?', function () {
        SSCService.ResendMailVerification(UserId).then(function (d) {
            if (d.data.result == "success") {
                alertify.success("Verification message send successfully");
            } else {
                alertify.error(d.data.msg);
                $scope.IsAdd = true;
            }
        }, function (error) { });
        //}, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    };

    $scope.SectorDDLList = [];
    $scope.BindSectorDropdown = function () {
        SSCService.BindSectorDropdownList('SectorList', 0).then(function (d) {
            $scope.SectorDDLList = d.data;
        });
    };
    $scope.BindSectorDropdown();
    function ValidateFrom() {
        var IsValid = true;       
        var errorMsg = "";
        if (isEmpty($scope.Agency.Name)) {
            errorMsg += "Please Enter SSC Name.<br/>";
            IsValid = false;
        }      
        //if (isEmpty($scope.Agency.Address)) {
        //    errorMsg += "Please Enter SSC Address.<br/>";
        //    IsValid = false;
        //}
        if (isEmpty($scope.Agency.Email)) {
            errorMsg += "Please Enter Email.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.Agency.Mobile)) {
            errorMsg += "Please Enter Mobile.<br/>";
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
                Type:'SSC'
            }; 


            SSCService.updateagencystatus( $scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllSSCList();

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
        if (ValidateFrom1()) {
            var data = new FormData();
            var FIleUpload = "fileUpload";
            var files = $('#' + FIleUpload).get(0).files;
            data.append("UploadFile", files[0]);

            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/AgencyManagement/BulkUploadFileAgency",
                    data: data,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    async: false,
                    success: function (d) {
                        alertify.success('Record Saved successfully.');
                        $scope.GetAllSSCList();
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

    $scope.exportData = function () {
        var CompanyID = 0;
        $scope.TrainingCenterDetailExcel = [];

        SSCService.GetAllSSCList().then(function (d) {
            if ((d.data != null) && (d.data != '')) {
                $scope.TrainingCenterDetailExcel = d.data;

            }
            $scope.GetexelReportlist();

        });

    }
    $scope.GetexelReportlist = function () {



        var vhtml = '<table style="font-family: verdana,arial,sans-serif;font-size:11px; color:#333333; border-width: 1px; border-color: #999999; border-collapse: collapse;"><thead> <tr>';

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Sector Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Name</th>';
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Address</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Email</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Mobile</th>';
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Number of Assessor</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Status</th>';

        vhtml = vhtml + '</tr></thead><tbody>';
        angular.forEach($scope.TrainingCenterDetailExcel, function (value, index) {


            vhtml = vhtml + '<tr>';


            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SectorName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Name + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Address + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Email + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Mobile + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.NumberofAssessor + '</td> ';

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
        saveAs(blob, "SSCList.xls");
    };

}).factory('SSCService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/AgencyManagement/SaveSSC", data);
    };
    fac.GetAllSSCList = function () {
        return $http.get("/AgencyManagement/GetAllSSCList");
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    fac.ResendMailVerification = function (UserId) {
        return $http.get('/Home/ResendMailVerification?UserId=' + UserId);
    };
    fac.BindSectorDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    return fac;
});