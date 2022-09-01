app.controller("AssessmentController", function ($scope, AssessmentSvc,$filter) {

    $scope.logintype = $('#logintype').val();
    $scope.refSSCID = $('#refSSCID').val();
    $scope.refSectorID = $('#refSectorID').val();
    $scope.AgencyId = $('#AgencyId').val();
    $scope.modal1 = false;

    var today = new Date();
    $('#assessmentdateid').datetimepicker({
        format: 'DD/MM/YYYY'
       
    });
    $('#assessmentenddateid').datetimepicker({
        format: 'DD/MM/YYYY'

    });

    function ClearForm() {
        $scope.Agency = {
            RefSectorID: 0,
            RefJobRoleID: 0,
            RefStateID: 0,
            RefDistrictID: 0,
            RefTCID: 0,
            RefAgencyID: 0,
            RefAssessorID: 0,
            AssessmentType: 'ALL',
            BatchName: '',
            TrainingType: '',
            TrainingCode: '',
            AssessmentDate: '',
            AssessmentEndDate: ''
        };
        $scope.isDisabled = false;
    }
    $scope.Close = function () {
        ClearForm();
        if ($scope.logintype === 'AGENCIES') {
            $scope.Agency.RefAgencyID = $scope.AgencyId;
            $scope.isDisabled = true;
        }
        if ($scope.logintype === 'SSC') {
            $scope.Agency.RefSectorID = $scope.refSectorID;
            $scope.isDisabled = true;
        }
    };
    ClearForm();
    $scope.AssessmentList = [];

    $scope.Search = function () {
        if ($scope.Agency.AssessmentType !== '' && $scope.Agency.AssessmentType !== 0) {
            $scope.Agency.AssessmentType = $scope.Agency.AssessmentType;
        }
        else
        {
            $scope.Agency.AssessmentType = 'ALL';
        }
        if ($scope.Agency.AssessmentDate != '' || $scope.Agency.AssessmentDate != undefined)
        { $scope.Agency.AssessmentDate = $('#AssessmentDate').val(); }
        if ($scope.Agency.AssessmentEndDate != '' || $scope.Agency.AssessmentEndDate != undefined)
        { $scope.Agency.AssessmentEndDate = $('#AssessmentEndDate').val(); }
        AssessmentSvc.GetAllAssessmentList($scope.Agency.RefSectorID, $scope.Agency.RefJobRoleID, $scope.Agency.RefStateID, $scope.Agency.RefDistrictID,
            $scope.Agency.RefTCID, $scope.Agency.RefAgencyID, $scope.Agency.RefAssessorID, $scope.Agency.AssessmentType,
            $scope.Agency.BatchName, $scope.Agency.AssessmentDate, $scope.Agency.AssessmentEndDate, $scope.Agency.TrainingType, $scope.Agency.TrainingCode).then(function (d) {
            $scope.AssessmentList = d.data;
            $scope.excelReport = d.data;
            
        });
    };
    $scope.datetime = $filter('date')(new Date(), 'MM/dd/yyyy');

    
    $scope.Edit = function (item) {
        $scope.assessmentDetailList = [];
        $scope.assessmentStatus = [];
        $scope.assessmentDetailList1 = [];
        $scope.assessmentDetailList2 = [];
        $scope.assessmentDetailLis3 = [];
        $scope.GeoLocationList = [];
        $scope.assessmentDeviceDetail = [];
        $scope.assessmentCandidateDetail = [];
        
        var now = new Date(item.PreferedAssessmentDate);
        var preAssessmentDate = moment(now).format('MM/DD/YYYY');

       $scope.modal1 = true;
        $scope.AssessmentDetailsbyID = item;
        console.log($scope.AssessmentDetailsbyID);
        if (item.StartAssessment == 'No' && item.EndAssessment == 'No' && $scope.datetime > preAssessmentDate) {
            AssessmentSvc.getGetAllAssessmentDetailListByAssessorId(item.BatchName).then(function (d) {
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
            AssessmentSvc.GetAssessmentDeviceDetail(item.ID).then(function (d) {
                $scope.assessmentDeviceDetail = d.data;
            });
            AssessmentSvc.GetEndAssessmentSummary(item.ID).then(function (d) {
                $scope.EndAssessmentSummaryList = d.data;
            });
            AssessmentSvc.GetCandidateList(item.SmartCentreBatchID).then(function (d) {
                $scope.CandidateList = d.data;
            });
        }
        else if ($scope.datetime <= preAssessmentDate && item.StartAssessment == 'No') {
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
            AssessmentSvc.GetAssessmentDeviceDetail(item.ID).then(function (d) {
                $scope.assessmentDeviceDetail = d.data;
            });
            AssessmentSvc.GetEndAssessmentSummary(item.ID).then(function (d) {
                $scope.EndAssessmentSummaryList = d.data;
            });
            AssessmentSvc.GetCandidateList(item.SmartCentreBatchID).then(function (d) {
                $scope.CandidateList = d.data;
            });
        }
        else if (item.StartAssessment == 'Yes' && item.EndAssessment == 'Yes')
        {
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
            AssessmentSvc.GetAssessmentDeviceDetail(item.ID).then(function (d) {
                $scope.assessmentDeviceDetail = d.data;
            });
            AssessmentSvc.GetEndAssessmentSummary(item.ID).then(function (d) {
                $scope.EndAssessmentSummaryList = d.data;
            });
            AssessmentSvc.GetCandidateList(item.SmartCentreBatchID).then(function (d) {
                $scope.CandidateList = d.data;
            });
        }
        else if (item.StartAssessment == 'Yes' && item.EndAssessment == 'No') {
            AssessmentSvc.GetAllAssessmentDetailListByAssessorId(item.BatchName).then(function (d) {
                $scope.assessmentDetailList = d.data;
            });
            AssessmentSvc.GetInprogressAssessmentStatusById(item.ID).then(function (d) {
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
            AssessmentSvc.GetAssessmentDeviceDetail(item.ID).then(function (d) {
                $scope.assessmentDeviceDetail = d.data;
            });
            AssessmentSvc.GetEndAssessmentSummary(item.ID).then(function (d) {
                $scope.EndAssessmentSummaryList = d.data;
            });
            AssessmentSvc.GetCandidateList(item.SmartCentreBatchID).then(function (d) {
                $scope.CandidateList = d.data;
            });
        }
    };

    $scope.saveFile = function () {
        if ($scope.GeoLocationList.length == 0) {
            var opts = [{ sheetid: 'ALLAssessmentDetails', header: true }/*, { sheetid: 'AssessmentStatus', header: true }*/];
            alasql('SELECT INTO XLSX("AllTypeAssessment.xlsx",?) FROM ?', [opts, [$scope.assessmentDetailList/*, $scope.assessmentStatus*/]]);
        }

        else if ($scope.GeoLocationList.length != 0 && $scope.assessmentDeviceDetail.length == 0){
            var opts2 = [{ sheetid: 'ALLAssessmentDetails', header: true }, { sheetid: 'AssessmentStatus', header: true }, { sheetid: 'GeoLocation', header: true }, { sheetid: 'FeedbackLog', header: true }, { sheetid: 'StartEndPhotographLog', header: true }, { sheetid: 'AssessmentPhotographLog', header: true }];
            alasql('SELECT INTO XLSX("AllTypeAssessment.xlsx",?) FROM ?', [opts2, [$scope.assessmentDetailList, $scope.assessmentStatus, $scope.GeoLocationList, $scope.assessmentDetailList1, $scope.assessmentDetailLis3, $scope.assessmentDetailList2]]);
        }

        else {
            var opts1 = [{ sheetid: 'AssessmentDetails', header: true }, { sheetid: 'AssessmentStatus', header: true }, { sheetid: 'GeoLocation', header: true },
            { sheetid: 'FeedbackLog', header: true }, { sheetid: 'StartEndPhotographLog', header: true }, { sheetid: 'AssessmentPhotographLog', header: true },
                { sheetid: 'DeviceDetail', header: true }, { sheetid: 'CandidatesDetails', header: true }];

            alasql('SELECT INTO XLSX("CompletedAssessment.xlsx",?) FROM ?', [opts1, [$scope.assessmentDetailList, $scope.assessmentStatus, $scope.GeoLocationList,
                $scope.assessmentDetailList1, $scope.assessmentDetailLis3, $scope.assessmentDetailList2, $scope.assessmentDeviceDetail, $scope.CandidateList]]);
        }
      
    };
    

    $scope.hideDeatil = function () {
        $scope.modal1 = false;
    };
    $scope.SectorList = [];
    $scope.BindSectorDropdown = function () {
        if ($scope.logintype === 'SSC') {
           
            AssessmentSvc.BindSectorDropdownList('SectorList', 0).then(function (d) {
                $scope.SectorList = d.data;
            });
        }
        else {


            AssessmentSvc.BindSectorDropdownList('Sector', 0).then(function (d) {
                $scope.SectorList = d.data;
            });
        }
    };
    $scope.BindSectorDropdown();

    $scope.JobRoleList = [];
    $scope.BindJobRoleDropdown = function () {
        AssessmentSvc.BindJobRoleDropdownList('JobRole', $scope.Agency.RefSectorID).then(function (d) {
            $scope.JobRoleList = d.data;
        });
    };
    $scope.BindJobRoleDropdown();

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

    if ($scope.logintype === 'SSC') {
        $scope.Agency.RefSectorID = $scope.refSectorID;
        $scope.isDisabled = true;
    }
    if ($scope.logintype === 'AGENCIES') {
        $scope.Agency.RefAgencyID = $scope.AgencyId;
        $scope.isDisabled = true;
    }

    $scope.exportData = function () {
        var CompanyID = 0;
        $scope.AssessorListDetailExcel = [];

        //AssessmentSvc.GetAllAssessmentList($scope.Agency.RefSectorID, $scope.Agency.RefJobRoleID, $scope.Agency.RefStateID, $scope.Agency.RefDistrictID, $scope.Agency.RefTCID, $scope.Agency.RefAgencyID, $scope.Agency.RefAssessorID, $scope.Agency.AssessmentType).then(function (d) {
        //    if ((d.data != null) && (d.data != '')) {
        //        $scope.AssessorListDetailExcel = d.data;

        //    }
        //    $scope.GetexelReportlist();

        //});
        $scope.AssessorListDetailExcel = $scope.AssessmentList;
        $scope.GetexelReportlist();
    }
    $scope.GetexelReportlist = function () {
        var vhtml = '<table style="font-family: verdana,arial,sans-serif;font-size:11px; color:#333333; border-width: 1px; border-color: #999999; border-collapse: collapse;"><thead> <tr>';

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Assessor Name</th>';
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Aadhar RefKey</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">DOB</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Gender</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">SC Agency Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Smart Centre Batch ID</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Batch Name</th>';

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment Latitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Start Assessment Longitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment Latitude</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">End Assessment Longitude</th>';
        

        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Sector Name </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Partner Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Centre ID</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Centre Name</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Tc State</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Tc District</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Tc Address</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Batch Start Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Batch End Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Prefered Assessment Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Prefered Assessment End Date</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Job Role</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Job Role Sector Type</th>';
        
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Training Type </th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Training Code</th>';
        vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Batch Scheme Component</th>';
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Total Eligible</th>';
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Total DropOut</th>';
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Total Not Appeared</th>';
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Total Assessed</th>';
       
        
        //vhtml = vhtml + '<th style="background-color:#c3dde0;border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">Stage of batch</th>';
        vhtml = vhtml + '</tr></thead><tbody>';
        angular.forEach($scope.AssessorListDetailExcel, function (value, index) {


            vhtml = vhtml + '<tr>';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.AssessorName + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.AadharRefKey + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.DOB + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Gender + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SCAgencyName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SmartCentreBatchID + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.BatchName + '</td> ';

            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessment + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessmentDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessmentLatitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.StartAssessmentLongitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessment + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessmentDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessmentLatitude + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.EndAssessmentLongitude + '</td> ';
            

            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SectorName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.PartnerName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SCCentreID + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.CentreName + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TcState + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TcDistrict + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TcAddress + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.BatchStartDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.BatchEndDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.PreferedAssessmentDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.PrefAssessmentEndDate + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.JobRole + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.JobroleSectorType + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TrainingType + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.TrainingCode + '</td> ';
            vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.BatchSchemeComponent + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SumofEnrolled + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SumofEligibleForAssessment + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SumofTotalDropOut + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SumofNotAppeared + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.SumofAssessed + '</td> ';
            //vhtml = vhtml + '  <td style="border-width: 1px;padding: 8px;border-style: solid;border-color: #a9c6c9;">' + value.Stageofbatch + '</td> ';
            vhtml = vhtml + ' </tr>';
        });
        vhtml = vhtml + '</tbody></table>';
        var html = vhtml;
        var blob = new Blob([html], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "AssessmentList.xls");
    };


}).factory('AssessmentSvc', function ($http, $window) { // explained about factory in Part2
    var fac = {};

    fac.GetAllAssessmentList = function (RefSectorID, RefJobRoleID, RefStateID, RefDistrictID, RefTCID, RefAgencyID, RefAssessorID, AssessmentType, BatchName, AssessmentDate, AssessmentEndDate, TrainingType, TrainingCode) {
        return $http.get("/AssessmentManagement/GetAllAssessmentList?RefSectorID=" + RefSectorID + '&RefJobRoleID=' + RefJobRoleID + '&RefStateID=' + RefStateID + '&RefDistrictID=' + RefDistrictID + '&RefTCID=' + RefTCID + '&RefAgencyID=' + RefAgencyID
            + '&RefAssessorID=' + RefAssessorID + '&AssessmentType=' + AssessmentType + '&BatchName=' + BatchName + '&AssessmentDate=' + AssessmentDate + '&AssessmentEndDate=' + AssessmentEndDate + '&TrainingType=' + TrainingType + '&TrainingCode=' + TrainingCode);
    };
    fac.BindStateDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + '&KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
    };
    fac.BindJobRoleDropdownList = function (Filter, ID) {
        return $http.get("/Home/BindCommonDropDown?Filter=" + Filter + '&KeyOne=' + ID + ' &Keytwo=' + '0' + ' &Keythree=' + '0');
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
    fac.GetPendingAssessmentDetailListByAssessorId = function (BatchName) {
        return $http.get('/AssessmentReport/GetPendingAssessmentDetailListByAssessorId?BatchName=' + BatchName);
    };
    fac.GetUpcomingAssessmentDetailListByAssessorId = function (BatchName) {
        return $http.get('/AssessmentReport/GetUpcomingAssessmentDetailListByAssessorId?BatchName=' + BatchName);
    };
    fac.GetQuestionDetailByAssessmentId = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetQuestionDetailByAssessmentId?AssessmentId=' + AssessmentId);
    };
    fac.GetEndAssessmentByAssessmentId = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetEndAssessmentByAssessmentId?AssessmentId=' + AssessmentId);
    };    
    fac.GetPhotographDetails = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetPhotographDetails?AssessmentId=' + AssessmentId);
    };
    fac.GetAssessmentDeviceDetail = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetAssessmentDeviceDetail?AssessmentId=' + AssessmentId);
    };
    fac.GetGeoLocation = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetGeoLocation?AssessmentId=' + AssessmentId);
    };
    fac.GetAssessmentStatusById = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetAssessmentStatusById?AssessmentId=' + AssessmentId);
    };
    fac.GetInprogessAssessment = function (BatchName) {
        return $http.get('/AssessmentReport/GetInprogessAssessment?BatchName=' + BatchName);
    };
    fac.GetEndAssessmentSummary = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetEndAssessmentSummary?AssessmentId=' + AssessmentId);
    };
    fac.GetInprogressAssessmentStatusById = function (AssessmentId) {
        return $http.get('/AssessmentReport/GetInprogressAssessmentStatusById?AssessmentId=' + AssessmentId);
    };
    fac.GetCandidateList = function (BatchId) {
        return $http.get('/AssessmentReport/GetCandidateList?BatchId=' + BatchId);
    };

    return fac;
});