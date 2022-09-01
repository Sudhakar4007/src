
var app = angular.module('app', ['datatables', 'ng-fusioncharts'])
.value('froalaConfig', {
    toolbarInline: false,
    toolbarSticky: false,
    placeholderText: 'Enter Text Here', 
    height: 300,
    tableResizerOffset: 10,
    tableResizingLimit: 50
    //
})
   .run(['$rootScope', '$http', function ($rootScope, $http) {

       $rootScope.UserResetPassword = function (Id) {
           alertify.confirm(' Reset Password', 'Are you sure want to reset the password?', function () {
               $http.get('/Account/UserResetPassword?UserID=' + Id).then(function (d) {
                   if (d.data.result) {
                       alertify.success(d.data.msg);
                   } else {
                       alertify.error(d.data.msg);
                       $scope.IsAdd = true;
                   }
               }, function (error) { });
           }, function () { }).set('labels', { ok: 'Yes', cancel: 'No' });
       }
       $rootScope.Logintype = $("#hdlogintype").val();
   }]);
app.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                changeYear: true,
                changeMonth: true,
                yearRange: "-100:+0",
                maxDate: '0'
            }).on('changeDate', function (e) {
                alert(attrs("dateFormat"))
                $('.day').click(function () {
                    $('.bootstrap-datetimepicker-widget').hide();
                });
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            }).on('keypress', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    $(this).find('input').blur();
                    $('.bootstrap-datetimepicker-widget').hide();
                }
            });
        }
    }
});

app.directive("mmdatepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                changeYear: true,
                changeMonth: true,
                yearRange: "-100:+20",
            }).on('changeDate', function (e) {
                alert(attrs("dateFormat"))
                $('.day').click(function () {
                    $('.bootstrap-datetimepicker-widget').hide();
                });
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            }).on('keypress', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    $(this).find('input').blur();
                    $('.bootstrap-datetimepicker-widget').hide();
                }
            });
        }
    }
});

app.directive("futdatepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                changeYear: true,
                changeMonth: true,
                yearRange: "-0:+20",
                minDate: '0'
            }).on('changeDate', function (e) {
                $('.day').click(function () {
                    $('.bootstrap-datetimepicker-widget').hide();
                });
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            }).on('keypress', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    $(this).find('input').blur();
                    $('.bootstrap-datetimepicker-widget').hide();
                }
            });
        }
    }
});

app.directive('ssnnumber', function () {

    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                var SSN_Number = new RegExp("\d{4}");
                if (inputValue != "") {
                    if (!SSN_Number.test(inputValue)) {
                        inputValue = (inputValue
                .match(/\d*/g).join('')
                .match(/(\d{0,4})/).slice(1).join('-')
                .replace(/-*$/g, ''));
                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                    }
                }
                return inputValue;
            });
        }
    };
});

app.directive('mobile', function () {

    return {
        restrict: 'A',
        require: "ngModel",
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    };
});

