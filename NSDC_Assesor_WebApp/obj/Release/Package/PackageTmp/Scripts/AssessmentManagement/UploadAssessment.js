app.controller("UploadAssessmentController", function ($scope, UploadAssessmentSvc) {
    $scope.IsAdd = false;
  
    $scope.UploadFile = function () {
        if (ValidateFrom()) {
            var data = new FormData();
            var FIleUpload = "fileUpload";
            var files = $('#' + FIleUpload).get(0).files;
            data.append("UploadFile", files[0]);
          
            setTimeout(function () {
                $.ajax({
                    type: "POST",
                    url: "/AssessmentManagement/BulkUploadFile",
                    data: data,
                    contentType: false,
                    processData: false,
                    dataType: 'json',
                    async: false,
                    success: function (d) {
                        if (d.success === true) {                                                            
                            alertify.success('Record Saved successfully.');
                            $('#fileUpload').val('');
                        }
                        else {
                            alertify.error('Some error occured');
                        }
                    },
                    error: function (data) {                     
                        alertify.error('Some error occured');
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
                alertify.error("Please Upload Biometric file.");
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
    $scope.Close = function () {
        $('#fileUpload').val('');
    }

    $scope.DownloadFile = function (url) {
        window.location.href = url;
    }



}).factory('UploadAssessmentSvc', function ($http, $window) { // explained about factory in Part2
    var fac = {};
  
    return fac;
});