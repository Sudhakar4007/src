app.controller("rptAssessmentController", function ($scope, AssessmentSvc) {
    $scope.IsAdd = false;

    function ClearForm() {
        $scope.Agency = {
            RefSectorID: 0,
            RefJobRoleID: 0,
            RefStateID: 0,
            RefDistrictID: 0,
            RefTCID: 0,
            RefAgencyID: 0,
            RefAssessorID: 0
        };

    }
    ClearForm();
    $scope.AssessmentList = [];


    $scope.GetAllAssessmentReportList = function () {
        AssessmentSvc.GetAllAssessmentReportList($scope.Agency.RefSectorID, $scope.Agency.RefJobRoleID, $scope.Agency.RefStateID, $scope.Agency.RefDistrictID, $scope.Agency.RefTCID, $scope.Agency.RefAgencyID, $scope.Agency.RefAssessorID).then(function (d) {
            $scope.AssessmentList = d.data;
        });
    };
    $scope.GetAllAssessmentReportList();

    $scope.Search = function () {
        AssessmentSvc.GetAllAssessmentReportList($scope.Agency.RefSectorID, $scope.Agency.RefJobRoleID, $scope.Agency.RefStateID, $scope.Agency.RefDistrictID, $scope.Agency.RefTCID, $scope.Agency.RefAgencyID,$scope.Agency.RefAssessorID).then(function (d) {
            $scope.AssessmentList = d.data;          
        });
    };

   
    $scope.Close = function ()
    {
        ClearForm();
    };

    $scope.isHide = false;
    $scope.HideDiv = function () {
        $scope.isHide = true;
        $scope.modal1 = false;
    };
    $scope.BatchName = '';
    $scope.modal1 = false;
    $scope.Edit = function (item) {
        $scope.modal1 = true;
        $scope.isHide = false;
        $scope.BatchName = item.BatchName;
        if (item.StartAssessment === 'YES' && item.EndAssessment === 'YES') {
            AssessmentSvc.GetAllAssessmentDetailListByAssessorId(item.BatchName).then(function (d) {
                $scope.assessmentDetailList = d.data;
            }); 
            AssessmentSvc.GetAssessmentStatusById(item.ID).then(function (d) {
                $scope.assessmentStatus = d.data;
            });
            AssessmentSvc.GetQuestionDetailByAssessmentId(item.ID).then(function (d) {
                $scope.assessmentDetailList1 = d.data;
            });
            AssessmentSvc.GetEndAssessmentByAssessmentId(item.ID).then(function (d) {
                $scope.assessmentDetailList2 = d.data;
        });
        AssessmentSvc.GetPhotographDetails(item.ID).then(function (d) {
            $scope.assessmentDetailLis3 = d.data;
            });

            AssessmentSvc.GetGeoLocation(item.ID).then(function (d) {
                $scope.GeoLocationList = d.data;
            });
            AssessmentSvc.GetEndAssessmentSummary(item.ID).then(function (d) {
                $scope.EndAssessmentSummaryList = d.data;
            });

            AssessmentSvc.GetAssessmentDeviceDetail(item.ID).then(function (d) {
                $scope.assessmentDeviceDetail = d.data;
            });

        }        
    };

    $scope.saveFile = function () {
        if ($scope.assessmentDeviceDetail.length == 0) {
            var opts = [{ sheetid: 'AssessmentDetails', header: true }, { sheetid: 'AssessmentStatus', header: true }, { sheetid: 'GeoLocation', header: true }, { sheetid: 'FeedbackLog', header: true }, { sheetid: 'StartEndPhotographLog', header: true }, { sheetid: 'AssessmentPhotographLog', header: true }, { sheetid: 'EndAssessmentSummary', header: true }];
            alasql('SELECT INTO XLSX("CompletedAssessment.xlsx",?) FROM ?', [opts, [$scope.assessmentDetailList, $scope.assessmentStatus, $scope.GeoLocationList, $scope.assessmentDetailList1, $scope.assessmentDetailLis3, $scope.assessmentDetailList2, $scope.EndAssessmentSummaryList]]);
        }
        else {
            var opts1 = [{ sheetid: 'AssessmentDetails', header: true }, { sheetid: 'AssessmentStatus', header: true }, { sheetid: 'GeoLocation', header: true },
                { sheetid: 'FeedbackLog', header: true }, { sheetid: 'StartEndPhotographLog', header: true }, { sheetid: 'AssessmentPhotographLog', header: true },
                { sheetid: 'EndAssessmentSummary', header: true }, { sheetid: 'DeviceDetail', header: true }];
            alasql('SELECT INTO XLSX("CompletedAssessment.xlsx",?) FROM ?', [opts1, [$scope.assessmentDetailList, $scope.assessmentStatus, $scope.GeoLocationList,
                $scope.assessmentDetailList1, $scope.assessmentDetailLis3, $scope.assessmentDetailList2, $scope.EndAssessmentSummaryList, $scope.assessmentDeviceDetail]]);
        }
    }

    $scope.openTab = function () {
        $scope.url = 'www.google.com';
    };
    $scope.SectorList = [];
    $scope.BindSectorDropdown = function () {
        AssessmentSvc.BindSectorDropdownList('Sector', 0).then(function (d) {
            $scope.SectorList = d.data;
        });
    };
    $scope.BindSectorDropdown();

    $scope.JobRoleList = [];
    $scope.BindJobRoleDropdown = function () {
        AssessmentSvc.BindJobRoleDropdownList('JobRole', $scope.Agency.RefSectorID).then(function (d) {
            $scope.JobRoleList = d.data;
        });
    };

    $scope.StateList = [];
    $scope.BindStateDropdown = function () {
        AssessmentSvc.BindStateDropdownList('State', 0).then(function (d) {
            $scope.StateList = d.data;
        });
    };
    $scope.BindStateDropdown();
    $scope.DistrictList = [];
    $scope.BindDistrictDropdown = function () {
        AssessmentSvc.BindDistrictDropdownList('District', $scope.Agency.RefStateID).then(function (d) {
            $scope.DistrictList = d.data;
        });
    };
    $scope.TCList = [];
    $scope.BindTrainingCenterDropdown = function () {
        AssessmentSvc.BindTrainingCenterDropdownList('TC', $scope.Agency.RefDistrictID).then(function (d) {
            $scope.TCList = d.data;
        });
    };

    $scope.AgencyList = [];
    $scope.BindAgencyDropdown = function () {
        AssessmentSvc.BindAgencyDropdownList('Agency', 0).then(function (d) {
            $scope.AgencyList = d.data;
        });
    };
    $scope.BindAgencyDropdown();
    $scope.AssessorList = [];
    $scope.BindAssessorDropdown = function () {
        AssessmentSvc.BindAssessorDropdownList('Assessor', $scope.Agency.RefAgencyID).then(function (d) {
            $scope.AssessorList = d.data;
        });
    };

    $scope.exportData = function () {
        var CompanyID = 0;
        $scope.AssessorListDetailExcel = [];
        $scope.TCTPDetails = [];

        AssessmentSvc.GetAllAssessmentReportList($scope.Agency.RefSectorID, $scope.Agency.RefJobRoleID, $scope.Agency.RefStateID, $scope.Agency.RefDistrictID, $scope.Agency.RefTCID, $scope.Agency.RefAgencyID, $scope.Agency.RefAssessorID).then(function (d) {
            if ((d.data != null) && (d.data != '')) {
                $scope.AssessorListDetailExcel = d.data;                
            }
            $scope.GetexelReportlist();          
        });       

    }


    $scope.GetexelReportlist = function () {
        
        var vhtml = '<table style="font-family: verdana,arial,sans-serif;font-size:11px; color:#333333; border-width: 1px; border-color: #999999; border-collapse: collapse;"><thead> <tr>';

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Batch Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Batch Start Date </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Batch End Date </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Prefered Assessment Date </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">JobRole </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;"> Jobrole SectorType</th> ';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Sector Name </th>';               
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">DOB</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Gender</th>';      
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">SmartCentreBatchID</th>';        
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment Latitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment Longitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment Latitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment Longitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;"> Duration</th>';       
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Partner Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">SCCentreID </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Centre Name </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Tc State</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Tc District</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Tc Address </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">TClatitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">TClongitude </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Assessor Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Assessor Email</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">SCAgencyName</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Distance </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Distance</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Training Type</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Training Code</th>';
        vhtml = vhtml + '</tr></thead><tbody>';
        angular.forEach($scope.AssessorListDetailExcel, function (value, index) {

            vhtml = vhtml + '<tr>';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.BatchName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.BatchStartDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.BatchEndDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.PreferedAssessmentDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.JobRole + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.JobroleSectorType + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SectorName + '</td> ';           
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.DOB + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Gender + '</td> ';            
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SmartCentreBatchID + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessment + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessmentDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessmentLatitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessmentLongitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessment + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessmentDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessmentLatitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessmentLongitude + '</td> ';                         
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Duration + '</td> ';                           
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.PartnerName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SCCentreID + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.CentreName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TcState + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TcDistrict + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TcAddress + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TClatitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TClongitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.AssessorName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.AssessorEmail + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SCAgencyName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.sDistance + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.eDistance + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TrainingType + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TrainingCode + '</td> ';
            
            vhtml = vhtml + ' </tr>';
        });       

        vhtml = vhtml + '</tbody></table>';

        var html = vhtml;
        var blob = new Blob([html], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "AssessmentReport.xls");
    };
    


}).factory('AssessmentSvc', function ($http, $window) { // explained about factory in Part2
    var fac = {};

    fac.GetAllAssessmentReportList = function (RefSectorID, RefJobRoleID, RefStateID, RefDistrictID, RefTCID, RefAgencyID, RefAssessorID) {
        return $http.get("/AssessmentReport/GetAssessmentReportDetailList?RefSectorID=" + RefSectorID + ' &RefJobRoleID=' + RefJobRoleID + ' &RefStateID=' + RefStateID + ' &RefDistrictID=' + RefDistrictID + ' &RefTCID=' + RefTCID + ' &RefAgencyID=' + RefAgencyID + ' &RefAssessorID=' + RefAssessorID);
    };
    fac.BindStateDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.BindJobRoleDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.BindSectorDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.BindDistrictDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.BindTrainingCenterDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.BindAgencyDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.BindAssessorDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + ' &KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.GetAllAssessmentDetailListByAssessorId = function (BatchName) {
        return $http.get('/AssessmentReport/GetAllAssessmentDetailListByAssessorId?BatchName=' + BatchName);
    };
    fac.GetQuestionDetailByAssessmentId = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetQuestionDetailByAssessmentId?AssessmentId=' + AssessmentId);
    };
    fac.GetEndAssessmentByAssessmentId = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetEndAssessmentByAssessmentId?AssessmentId=' + AssessmentId);
    };
    fac.GetStartedAssessmentList = function (AssessorID) {
        return $http.get('/AssessmentReport/GetStartedAssessmentList?AssessorID=' + AssessorID);
    };
    fac.GetPhotographDetails = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetPhotographDetails?AssessmentId=' + AssessmentId);
    };
    fac.GetGeoLocation = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetGeoLocation?AssessmentId=' + AssessmentId);
    };
    fac.GetAssessmentStatusById = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetAssessmentStatusById?AssessmentId=' + AssessmentId);
    };
    fac.GetEndAssessmentSummary = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetEndAssessmentSummary?AssessmentId=' + AssessmentId);
    };
    fac.GetAssessmentDeviceDetail = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetAssessmentDeviceDetail?AssessmentId=' + AssessmentId);
    };
    return fac;
});