app.directive('ddlSelect', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {


            ngModel.$parsers.push(function (val) {
                return val == null ? 0 : parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                return val == null ? 0 : '' + val;
            });
        }
    };
});
app.directive('noSpecialChar', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == null)
                    return ''
                cleanInputValue = inputValue.replace(/[^\w\s]/gi, '');
                if (cleanInputValue != inputValue) {
                    modelCtrl.$setViewValue(cleanInputValue);
                    modelCtrl.$render();
                }
                return cleanInputValue;
            });
        }
    }
});
app.directive('pm', [function () {
    return {
        restrict: 'EAC',
        require: '?ngModel',
        replace: true,
        transclude: true,
        scope: {
            maxWordCount: '='
        },
        template: '<div><div class="top-row"><textarea  id="txtContent"></textarea></div><div class="status-bar" ng-show="showWordCount" style="float: right;">Total Word:{{wordCount}}</div><div ng-show="reachedLimit">You reached the limit!</div></div>',
        link: function (scope, elem, attr, ngModel) {
            scope.wordCount = 0;
            var ta = elem.find('textarea')[0];
            CKEDITOR.disableAutoInline = true;
            ck = CKEDITOR.replace(ta, { name: 'colors' });
            var maxWordCount = parseInt(scope.maxWordCount, 10);
            scope.showWordCount = true;
            scope.wordCountWarning = '';
            if (!ngModel) return;
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                var data = ck.getData();
                scope.wordCount = ($(data).text().match(/\S+/g) || []).length;
                console.log(scope.wordCount);
                scope.reachedLimit = (!isNaN(maxWordCount) && maxWordCount > 0 && scope.wordCount > maxWordCount);
                scope.$apply(function () {
                    ngModel.$setViewValue(data);
                    console.log(ngModel);
                });
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
}]);
app.directive('decimalPlaces', function () {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {

            element.on('keydown', function (event) {
                var keyCode = []
                if (attrs.allowNegative == "true") {
                    keyCode = [8, 9, 36, 35, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 109, 110, 173, 190, 189];
                }
                else {
                    var keyCode = [8, 9, 36, 35, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 173, 190];
                }


                if (attrs.allowDecimal == "false") {

                    var index = keyCode.indexOf(190);


                    if (index > -1) {
                        keyCode.splice(index, 1);
                    }

                }

                if ($.inArray(event.which, keyCode) == -1) event.preventDefault();
                else {
                    console.log(2);
                    var oVal = ngModelCtrl.$modelValue || '';
                    if ($.inArray(event.which, [109, 173]) > -1 && oVal.indexOf('-') > -1) event.preventDefault();
                    else if ($.inArray(event.which, [110, 190]) > -1 && oVal.indexOf('.') > -1) event.preventDefault();
                }
            })
            .on('blur', function () {

                if (element.val() == '' || parseFloat(element.val()) == 0.0 || element.val() == '-') {
                    ngModelCtrl.$setViewValue('0.00');
                }
                else if (attrs.allowDecimal == "false") {
                    ngModelCtrl.$setViewValue(element.val());
                }
                else {
                    if (attrs.decimalUpto) {
                        var fixedValue = parseFloat(element.val()).toFixed(attrs.decimalUpto);
                    }
                    else { var fixedValue = parseFloat(element.val()).toFixed(2); }
                    ngModelCtrl.$setViewValue(fixedValue);
                }



                ngModelCtrl.$render();
                scope.$apply();
            }
            );

            ngModelCtrl.$parsers.push(function (text) {
                var oVal = ngModelCtrl.$modelValue;
                var nVal = ngModelCtrl.$viewValue;
                console.log(nVal);
                if (parseFloat(nVal) != nVal) {

                    if (nVal === null || nVal === undefined || nVal == '' || nVal == '-') oVal = nVal;

                    ngModelCtrl.$setViewValue(oVal);
                    ngModelCtrl.$render();
                    return oVal;
                }
                else {
                    var decimalCheck = nVal.split('.');
                    if (!angular.isUndefined(decimalCheck[1])) {
                        if (attrs.decimalUpto)
                            decimalCheck[1] = decimalCheck[1].slice(0, attrs.decimalUpto);
                        else
                            decimalCheck[1] = decimalCheck[1].slice(0, 2);
                        nVal = decimalCheck[0] + '.' + decimalCheck[1];
                    }

                    ngModelCtrl.$setViewValue(nVal);
                    ngModelCtrl.$render();
                    return nVal;
                }
            });

            ngModelCtrl.$formatters.push(function (text) {
                if (text == '0' || text == null && attrs.allowDecimal == "false") return '0';
                else if (text == '0' || text == null && attrs.allowDecimal != "false" && attrs.decimalUpto == undefined) return '0.00';
                else if (text == '0' || text == null && attrs.allowDecimal != "false" && attrs.decimalUpto != undefined) return parseFloat(0).toFixed(attrs.decimalUpto);
                else if (attrs.allowDecimal != "false" && attrs.decimalUpto != undefined) return parseFloat(text).toFixed(attrs.decimalUpto);
                else return parseFloat(text).toFixed(2);
            });
        }
    };
});
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});
app.directive('hideZero', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function (inputValue) {
                if (inputValue == 0) {
                    return '';
                }
                return inputValue;
            });
            ngModel.$parsers.push(function (inputValue) {
                if (inputValue == 0) {
                    ngModel.$setViewValue('');
                    ngModel.$render();
                }
                return inputValue;
            });
        }
    }
});

app.directive('chars', function () {

    /* RegEx Examples:
        - email: "0-9a-zA-Z@._\-"
        - numbers only: "0-9"
        - letters only: "a-zA-Z"
        Email Usage Example:
        <input type="text" name="email" ng-model="user.email" chars="0-9a-zA-Z@._\-" />
    */
    'use strict';
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function ($scope, $elem, attrs, ctrl) {

            var regReplace,
                preset = {
                    'only-numbers': '0-9',
                    'numbers': '0-9\\s',
                    'only-letters': 'A-Za-z',
                    'letters': 'A-Za-z\\s',
                    'email': '\\wÑñ@._\\-',
                    'alpha-numeric': '\\w\\s',
                    'latin-alpha-numeric': '\\w\\sÑñáéíóúüÁÉÍÓÚÜ´¨',
                    'no-space': /^\S*$/
                },
                filter = preset[attrs.chars] || attrs.chars;

            $elem.on('input', function () {
                regReplace = new RegExp('[^' + filter + ']', 'ig');
                ctrl.$setViewValue($elem.val().replace(regReplace, ''));
                ctrl.$render();
            });

        }
    };

});
app.directive('allowDecimalNumbers', function () {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '')
                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
});
app.directive('routeLoadingIndicator', function ($rootScope) {
    return {
        restrict: 'E',
        template: '<div ng-show="isStateLoading" class="loaderContainer"><div id="loading-bar-spinner"><div class="spinner-icon"></div></div></div>',
        replace: true,
        link: function (scope, elem, attrs) {
            scope.isStateLoading = false;
            $rootScope.$on('$routeChangeStart', function () {
                scope.isStateLoading = true;
            });
            $rootScope.$on('$routeChangeSuccess', function () {
                scope.isStateLoading = false;
            });
        }
    };
});

