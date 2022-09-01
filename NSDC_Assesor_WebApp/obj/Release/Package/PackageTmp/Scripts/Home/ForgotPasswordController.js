app.controller("ForgotPasswordContoller", function ($scope, ForgotPasswordService) {


    function ClearForm() {
        $scope.User = {
            Email: '',
            NewPassword: '',
            ConfirmPassword:''

        };      
    }
    ClearForm();

    function ClearFormEmail() {
        $scope.Details = {
            NewPassword: '',
            ConfirmPassword:'',
            Email: ''

        };
    }
    ClearFormEmail();

    $scope.Close = function () {
        ClearForm();
    };

    $scope.SavePassword = function () {
        debugger;
        if (ValidateFrom()) {
            ForgotPasswordService.SaveFormData($scope.User).then(function (d) {
                if (d.data.success) {
                    alertify.success('Password has been changed successfully.');
                    ClearForm();
                }
                else {
                    alertify.error(d.data.msg);
                }
            }, function (error) {

            });
        }
    };
    $scope.SaveForgotPassword = function () {
        debugger;
        if (ValidateFrom1()) {
            ForgotPasswordService.SendEmail($scope.Details.Email).then(function (d) {
                if (d.data.success) {
                    alertify.success('Request has been sent successfully.');
                    ClearFormEmail();
                }
                else {
                    alertify.error(d.data.msg);
                }
            }, function (error) {

            });
        }
    };
    function ValidateFrom() {
        var IsValid = true;
        var errorMsg = "";      
        //if (isEmpty($scope.User.Email)) {
        //    errorMsg += "Please Enter Email address.<br/>";
        //    IsValid = false;
        //}
        if (isEmpty($scope.User.NewPassword)) {
            errorMsg += "Please Enter New Password.<br/>";
            IsValid = false;
        }
        if (isEmpty($scope.User.ConfirmPassword)) {
            errorMsg += "Please Enter Confirm Password.<br/>";
            IsValid = false;
        }
        if ($scope.User.NewPassword!=$scope.User.ConfirmPassword) {
            errorMsg += "New Password and Confirm Password must be same.<br/>";
            IsValid = false;
        }
        
        if (!IsValid)
            alertify.error(errorMsg);
        return IsValid;
    }
    function ValidateFrom1() {
        var IsValid = true;
        var errorMsg = "";
        if (isEmpty($scope.Details.Email)) {
            errorMsg += "Please Enter Email address.<br/>";
            IsValid = false;
        }     
        if (!IsValid)
            alertify.error(errorMsg);
        return IsValid;
    }

}).factory('ForgotPasswordService', function ($http, $window) { // explained about factory in Part2
    var fac = {};
    fac.SaveFormData = function (data) {
        return $http.post("/Home/SaveChangedPassword", data);
    }; 
    fac.SendEmail = function (data) {
        return $http.post("/Home/SendEmail", data);
    }; 
    return fac;
});