app.controller("ChangePasswordContoller", function ($scope, ChangePasswordService) {


    function ClearForm() {
        $scope.User = {
            OldPassword: '',
            NewPassword: '',
            ConfirmPassword: ''

        };      
    }
    ClearForm();

    $scope.Close = function () {
        ClearForm();
    };

    $scope.SavePassword = function () {
        if (ValidateFrom()) {
            ChangePasswordService.SaveFormData($scope.User).then(function (d) {
                if (d.data.success) {
                    alertify.success('Password has been changed successfully.');
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
        if (isEmpty($scope.User.OldPassword)) {
            errorMsg += "Please Enter Old Password.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.NewPassword)) {
            errorMsg += "Please Enter New Password.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.ConfirmPassword)) {
            errorMsg += "Please Enter Confirm Password.<br/>";
            IsValid = false;
        }
        if ($scope.User.NewPassword != $scope.User.ConfirmPassword ) {
            errorMsg += "New Password and Confirm Password must be same.<br/>";
            IsValid = false;
        }
        if ($scope.User.OldPassword==$scope.User.NewPassword) {
            errorMsg += "Old Password and New Password  must not be same.<br/>";
            IsValid = false;
        }
        if (!IsValid)
            alertify.error(errorMsg);
        return IsValid;
    }

}).factory('ChangePasswordService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/Home/SavePasswordDetails", data);
    };   
    return fac;
});