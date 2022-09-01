app.controller("ManageAgencyController", function ($scope, AgencyService) {

    $scope.Logintype = $('#logintype').val();
    $scope.Id = $('#id').val();
    $scope.Logintype1 = $('#logintype').val();

    function ClearForm() {
        $scope.Agency = {
            Id: 0,
            Name: '',
            Address: '',
            Email: '',
            Mobile: '',
            RefSSCID: 0
        };
        $scope.isDisabled = false;
        $scope.isHide = false;
    }
    ClearForm();
    $scope.agencylist = [];
    $scope.GetAllAgencyList = function () {
        AgencyService.GetAllAgencyList($scope.Agency.RefSSCID, $scope.Agency.Name, $scope.Agency.Address, $scope.Agency.Email, $scope.Agency.Mobile).then(function (d) {
            $scope.agencylist = d.data;
        });
    }
    $scope.GetAllAgencyList();


    $scope.Closed = function () {
        $('#fileUpload').val('');
    };
    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        if ($scope.Logintype === 'SSC') {
            $scope.Agency.RefSSCID = $scope.Id;
            $scope.isDisabled = true;
        }
    }

    formControlValidation();
    if ($scope.Logintype === 'SSC') {
        $scope.Agency.RefSSCID = $scope.Id;
        $scope.isDisabled = true;
    }

    //if ($scope.Logintype === 'SUPERADMIN') {

    //    $scope.isHide = true;
    //}
    $scope.Edit = function (item, mode) {
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
            RefSSCID: item.RefSSCID
        };
        if ($scope.Logintype === 'SSC') {
            $scope.Agency.RefSSCID = $scope.Id;
            //$scope.isDisabled = true;
        }

    };

    $scope.Search = function () {
        AgencyService.GetAllAgencyList($scope.Agency.RefSSCID, $scope.Agency.Name, $scope.Agency.Address, $scope.Agency.Email, $scope.Agency.Mobile).then(function (d) {
            $scope.agencylist = d.data;
            //$scope.agencylist.Selected = false;
        });
    };

    $scope.SaveAgency = function () {
        if (ValidateFrom()) {
            AgencyService.SaveFormData($scope.Agency).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    ClearForm();
                    $scope.GetAllAgencyList();
                    
                }
                else {
                    alertify.error(d.data.msg);
                }
            }, function (error) {

            });
        }
    };
    $scope.ResendMailforVerification = function (UserId) {
        // alertify.confirm(' Resend Mail', 'Are you sure want to resend the mail?', function () {
        AgencyService.ResendMailVerification(UserId).then(function (d) {
            if (d.data.result == "success") {
                alertify.success("Verification message send successfully");
            } else {
                alertify.error(d.data.msg);
                $scope.IsAdd = true;
            }
        }, function (error) { });
        //}, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    };

    $scope.AgencyCreationMail = function (UserId) {
        // alertify.confirm(' Resend Mail', 'Are you sure want to resend the mail?', function () {
        AgencyService.AgencyCreationMail(UserId).then(function (d) {
            if (d.data.result == "success") {
                alertify.success("Verification message send successfully");
            } else {
                alertify.error(d.data.msg);
                $scope.IsAdd = true;
            }
        }, function (error) { });
        //}, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    };

    function ValidateFrom() {
        var IsValid = true;
        var errorMsg = "";
        if (isEmpty($scope.Agency.Name)) {
            errorMsg += "Please Enter Agency Name.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.Agency.Address)) {
            errorMsg += "Please Enter Agency Address.<br/>";
            IsValid = false;
        }
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
    function ClearForm1() {
        $scope.UserDetails = {
            Id: 0,
            Reason: '',
            Action: ''

        };
        $scope.isEditMode = false;
    }
    ClearForm1();
    $scope.isModalHide = false;
    $scope.SaveUserDetals = function () {
        if (ValidationFrom()) {
            $scope.UserDetails.Id = $scope.Userlist.ID;
            $scope.UserDetails.Action = $scope.Userlist.Action;
            console.log($scope.UserDetails);
            AgencyService.SaveAssessorData($scope.UserDetails).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllAgencyList();
                    $('#assessorModal').modal('hide');
                    ClearForm1();

                }
                else {
                    alertify.error(d.data.msg);
                    //$scope.IsAdd = true;
                    $scope.isModalHide = false;
                }
            }, function (error) {

            });
        }
    };
    $scope.Userlist = {
        ID: 0,
        Action: ''
    };
    $scope.AgencyModal = function (items, actions) {
        $scope.Userlist = {
            ID: items,
            Action: actions
        };
    };
    function ValidationFrom() {
        var IsValid = true;
        var errorMsg = "";

        if (isEmpty($scope.UserDetails.Reason)) {
            errorMsg += "Please Enter Reason.<br/>";
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
                Type: 'agency'
            };


            AgencyService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllAgencyList();

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
                        $scope.GetAllAgencyList();
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

    //if ($scope.Logintype === 'SSC') {

    //    $scope.isDisabled = true;
    //}

    //toggle all checkboxes
    //$scope.toggleSelect = function () {
    //    debugger;
    //    angular.forEach($scope.checkboxes, function (item) {
    //        item.selected = event.target.checked;
    //    });
    //}
    //$scope.toggleAll = function () {
    //    debugger;
    //    var toggleStatus = !$scope.isAllSelected;
    //    angular.forEach($scope.agencylist, function (itm) { u.selected = toggleStatus; });

    //};

    //$scope.optionToggled = function () {
    //    $scope.selectedAll = $scope.agencylist.every(function (u)
    //    { return u.selected; })
    //};  

    $scope.selectedAll = false;
    var checkedValues = [];
    $scope.toggleAll = function () {
        if ($scope.selectedAll == true) {
            $scope.selectedAll = false;
        }
        else {
            $scope.selectedAll = true;
        }
        angular.forEach($scope.agencylist, function (u) {
            u.Selected = $scope.selectedAll;
            if ($scope.selectedAll == true) {
                checkedValues.push(u.ID);
            }
            else {
                checkedValues = [];
            }
        });
    };

    $scope.SelectAgency = function (id) {
        var cbId = "#cb_" + id;
        if ($(cbId).prop("checked") == true) {
            checkedValues.push(id);
        }
        else {
            
            var _searchedIndex = $.inArray(id, checkedValues);
            if (_searchedIndex >= 0) {
                checkedValues.splice(_searchedIndex, 1);
            }
        }
    };

    $scope.Checkbox = {
        Id: 0      
}

    $scope.SendMail = function () {
        var Id = checkedValues.toString();
        if (Id != "") {
            AgencyService.ResendSentMail(Id).then(function (d) {
                if (d.data.msg == "success") {
                    alertify.success(d.data.msg);
                    $(".checkagency").prop("checked", false);
                    checkedValues = [];
                }
                else {
                    alertify.error(d.data.msg);
                }
            }, function (error) {

            });
        }
        else {
            alertify.error('Please select checkbox');
        }
    }
   

    $scope.SSCList = [];
    $scope.BindSectorDropdown = function () {
        AgencyService.BindSSCDropdownList('SSC', 0).then(function (d) {
            $scope.SSCList = d.data;            
        });
    };
    $scope.BindSectorDropdown();
    $scope.DownloadFile = function (url) {
        window.location.href = url;
    }

    $scope.exportData = function () {
        var CompanyID = 0;
        $scope.TrainingCenterDetailExcel = [];

        AgencyService.GetAllAgencyList($scope.Agency.RefSSCID, $scope.Agency.Name, $scope.Agency.Address, $scope.Agency.Email, $scope.Agency.Mobile).then(function (d) {
            if ((d.data != null) && (d.data != '')) {
                $scope.TrainingCenterDetailExcel = d.data;

            }
            $scope.GetexelReportlist();

        });

    }
    $scope.GetexelReportlist = function () {



        var vhtml = '<table style="font-family: verdana,arial,sans-serif;font-size:11px; color:#333333; border-width: 1px; border-color: #999999; border-collapse: collapse;"><thead> <tr>';

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Address</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Email</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Mobile</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Number of Assessor</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Status</th>';

        vhtml = vhtml + '</tr></thead><tbody>';
        angular.forEach($scope.TrainingCenterDetailExcel, function (value, index) {


            vhtml = vhtml + '<tr>';


            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Name + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Address + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Email + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Mobile + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.NumberofAssessor + '</td> ';

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
        saveAs(blob, "AgencyList.xls");
    };

}).factory('AgencyService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/AgencyManagement/SaveAgency", data);
    };
    fac.GetAllAgencyList = function (RefSSCID,Name,Address, Email, Mobile) {
        return $http.get("/AgencyManagement/GetAllAgencyList?RefSSCID=" + RefSSCID + '&Name=' + Name + '&Address=' + Address + '&Email=' + Email + ' &Mobile=' + Mobile);
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    fac.ResendMailVerification = function (UserId) {
        return $http.get('/Home/ResendMailVerification?UserId=' + UserId);
    };
    fac.AgencyCreationMail = function (UserId) {
        return $http.get('/Home/AgencyCreationMail?UserId=' + UserId);
    };
    fac.BindSSCDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.SaveAssessorData = function (data) {
        return $http.post("/UserManagement/SaveAssessorStatus", data);
    };
    fac.ResendSentMail = function (Id) {
        return $http.post("/Home/ResendSentMail?Id="+Id);
    };
    
    return fac;
});