app.directive('phoneInput', function ($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var listener = function () {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
            });

            ngModelCtrl.$render = function () {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function (event) {
                var key = event.keyCode;
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
                    return;
                }
                $browser.defer(listener);
            });

            $element.bind('paste cut', function () {
                $browser.defer(listener);
            });
        }

    };
})
.filter('tel', function () {
    return function (tel) {

        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if (number) {
            if (number.length > 3) {
                number = number.slice(0, 3) + '-' + number.slice(3, 7);
            }
            else {
                number = number;
            }
            return (city + "-" + number).trim();
        }
        else {
            return city;
        }

    };
}).filter('split', function () {
    return function (input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
    }
})
app.filter('strReplace', function () {
    return function (input, from, to) {
        input = input || '';
        from = from || '';
        to = to || '';
        return input.replace(new RegExp(from, 'g'), to);
    };
});
app.filter('limitTocustom', function () {
    'use strict';
    return function (input, limit) {
        if (input) {
            if (limit > input.length) {
                return input.slice(0, limit);
            } else {
                return input.slice(0, limit) + '...';
            }
        }
    };
});
app.filter('sce', ['$sce', function ($sce) {
    return $sce.trustAsHtml;
}]);
app.filter('thousandSuffix', function () {
    return function (input, decimals) {
        var exp, rounded,
          suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];

        if (window.isNaN(input)) {
            return null;
        }

        if (input < 1000) {
            return input;
        }

        exp = Math.floor(Math.log(input) / Math.log(1000));

        return (input / Math.pow(1000, exp)).toFixed(decimals) + suffixes[exp - 1];
    };
});

app.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            ctx = { worksheet: worksheetName, table: tableId },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
});


app.directive('disallowSpaces', function () {
    return {
        restrict: 'A',
        link: function ($scope, $element) {
            $element.bind('input', function () {
                if (!isEmpty($(this).val())) {
                    var s = $(this).val();
                    s = s.replace(/^(\s)/, "");
                    s = s.replace(/[ ]{2,}/gi, " ");
                    s = s.replace(/\n /, "\n");
                    $(this).val(s)
                }
            });
        }
    };
});

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };

}]);

app.directive('ddTextCollapse', ['$compile', function ($compile) {


    return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {


            /* start collapsed */
            scope.collapsed = false;


            /* create the function to toggle the collapse */
            scope.toggle = function () {
                scope.collapsed = !scope.collapsed;
            };


            /* wait for changes on the text */
            attrs.$observe('ddTextCollapseText', function (text) {


                /* get the length from the attributes */
                var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);


                if (text.length > maxLength) {
                    /* split the text in two parts, the first always showing */
                    var firstPart = String(text).substring(0, maxLength);


                    var secondPart = String(text).substring(maxLength, text.length);


                    /* create some new html elements to hold the separate info */
                    var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
                    var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + ' </span>')(scope);
                    var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
                    var lineBreak = $compile('<br ng-if="collapsed">')(scope);
                    var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()"> <span ng-if="collapsed">  <i class="fa fa-low-vision" title="Less Text"></i>  </span> <span ng-if="!collapsed"> <i class="fa fa-eye" title="Read More"></i>  </span></span>')(scope);
                    // var toggleButtonEnd = 

                    /* remove the current contents of the element
                     and add the new ones we created */
                    element.empty();
                    element.append(firstSpan);
                    element.append(secondSpan);
                    element.append(moreIndicatorSpan);
                    // element.append(lineBreak);
                    element.append(toggleButton);
                }
                else {
                    element.empty();
                    element.append(text);
                }
            });
        }
    };
}])

app.factory('Excel', function ($window) {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
    return {
        tableToExcel: function (tableId, worksheetName) {
            var table = $(tableId),
                ctx = { worksheet: worksheetName, table: table.html() },
                href = uri + base64(format(template, ctx));
            return href;
        }
    };
})
app.directive('onlyLettersInput', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                var transformedInput = text.replace(/[^a-zA-Z]*$/g, '');
                //console.log(transformedInput);
                if (transformedInput !== text) {
                    ngModelCtrl.$setViewValue(transformedInput);
                    ngModelCtrl.$render();
                }
                return transformedInput;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
//var timeInSecondsAfterSessionOut = 30; // change this to change session time out (in seconds).
//var secondTick = 0;

//function ResetThisSession() {
//    secondTick = 0;
//}

//function StartThisSessionTimer() {
//    secondTick++;
//    var timeLeft = ((timeInSecondsAfterSessionOut - secondTick) / 60).toFixed(0); // in minutes
//    timeLeft = timeInSecondsAfterSessionOut - secondTick; // override, we have 30 secs only 

//    $("#spanTimeLeft").html(timeLeft);

//    if (secondTick > timeInSecondsAfterSessionOut) {
//        clearTimeout(tick);
//        window.location = "/Logout.aspx";
//        return;
//    }
//    tick = setTimeout("StartThisSessionTimer()", 1000);
//}

//StartThisSessionTimer();


function isEmpty(str) {
    return (!str || 0 === str.length);
}
function ifNull(str) {
    if (str === undefined || str === null) {
        return "";
    }
    return str;
}