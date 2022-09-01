app.controller("PendingEndAssessmentController", function ($scope, EndAssessment) {

    $scope.Logintype1 = $('#logintype').val();
    function ClearForm() {
        $scope.Agency = {           
            AssessorID: 0
        };

    }
    ClearForm();
    // Started AssessmentList that has not been ended.
    $scope.StartedAssessment = [];
    $scope.GetStartedAssessmentList = function () {
        EndAssessment.GetStartedAssessmentList().then(function (d) {
            $scope.StartedAssessment = d.data;
        });
    };
    $scope.GetStartedAssessmentList();
    $scope.SaveStartedAssessment = function () {
        EndAssessment.SaveFormData().then(function (d) {
            if (d.data.success) {
                alertify.success(d.data.msg);
                $scope.GetStartedAssessmentList();
                ClearForm();
            }
            else {
                alertify.error(d.data.msg);
            }
        }, function (error) {

        });

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
        angular.forEach($scope.StartedAssessment, function (u) {
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

    $scope.EndOngoingAssessment = function () {
        var Id = checkedValues.toString();
        if (Id != "") {
            EndAssessment.SaveEndOngoingAssessment(Id).then(function (d) {
                if (d.data.msg == "success") {
                    $scope.GetStartedAssessmentList();
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

}).factory('EndAssessment', function ($http, $window) { 
    var fac = {};

    fac.GetStartedAssessmentList = function () {
        return $http.get('/AssessmentReport/GetStartedAssessmentList');
    };
    fac.SaveFormData = function () {
        return $http.post("/AssessmentManagement/SaveStartedAssessment");
    };
    fac.SaveEndOngoingAssessment = function (Id) {
        return $http.post("/Home/SaveEndOngoingAssessment?Id=" + Id);
    };
    return fac;
});