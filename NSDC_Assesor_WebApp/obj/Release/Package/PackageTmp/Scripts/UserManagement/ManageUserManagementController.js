app.controller("ManageUserManagementController", function ($scope, UserService, $filter) {

    $scope.Logintype = $('#logintype').val();
    $scope.Id = $('#id').val();
    $scope.AgencyId = $('#agencyId').val();
    $scope.refSectorID = $('#refSectorID').val();

    $scope.SectorDDLList = [];
    $scope.AgencyDDLList = [];
   // 
    function ClearForm() {
        $scope.User = {
            Id: 0,
            RefAgencyID: 0,
            Name: '',
            Email: '',
            Mobile: '',
            DateOfBirth: '',
            Gender: '',
            RefSectorID:0

        };
        $scope.isEditMode = false;

    }
    ClearForm();
    $scope.isDisabled = false;
    $scope.agencylist = [];
    $scope.GetAllUserList = function () {      
        UserService.GetAllUserList($scope.User.RefAgencyID, $scope.User.Name, $scope.User.Email, $scope.User.Mobile, $scope.User.DateOfBirth, $scope.User.Gender).then(function (d) {
            $scope.agencylist = d.data;           
        });
    };
    $scope.GetAllUserList();

    $scope.assessmentlist = [];     

    $scope.Closed = function () {
        $('#fileUpload').val('');
        ClearForm();
        if ($scope.Logintype === 'AGENCIES') {
            $scope.User.RefAgencyID = $scope.AgencyId;
        }
        if ($scope.Logintype === 'SSC') {

            $scope.User.RefSectorID = $scope.refSectorID;
            //alert($scope.User.RefSectorID);
            $scope.isDisabled = true;

            UserService.BindAgencyDropdownList('AgencyList', $scope.User.RefSectorID).then(function (d) {
                $scope.AgencyDDLList = d.data;
            });
        }
        $scope.isViewMode = false;
    };
    $scope.isEditMode = false;
    $scope.Close = function () {
        ClearForm();
        $scope.isViewMode = false;
        $scope.isEditMode = false;
        
    }
   
    //formControlValidation();

    $scope.AssessorCreationMail = function (UserId) {
        UserService.AssessorCreationMail(UserId).then(function (d) {
            if (d.data.result == "success") {
                alertify.success("Verification message send successfully");
            } else {
                alertify.error(d.data.msg);
              
            }
        }, function (error) { });   

    };
   
    $scope.Search = function () {
        UserService.GetAllUserList($scope.User.RefAgencyID, $scope.User.Name, $scope.User.Email, $scope.User.Mobile, $scope.User.DateOfBirth, $scope.User.Gender).then(function (d) {
            $scope.agencylist = d.data;
        });
    };

    $scope.modal1 = false;
    $scope.Edit = function (item, mode) {
        debugger;
        if (mode == "Edit") {
            $scope.isViewMode = false;
            $scope.isEditMode = true;

        }
        else {
            if ($scope.Logintype == 'AGENCIES') {
                $scope.isViewMode = true;
                $scope.modal1 = true;
                $scope.AgencyDetails = item;
                UserService.GetAllAgenciesAssessmentList(item.ID).then(function (d) {
                    $scope.assessmentlist = d.data;
                });
            }
            else
            {
                $scope.isViewMode = true;
                $scope.modal1 = false;
            }
            
        }
        $scope.User = {
            ID: item.ID,
            RefAgencyID: item.RefAgencyID,
            Name: item.Name,
            Email: item.Email,
            Mobile: item.Mobile,
            DateOfBirth: item.DateOfBirth,
            Gender: item.Gender,
            RefSectorID: item.RefSectorID
        };  
        if ($scope.Logintype == 'SSC') {
            $scope.User.RefSectorID = $scope.refSectorID;
        }
        
        UserService.BindAgencyDropdownList('AgencyList', $scope.User.RefSectorID).then(function (d) {
            $scope.AgencyDDLList = d.data;
        });

    };

    if ($scope.Logintype === 'AGENCIES') {
        $scope.User.RefAgencyID = $scope.AgencyId;
    }
    
    if ($scope.Logintype === 'SSC') {
        
        $scope.User.RefSectorID = $scope.refSectorID;
        //alert($scope.User.RefSectorID);
        $scope.isDisabled = true;

        UserService.BindAgencyDropdownList('AgencyList', $scope.User.RefSectorID).then(function (d) {
            $scope.AgencyDDLList = d.data;
        });
    }
    $scope.isHidediv = false;
    $scope.ViewDetails = function (item) {
        $scope.isHidediv = true;
        $scope.modal1 = false;
                //$scope.AgencyDetails = item;
                UserService.GetViewAssessorDetails(item.ID).then(function (d) {
                    $scope.assessmentlist1 = d.data;
                });
    };
    
    $scope.SaveDetails = function () {
        var now = new Date($scope.User.DateOfBirth);
        var dateString = moment(now).format('YYYY-MM-DD');
        $scope.User.DateOfBirth = dateString;
        if (ValidateFrom()) {
        UserService.SaveFormData($scope.User).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);                    
                    ClearForm();
                    $scope.GetAllUserList();
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
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

        if ($scope.User.RefAgencyID === "" || $scope.User.RefAgencyID === 0 || $scope.User.RefAgencyID === undefined) {
            errorMsg += "Please select Agency Name.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.Name)) {
            errorMsg += "Please Enter User Name.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.Email)) {
            errorMsg += "Please Enter User Email address.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.Mobile)) {
            errorMsg += "Please Enter User Mobile.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.DateOfBirth)) {
            errorMsg += "Please Enter Date Of Birth.<br/>";
            IsValid = false;

        }
        if (isEmpty($scope.User.Gender)) {
            errorMsg += "Please select Gender.<br/>";
            IsValid = false;
        }
        if (!re.test($scope.User.Email)) {
            errorMsg += "Please Enter Valid Email address.<br/>";
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
            Action: '',
            UserId: 0,
            LoginType: ''
        };
        $scope.isEditMode = false;
    }
    ClearForm1();
    $scope.isModalHide = false;
    $scope.SaveUserDetals = function () {      
        $scope.UserDetails.UserId = $scope.Id;
        $scope.UserDetails.LoginType = $scope.Logintype;

         if (ValidationFrom()) {
        $scope.UserDetails.Id = $scope.Userlist.ID;
        $scope.UserDetails.Action = $scope.Userlist.Action;
        console.log($scope.UserDetails);
        UserService.SaveAssessorData($scope.UserDetails).then(function (d) {
                if (d.data.success) {
                    alertify.success(d.data.msg);
                    $scope.GetAllUserList();
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
        ID:0,
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
                Type: 'USERMGMT'
            };
            UserService.updateagencystatus($scope.StatusEntity).then(function (d) {
                if (d.data.result == "success") {
                    if (action == 'delete')
                        alertify.success('record deleted successfully.');
                    else
                        alertify.success('Record successfully update ');
                    $scope.GetAllUserList();

                } else {
                    alertify.error(d.data.msg);
                    $scope.isadd = true;
                }
            }, function (error) { });
        }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });

    }

   
    $scope.BindSectorDropdown = function () {
        UserService.BindSectorDropdownList('SectorList', 0).then(function (d) {
            $scope.SectorDDLList = d.data;
        });
    };
    $scope.BindSectorDropdown();

  
    $scope.BindAgencyDropdown = function () {
        UserService.BindAgencyDropdownList('AgencyList', $scope.User.RefSectorID).then(function (d) {
            $scope.AgencyDDLList = d.data;
        });
    };
   // $scope.BindAgencyDropdown();

    $scope.Isshown = false;
    $scope.Upload = function () {
        $scope.Isshown = true;
    };
    $scope.HideDiv = function () {
        $scope.Isshown = false;
    };

    $scope.hidebutton = false;
    //$scope.hideAssessorDetails = false;
    
    $scope.HideList = function ()
    {
        if ($scope.Logintype == 'AGENCIES') {
            $scope.hidebutton = true;
        }
        else
        {
            $scope.hidebutton = false;
            $scope.hideAssessorDetails = true;
        }
        
    };
    $scope.HideList();
    $scope.UploadFile = function () {
        if (ValidateFrom1()) {
            var data = new FormData();
            var FIleUpload = "fileUpload";
            var files = $('#' + FIleUpload).get(0).files;
            data.append("UploadFile", files[0]);

            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/UserManagement/BulkUploadFileUserManagement",
                    data: data,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    async: false,
                    success: function (d) {
                        alertify.success('Record Saved successfully.');
                        $scope.GetAllUserList();
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
        UserService.ResendSentMail(Id).then(function (d) {
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

    $scope.exportData = function () {
        var CompanyID = 0;
        $scope.TrainingCenterDetailExcel = [];

        UserService.GetAllUserList($scope.User.RefAgencyID, $scope.User.Name, $scope.User.Email, $scope.User.Mobile, $scope.User.DateOfBirth, $scope.User.Gender).then(function (d) {
            if ((d.data != null) && (d.data != '')) {
                $scope.TrainingCenterDetailExcel = d.data;

            }
            $scope.GetexelReportlist();

        });

    }
    $scope.GetexelReportlist = function () {



        var vhtml = '<table style="font-family: verdana,arial,sans-serif;font-size:11px; color:#333333; border-width: 1px; border-color: #999999; border-collapse: collapse;"><thead> <tr>';

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Agency Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Email</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Mobile</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Status</th>';

        vhtml = vhtml + '</tr></thead><tbody>';
        angular.forEach($scope.TrainingCenterDetailExcel, function (value, index) {


            vhtml = vhtml + '<tr>';


            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Name+ '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.AgencyName+ '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Email+ '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Mobile + '</td> ';

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
        saveAs(blob, "AssessorList.xls");
    };

}).factory('UserService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/UserManagement/SaveUserDetails", data);
    };
    fac.GetAllUserList = function (RefAgencyID,Name,Email,Mobile,DateOfBirth,Gender) {
        return $http.get("/UserManagement/GetAllUserList?RefAgencyID=" + RefAgencyID + '&Name=' + Name + '&Email=' + Email + ' &Mobile=' + Mobile + ' &DateOfBirth=' + DateOfBirth + ' &Gender=' + Gender);
    };
    fac.GetAllAgenciesAssessmentList = function (AssessorID) {
        return $http.get('/UserManagement/GetAllAgenciesAssessmentList?AssessorID=' + AssessorID);
    };
    fac.GetViewAssessorDetails = function (AssessorID) {
        return $http.get('/UserManagement/GetViewAssessorDetails?AssessorID=' + AssessorID);
    };
    fac.updateagencystatus = function (objAgency) {
        return $http.post("/Home/updateagencystatus", objAgency);
    };
    fac.BindAgencyDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.AssessorCreationMail = function (UserId) {
        return $http.get('/Home/AssessorCreationMail?UserId=' + UserId);
    };
    fac.SaveAssessorData = function (data) {
        return $http.post("/UserManagement/SaveAssessorStatus", data);
    };
    fac.BindSectorDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.ResendSentMail = function (Id) {
        return $http.post("/Home/ResendSentMail?Id=" + Id);
    };
    return fac;
});