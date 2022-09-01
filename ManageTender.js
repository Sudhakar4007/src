var _TargetsDistricWiseArray = new Array();
var _tbl_ProjectCandidateProposedArray = new Array();
var _ManageTender = function () {

    this.hdnRecordId = $("#hdnRecordId");
    this.tempId = "";
    this.tempModel = "";

    this.txtTenderID = $("#txtTenderID");
    this.txtTenderNo = $("#txtTenderNo");
    this.txtTenderTitle = $("#txtTenderTitle");
    this.txtTenderCreationDate = $("#txtTenderCreationDate");
    this.txtSectionName = $("#txtSectionName");
    this.txtEvaluationType = $("#txtEvaluationType");
    this.txtAllocatedBudget = $("#txtAllocatedBudget");
    this.txtTenderDescription = $("#txtTenderDescription");
    this.txtEstimatedValue = $("#txtEstimatedValue");
    this.btnDistrictdelete = $("#btnDistrictdelete");


    this.ddlTenderDepartmentList = $("#ddlTenderDepartmentList");
    this.ddlTenderTypeList = $("#ddlTenderTypeList");
    this.ddlVenderTypeList = $("#ddlVenderTypeList");
    this.ddlTenderCategoryList = $("#ddlTenderCategoryList");
    this.ddlTenderEnvelopList = $("#ddlTenderEnvelopList");
    this.ddlBidValidityPeriod = $("#ddlBidValidityPeriod");
    this.ddlCurrency = $("#ddlCurrency");

    this.hdnTenderDocID = $("#hdn-Tender");
    this.hdnTenderPriceBidDocID = $("#hdn-TenderPriceBid");

    this.ddlIsTenderFees = $("#ddlIsTenderFees");
    this.ddlIsEMDFees = $("#ddlIsEMDFees");



    this.txtTenderFeesAmount = $("#txtTenderFeesAmount");
    this.txtEMDAmount = $("#txtEMDAmount");
    this.txtPayable = $("#txtPayable");
    this.hdnDDDocID = $("#hdn-ddupload");
    this.hdnBGDocID = $("#hdn-bgupload");
    this.ddlfiletype = $("#ddlfiletype");



    this.txtTenderStartDate = $("#txtTenderStartDate");
    this.txtTenderEndDate = $("#txtTenderEndDate");
    this.txtBidStartDate = $("#txtBidStartDate");
    this.txtBidEndDate = $("#txtBidEndDate");
    this.txtTechnicalBidStartDate = $("#txtTechnicalBidStartDate");
    this.txtFinancialBidStartDate = $("#txtFinancialBidStartDate");
    this.txtAdress = $("#txtAdress");


    this.linkVendorFromStep1Submit = $("#linkVendorFromStep1Submit");
    this.linkVendorFromTenderDocumentSubmit = $("#linkVendorFromTenderDocumentSubmit");
    this.linkVendorFromCalendarDateSubmit = $("#linkVendorFromCalendarDateSubmit");
    this.linkVendorFromTenderFeeSubmit = $("#linkVendorFromTenderFeeSubmit");

    this.linkVendorFromTenderFinalSubmit = $("#linkVendorFromTenderFinalSubmit");


    this.txtcriteria = $("#txtcriteria");
    this.hdncriteriaupload = $("#hdn-criteriaupload");
    this.linkVendorFromTenderFeeEC = $("#linkVendorFromTenderFeeEC");
    this.btnAddCriteria = $("#btnAddCriteria");
    this.linkVendorNext = $("#linkVendorNext");
    this.linkVendorFromTenderDocumentSubmitNextinsert = $("#linkVendorFromTenderDocumentSubmitNextinsert");
    this.linkVendorFromTenderFeeSubmitNextinsert = $("#linkVendorFromTenderFeeSubmitNextinsert");
    this.linkVendorFromCalendarDateSubmitNextinsert = $("#linkVendorFromCalendarDateSubmitNextinsert");

    this.linkVendorFromTenderFeeECBack = $("#linkVendorFromTenderFeeECBack");
    this.linkVendorFromCalendarDateSubmitNext = $("#linkVendorFromCalendarDateSubmitNext");
    this.linkVendorFromCalendarDateSubmitBack = $("#linkVendorFromCalendarDateSubmitBack");
    this.linkVendorFromTenderFeeSubmitNext = $("#linkVendorFromTenderFeeSubmitNext");
    this.linkVendorFromTenderFeeSubmitBack = $("#linkVendorFromTenderFeeSubmitBack");
    this.linkVendorFromTenderDocumentSubmitBack = $("#linkVendorFromTenderDocumentSubmitBack");
    this.linkVendorFromTenderDocumentSubmitNext = $("#linkVendorFromTenderDocumentSubmitNext");
    this.linkVendorNextview = $("#linkVendorNextview");
<<<<<<< .mine
    this.btnAdd = $("#btnAdd");

||||||| .r100
    
=======
    this.btnAdd = $("#btnAdd");
    
>>>>>>> .r103
};


_ManageTender.prototype.BindEvents = function () {

    var h = this;
<<<<<<< .mine
    //var _TargetsDistricWiseArray = new Array();
||||||| .r100
    var _TargetsDistricWiseArray = new Array();
=======
   //var _TargetsDistricWiseArray = new Array();
>>>>>>> .r103
    if ($("#hdnRecordAction").val() == "PendingView") {
        h.GetTenderDetail();
        $("#custom-tabs-four-tabContent :input").prop("disabled", true);
        $("#aDelete-Tender,#aDelete-TenderPriceBid,#aDelete-ddupload,#aDelete-bgupload,#aDelete-criteriaupload").css("display", "none");
    }
    else {

        h.BindTenderDepartmentList();
        h.BindTenderTypeList();
        h.BindTenderCategoryList();
        h.BindTenderEnvelopTypeList();
        h.BindBidValidityPeriodList();
        h.ShowHideBasicControl();
        h.BindTenderCurrencyList();
        h.BindVenderTypeList();

        h.GetTenderDetail();

        EnableFormControl();
    }

    function EnableFormControl() {

        if (parseInt(h.hdnRecordId.val()) === 0) {
            $("#Tender_step_2-tab").addClass('disabled');
            $("#Tender_step_3-tab").addClass('disabled');
            $("#Tender_step_4-tab").addClass('disabled');
        }
    }


    $("#Tender_step_3-tab").click(function () {
        if ($("#Tender_step_2").css("display") == "block") {
            $("#Tender_step_2").css("display", "none")
        }
    });
    $("#Tender_step_3-tab,#Tender_step_4-tab,#Tender_step_5-tab").click(function () {
        if ($("#Tender_step_2").css("display") == "block") {
            $("#Tender_step_2").css("display", "none")
        }
    });


    h.ddlIsTenderFees.change(function () {
        h.ShowHideBasicControl();
    });

    h.ddlIsEMDFees.change(function () {
        h.ShowHideBasicControl();
    })

    $(".UploadDocument").click(function () {
        var ContId = $(this).attr("id");
        var parts = ContId.split('-');
        if (parts[1] != '' || parts[1] != undefined) {
            var SystemProcesses = 'Tender';
            var Document_Category = 'Tender';
            var Document_Type = parts[1];
            var Document_Exts = "";
            var DoUniqueCode = "";
            var Section = '';
            var FileUpload = "fileUpload-" + parts[1];
            var aView = "aViewUpload-" + parts[1];
            var aDeleteDoc = "aDelete-" + parts[1];
            var DocId = "hdn-" + parts[1];
            var lblDocName = "lblDocName-" + parts[1];
            UploadFormDocumentForNonLogIn(SystemProcesses, Document_Category, Document_Type, Document_Exts, Section, FileUpload, aView, DocId, aDeleteDoc, lblDocName, DoUniqueCode);
            $("#fileUpload-" + parts[1]).val("");
        }
    });
    $(".DeleteViewDocument").click(function () {
        var ContId = $(this).attr("id");
        var parts = ContId.split('-');
        if (parts[1] != '' || parts[1] != undefined) {
            var aView = "aViewUpload-" + parts[1];
            var DocId = "hdn-" + parts[1];
            $('#' + aView).css("display", "none");
            $('#' + DocId).val("");
            $('#' + ContId).css("display", "none");
            $("#fileUpload-" + parts[1]).val("");
        }
    });

<<<<<<< .mine

    h.btnAdd.on("click", function () {
        var model = {
            // Srno: $("#Hiddensr").val(),
            TenderID: parseInt(h.hdnRecordId.val()),
            Criteria: (h.txtcriteria.val()),
            RequiredDocument: RequiredDoc


            //District_Name: $('#ddlproposedistrict option:selected').text(),
            // StateId: $("#ddlstate").val(),
            // TargetBeneficiary: $('#txtTarget').val(),
            // DistrictId: $("#ddlproposedistrict").val() == "ALL" ? null : $("#ddlproposedistrict").val(),
            // ProjectId: $("#hdnPropMaster_Id").val(),
        };
        _TargetsDistricWiseArray.push(model);
        CreateTargetDistrictTable(_TargetsDistricWiseArray);
        //$("#ddlproposedistrict").val(0);
        $("#txtcriteria").val('');

    });

||||||| .r100
=======

    h.btnAdd.on("click", function () {
        var model = {
           // Srno: $("#Hiddensr").val(),
            TenderID: parseInt(h.hdnRecordId.val()),
            Criteria: (h.txtcriteria.val()),
           RequiredDocument: RequiredDoc
         
    
            //District_Name: $('#ddlproposedistrict option:selected').text(),
           // StateId: $("#ddlstate").val(),
           // TargetBeneficiary: $('#txtTarget').val(),
           // DistrictId: $("#ddlproposedistrict").val() == "ALL" ? null : $("#ddlproposedistrict").val(),
           // ProjectId: $("#hdnPropMaster_Id").val(),
        };
        _TargetsDistricWiseArray.push(model);
        CreateTargetDistrictTable(_TargetsDistricWiseArray);
        //$("#ddlproposedistrict").val(0);
        $("#txtcriteria").val('');

    });

>>>>>>> .r103
    h.linkVendorFromStep1Submit.click(function () {



        if (ValidateVendorFromStep1()) {
            h.InsertUpdateTenderBasicInformation();
        }

    });

    $("#btnclose").click(function () {
        goToPage();
    });
    $(".table").on('click', '#btnDistrictdelete', function () {
        $(this).closest('tr').remove();
    });

<<<<<<< .mine
    /*   $("#btnDistrictdelete").click(function () {*/
    $(".table").on('click', '#btnDistrictdelete', function () {
        var IDA = $(this).attr("data-id")
        if (gvVendorFromTender.length == 1) {
            gvVendorFromTender.splice(IDA, 1);
            createVendorFromTenderTable();
        }
        else {
            gvVendorFromTender.splice(IDA, 1);
            createVendorFromTenderTable();
        }
    });
    //h.btnDistrictdelete.click(function () {
    //    //if (confirm("Are you sure you want to delete ?")) {
    //    //    h.tempId = $(this).attr('data-id');
    //    //    _TargetsDistricWiseArray.splice(h.tempId, 1);
    //    //    CreateTargetDistrictTable();
    //    //}
||||||| .r100
=======
    h.btnDistrictdelete.click(function () {
        if (confirm("Are you sure you want to delete ?")) {
            h.tempId = $(this).attr('data-id');
            _TargetsDistricWiseArray.splice(h.tempId, 1);
            CreateTargetDistrictTable();
        }
>>>>>>> .r103

<<<<<<< .mine
    //});


||||||| .r100
=======
    });


>>>>>>> .r103
    h.linkVendorNext.click(function () {
        if (ValidateVendorFromStep1()) {

            $(".nav-link").removeClass("active");
            $("#Tender_step_1").removeClass("active");
            $("#Tender_step_1").removeClass("show");
            $("#Tender_step_1").hide();
            $("#Tender_step_2").show();
            $("#Tender_step_2").addClass("active");
            $("#Tender_step_2").addClass("show");
            $("#Tender_step_2-tab").addClass("active");
        }
    });

    h.linkVendorNextview.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_1").removeClass("active");
        $("#Tender_step_1").removeClass("show");
        $("#Tender_step_1").hide();
        $("#Tender_step_2").show();
        $("#Tender_step_2").addClass("active");
        $("#Tender_step_2").addClass("show");
        $("#Tender_step_2-tab").addClass("active");

    });

    h.linkVendorFromTenderDocumentSubmitBack.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_2,#Tender_step_3,#Tender_step_4,#Tender_step_5").removeClass("active");
        $("#Tender_step_2,#Tender_step_3,#Tender_step_4,#Tender_step_5").removeClass("show");
        $("#Tender_step_2,#Tender_step_3,#Tender_step_4,#Tender_step_5").hide();
        $("#Tender_step_1").show();
        $("#Tender_step_1").addClass("active");
        $("#Tender_step_1").addClass("show");
        $("#Tender_step_1-tab").addClass("active");

    });

    h.linkVendorFromTenderDocumentSubmitNextinsert.click(function () {

        if (ValidateVendorDocument()) {
            h.InsertUpdateTenderDocument();
            //$('#Tender_step_3-tab').toggleClass('active');

            $(".nav-link").removeClass("active");
            $("#Tender_step_1").removeClass("active");
            $("#Tender_step_2").removeClass("active");
            $("#Tender_step_1").removeClass("show");
            $("#Tender_step_2").removeClass("show");
            $("#Tender_step_1").hide();
            $("#Tender_step_2").hide();
            $("#Tender_step_3").show();
            $("#Tender_step_3").addClass("active");
            $("#Tender_step_3").addClass("show");
            $("#Tender_step_3-tab").addClass("active");
        }

    });

    h.linkVendorFromTenderDocumentSubmitNext.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_1").removeClass("active");
        $("#Tender_step_2").removeClass("active");
        $("#Tender_step_1").removeClass("show");
        $("#Tender_step_2").removeClass("show");
        $("#Tender_step_1").hide();
        $("#Tender_step_2").hide();
        $("#Tender_step_3").show();
        $("#Tender_step_3").addClass("active");
        $("#Tender_step_3").addClass("show");
        $("#Tender_step_3-tab").addClass("active");

    });

    h.linkVendorFromTenderFeeSubmitBack.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_1,#Tender_step_3,#Tender_step_4,#Tender_step_5").removeClass("active");
        $("#Tender_step_1,#Tender_step_3,#Tender_step_4,#Tender_step_5").removeClass("show");
        $("#Tender_step_1,#Tender_step_3,#Tender_step_4,#Tender_step_5").hide();
        $("#Tender_step_2").show();
        $("#Tender_step_2").addClass("active");
        $("#Tender_step_2").addClass("show");
        $("#Tender_step_2-tab").addClass("active");

    });

    h.linkVendorFromTenderFeeSubmitNextinsert.click(function () {

        if (ValidateVendorFromFee()) {
            h.InsertUpdateTenderFeeSubmit();
            //$('#Tender_step_4-tab').toggleClass('active');

            $(".nav-link").removeClass("active");
            $("#Tender_step_1,#Tender_step_2,#Tender_step_3").removeClass("active");
            $("#Tender_step_1,#Tender_step_2,#Tender_step_3").removeClass("show");
            $("#Tender_step_1,#Tender_step_2,#Tender_step_3").hide();
            $("#Tender_step_4").show();
            $("#Tender_step_4").addClass("active");
            $("#Tender_step_4").addClass("show");
            $("#Tender_step_4-tab").addClass("active");

        }

    });

    h.linkVendorFromTenderFeeSubmitNext.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3").removeClass("show");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3").hide();
        $("#Tender_step_4").show();
        $("#Tender_step_4").addClass("active");
        $("#Tender_step_4").addClass("show");
        $("#Tender_step_4-tab").addClass("active");

    });
    h.linkVendorFromCalendarDateSubmitBack.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_4,#Tender_step_5").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_4,#Tender_step_5").removeClass("show");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_4,#Tender_step_5").hide();
        $("#Tender_step_3").show();
        $("#Tender_step_3").addClass("active");
        $("#Tender_step_3").addClass("show");
        $("#Tender_step_3-tab").addClass("active");

    });

    h.linkVendorFromCalendarDateSubmitNextinsert.click(function () {

        if (ValidateVendorFromCalendarDate()) {
            h.InsertUpdateTenderCalendarDateSubmit();
            //$('#Tender_step_5-tab').toggleClass('active');

            $(".nav-link").removeClass("active");
            $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_4").removeClass("active");
            $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_4").removeClass("show");
            $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_4").hide();
            $("#Tender_step_5").show();
            $("#Tender_step_5").addClass("active");
            $("#Tender_step_5").addClass("show");
            $("#Tender_step_5-tab").addClass("active");
        }

    });


    h.linkVendorFromCalendarDateSubmitNext.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_4").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_4").removeClass("show");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_4").hide();
        $("#Tender_step_5").show();
        $("#Tender_step_5").addClass("active");
        $("#Tender_step_5").addClass("show");
        $("#Tender_step_5-tab").addClass("active");

    });

    h.linkVendorFromTenderFeeECBack.click(function () {
        $(".nav-link").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_5").removeClass("active");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_5").removeClass("show");
        $("#Tender_step_1,#Tender_step_2,#Tender_step_3,#Tender_step_5").hide();
        $("#Tender_step_4").show();
        $("#Tender_step_4").addClass("active");
        $("#Tender_step_4").addClass("show");
        $("#Tender_step_4-tab").addClass("active");

    });



    $('#ddlfiletype').on('change', function () {
        if (this.value == 'DD') {
            $("#DDdoc").show();
            $("#bgdoc").hide();
        }
        else if (this.value == 'BG') {
            $("#bgdoc").show();
            $("#DDdoc").hide();

        }
        else {
            $("#bgdoc").hide();
            $("#DDdoc").hide();
        }
    });

    $('#ddlTenderTypeList').on('change', function () {
        if (this.value == 1) {
            //var popup = document.getElementById("myPopup");
            //popup.classList.toggle("show");
            $("#PlacementModal").css("z-index", "9991");

        }
        else if (this.value == 2) {
            //var popup1 = document.getElementById("myPopup");
            //popup1.classList.toggle("show");

            $("#PlacementModal").css("z-index", "9991");
        }

    });

    $('input[name="Mode"]').click(function () {
        if ($(this).attr('id') == 'OnlineMode') {
            $('#lbladdress').show();
            $('#txtaddressmode').show();
        }

        else {
            $('#lbladdress').hide();
            $('#txtaddressmode').hide();
        }
    });

    $('input[name="RequiredDoc"]').click(function () {
        if ($(this).attr('id') == 'DocYes') {
            $('#lblcriteria').show();
            $('#tdcriteria').show();
        }

        else {
            $('#lblcriteria').hide();
            $('#tdcriteria').hide();
        }
    });

    h.btnAddCriteria.click(function () {
        //var h = this
        //var RequiredDoc = '';
        //$("input[name=RequiredDoc]:checked").each(function () {
        //    RequiredDoc = $(this).val();

<<<<<<< .mine
        //});
        //var model = {
        //    Srno: $("#Hiddensr").val(),
        //    TenderID: $("#hdnRecordId").val(),
        //    Criteria: $("#txtcriteria").val(),
        //    RequiredDocument: RequiredDoc,
        //    //DocumentId: parseInt(h.hdncriteriaupload.val()),
        //};
        //_TargetsDistricWiseArray.push(model);
        //var total = 0;
        //var stateId = 0;
        //CreateTargetDistrictTable(_TargetsDistricWiseArray);
        AddVendorFromTenderDetail();
||||||| .r100
        });
        var model = {
            Srno: $("#Hiddensr").val(),
            TenderID: $("#hdnRecordId").val(),
            Criteria: $("#txtcriteria").val(),
            RequiredDocument: RequiredDoc,
            //DocumentId: parseInt(h.hdncriteriaupload.val()),
        };
        _TargetsDistricWiseArray.push(model);
        var total = 0;
        var stateId = 0;
        h.CreateTargetDistrictTable(_TargetsDistricWiseArray);
=======
        });
        var model = {
            Srno: $("#Hiddensr").val(),
            TenderID: $("#hdnRecordId").val(),
            Criteria: $("#txtcriteria").val(),
            RequiredDocument: RequiredDoc,
            //DocumentId: parseInt(h.hdncriteriaupload.val()),
        };
        _TargetsDistricWiseArray.push(model);
        var total = 0;
        var stateId = 0;
        CreateTargetDistrictTable(_TargetsDistricWiseArray);
>>>>>>> .r103

    });


    function ValidateVendorFromStep1() {
        var IsValid = true;
        var errorMsg = '';
        var IsValidchecbox = false;

        if (h.txtTenderID.val() == '') {
            errorMsg = errorMsg + "Please Enter Tender ID. <br/>";
            IsValid = false;
        }
        if (h.txtTenderNo.val() == '') {
            errorMsg = errorMsg + "Please Enter Tender No. <br/>";
            IsValid = false;
        }
        if (h.txtTenderTitle.val() == '') {
            errorMsg = errorMsg + "Please Enter Tender Title. <br/>";
            IsValid = false;
        }
        if (isNon(h.ddlTenderTypeList.val()) == '0') {
            errorMsg = errorMsg + "Please Select Tender Type. <br/>";
            IsValid = false;
        }
        if (isNon(h.ddlTenderDepartmentList.val()) == '0') {
            errorMsg = errorMsg + "Please Select Department. <br/>";
            IsValid = false;
        }
        if (isNon(h.ddlTenderCategoryList.val()) == '0') {
            errorMsg = errorMsg + "Please Select Procurement Category. <br/>";
            IsValid = false;
        }
        if (isNon(h.ddlTenderEnvelopList.val()) == '0') {
            errorMsg = errorMsg + "Please Select Envelop type. <br/>";
            IsValid = false;
        }
        if (h.txtEstimatedValue.val() == '') {
            errorMsg = errorMsg + "Please Enter Estimated Value. <br/>";
            IsValid = false;
        }
        if (h.txtTenderCreationDate.val() == '') {
            errorMsg = errorMsg + "Please Enter Tender Creation Date. <br/>";
            IsValid = false;
        }
        if (h.txtSectionName.val() == '') {
            errorMsg = errorMsg + "Please Enter Section Name. <br/>";
            IsValid = false;
        }
        if (h.txtEvaluationType.val() == '') {
            errorMsg = errorMsg + "Please Enter Evaluation Type. <br/>";
            IsValid = false;
        }
        if (h.txtAllocatedBudget.val() == '') {
            errorMsg = errorMsg + "Please Enter Allocated Budget. <br/>";
            IsValid = false;
        }
        if (h.txtTenderDescription.val() == '') {
            errorMsg = errorMsg + "Please Enter Tender Description. <br/>";
            IsValid = false;
        }
        if (isNon(h.ddlBidValidityPeriod.val()) == '0') {
            errorMsg = errorMsg + "Please Select Bid Validity Period. <br/>";
            IsValid = false;
        }
        $('input[type=radio][name=TenderType]').each(function (index) {
            if ($(this).is(':checked')) {
                IsValidchecbox = true;
            }
            if (!IsValidchecbox) {
                if ($('input[type=radio][name=TenderType]').length <= index + 1) {
                    errorMsg = errorMsg + "<br/>" + "Please Select  Atleast One Tender Document Type";
                    IsValid = false;
                }
            }
        });
        if (!IsValid) {
            alertify.alert("Tender", errorMsg);
            return IsValid
        }
        else
            return IsValid
    }

    h.linkVendorFromTenderDocumentSubmit.click(function () {

        if (ValidateVendorDocument()) {
            h.InsertUpdateTenderDocument();
        }

    });


    function ValidateVendorDocument() {
        var IsValid = true;
        var errorMsg = '';


        if ($("#hdn-Tender").val() == '0' || $("#hdn-Tender").val() == '' || $("#hdn-Tender").val() == undefined) {
            errorMsg = errorMsg + "<br/>" + "Please Upload Tender document.";
            IsValid = false;
        }


        if ($("#hdn-TenderPriceBid").val() == '0' || $("#hdn-TenderPriceBid").val() == '' || $("#hdn-TenderPriceBid").val() == undefined) {
            errorMsg = errorMsg + "<br/>" + "Please Upload PriceBid document.";
            IsValid = false;
        }
        if (!IsValid) {
            alertify.alert("Tender", errorMsg);
            return IsValid
        }
        else
            return IsValid
    }

    h.linkVendorFromCalendarDateSubmit.click(function () {

        if (ValidateVendorFromCalendarDate()) {
            h.InsertUpdateTenderCalendarDateSubmit();
        }

    });



    h.linkVendorFromTenderFeeEC.click(function () {

        //if (ValidateVendorEC()) {
        h.InsertUpdateVendorFromTenderFeeEC();
        //}

    });

    function ValidateVendorFromCalendarDate() {
        var IsValid = true;
        var errorMsg = '';

        if (h.txtTenderStartDate.val() == '') {
            errorMsg = errorMsg + "Please Enter Tender Start Date. <br/>";
            IsValid = false;
        }
        if (h.txtTenderEndDate.val() == '') {
            errorMsg = errorMsg + "Please Enter Tender End Date. <br/>";
            IsValid = false;
        }

        if (h.txtBidStartDate.val() == '') {
            errorMsg = errorMsg + "Please Enter Pre-Bid Date. <br/>";
            IsValid = false;
        }

        if (h.txtBidEndDate.val() == '') {
            errorMsg = errorMsg + "Please Bid Submission Closing Date. <br/>";
            IsValid = false;
        }
        if (h.txtTechnicalBidStartDate.val() == '') {
            errorMsg = errorMsg + "Please Enter Technical Bid Opening Date. <br/>";
            IsValid = false;
        }
        if (h.txtFinancialBidStartDate.val() == '') {
            errorMsg = errorMsg + "Please Enter Financial Bid Opening Date. <br/>";
            IsValid = false;
        }

        if (!IsValid) {
            alertify.alert("Tender", errorMsg);
            return IsValid
        }
        else
            return IsValid
    }

    h.linkVendorFromTenderFeeSubmit.click(function () {

        if (ValidateVendorFromFee()) {
            h.InsertUpdateTenderFeeSubmit();
        }

    });

    function ValidateVendorFromFee() {
        var IsValid = true;
        var errorMsg = '';
        if (isNon(h.ddlIsTenderFees.val()) == '') {
            errorMsg = errorMsg + "Please Enter Tender Fee. <br/>";
            IsValid = false;
        }

        if (isNon(h.ddlIsTenderFees.val()) == 1 && isNon(h.txtTenderFeesAmount.val()) == 0) {
            errorMsg = errorMsg + "Please Enter Tender Fee Amount. <br/>";
            IsValid = false;
        }

        if (isNon(h.ddlIsEMDFees.val()) == '') {
            errorMsg = errorMsg + "Please Enter Tender Fee. <br/>";
            IsValid = false;
        }

        if (isNon(h.ddlIsEMDFees.val()) == 1 && isNon(h.txtEMDAmount.val()) == 0) {
            errorMsg = errorMsg + "Please Enter EMD Fee. <br/>";
            IsValid = false;
        }

        if ((isNon(h.ddlIsTenderFees.val()) == 1) || (isNon(h.ddlIsEMDFees.val()) == 1)) {
            if (h.txtPayable.val() == '') {
                errorMsg = errorMsg + "Please Enter Payable at. <br/>";
                IsValid = false;
            }
        }



        if (!IsValid) {
            alertify.alert("Tender", errorMsg);
            return IsValid
        }
        else
            return IsValid
    }


    h.linkVendorFromTenderFinalSubmit.click(function () {

        //  if (ValidateVendorFromFee()) {
        h.InsertUpdateVendorFromTenderFeeEC();
        h.InsertFinalSubmit();
        // }

    });

};


var _Handler;
var errorMsg = ''

$(document).ready(function () {
    _Handler = new _ManageTender();
    _Handler.BindEvents();

});




// Reload Form
function goToPage() {
    window.location.href = '/TenderManagement/TenderManagement/ManageTender';
}


_ManageTender.prototype.ShowHideBasicControl = function () {
    var h = this;
    if (h.ddlIsTenderFees.val() != '1') {
        $(".SecFeesAmount").hide();
        h.txtTenderFeesAmount.val("");

    }
    else {
        $(".SecFeesAmount").show();
    }

    if (h.ddlIsEMDFees.val() != '1') {
        $(".EMDFeeAmount").hide();
        h.txtEMDAmount.val("");
    }
    else {
        $(".EMDFeeAmount").show();
    }
}
_ManageTender.prototype.BindTenderDepartmentList = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Master/GetAllTenderDepartmentList"

    $.ajax({
        type: "GET",
        url: pUrl,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            $.each(data, function (i, UserType) {

                items += "<option value='" + UserType.id + "'>" + UserType.dataValue + "</option>";
            });

        },
        error: function (data) {

        }
    });
    h.ddlTenderDepartmentList.html(items);
};

_ManageTender.prototype.BindTenderCurrencyList = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Master/GetAllTenderCurrencyList"

    $.ajax({
        type: "GET",
        url: pUrl,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            $.each(data, function (i, UserType) {

                items += "<option value='" + UserType.id + "'>" + UserType.dataValue + "</option>";
            });

        },
        error: function (data) {

        }
    });
    h.ddlCurrency.html(items);
};
_ManageTender.prototype.BindTenderTypeList = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Master/GetALLTenderTypeList"

    $.ajax({
        type: "GET",
        url: pUrl,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            $.each(data, function (i, UserType) {

                items += "<option value='" + UserType.id + "'>" + UserType.dataValue + "</option>";
            });

        },
        error: function (data) {

        }
    });
    h.ddlTenderTypeList.html(items);
};


_ManageTender.prototype.BindVenderTypeList = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Master/GetALLVenderTypeList"

    $.ajax({
        type: "GET",
        url: pUrl,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            $.each(data, function (i, UserType) {

                items += "<option value='" + UserType.id + "'>" + UserType.dataValue + "</option>";
            });

        },
        error: function (data) {

        }
    });
    h.ddlVenderTypeList.html(items);
};
_ManageTender.prototype.BindTenderCategoryList = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Master/GetALLTenderCategoryList"

    $.ajax({
        type: "GET",
        url: pUrl,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            $.each(data, function (i, UserType) {

                items += "<option value='" + UserType.id + "'>" + UserType.dataValue + "</option>";
            });

        },
        error: function (data) {

        }
    });
    h.ddlTenderCategoryList.html(items);
};
_ManageTender.prototype.BindTenderEnvelopTypeList = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Master/GetALLTenderEnvelopTypeList"

    $.ajax({
        type: "GET",
        url: pUrl,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            $.each(data, function (i, UserType) {

                items += "<option value='" + UserType.id + "'>" + UserType.dataValue + "</option>";
            });

        },
        error: function (data) {

        }
    });
    h.ddlTenderEnvelopList.html(items);
};
_ManageTender.prototype.BindBidValidityPeriodList = function () {
    var h = this;
    var items = '<option value="">--Select--</option>';
    var pUrl = "/Master/GetALLBidValidityPeriodList"

    $.ajax({
        type: "GET",
        url: pUrl,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            $.each(data, function (i, UserType) {

                items += "<option value='" + UserType.id + "'>" + UserType.dataValue + "</option>";
            });

        },
        error: function (data) {

        }
    });
    h.ddlBidValidityPeriod.html(items);
};
_ManageTender.prototype.InsertUpdateTenderBasicInformation = function () {
    var h = this;

    var TenderDocType = '';
    $("input[name=TenderType]:checked").each(function () {
        TenderDocType = $(this).val();

    });
    var model = {
        Id: parseInt(h.hdnRecordId.val()),
        TenderDocumentType: TenderDocType,
        TenderID: h.txtTenderID.val(),
        TenderNumber: h.txtTenderNo.val(),
        TenderTitle: h.txtTenderTitle.val(),
        TenderTypeId: parseInt(h.ddlTenderTypeList.val()),
        DepartmentId: parseInt(h.ddlTenderDepartmentList.val()),
        ProcurementCategoryId: parseInt(h.ddlTenderCategoryList.val()),
        EnvelopTypeId: parseInt(h.ddlTenderEnvelopList.val()),
        EstimatedValue: parseFloat(h.txtEstimatedValue.val()),
        TenderCreationDate: ConvertToValidDateFormate(h.txtTenderCreationDate.val()),
        TenderCreationDateFormate: h.txtTenderCreationDate.val(),
        CurrencyCode: h.ddlCurrency.val(),
        //SectionName: h.txtSectionName.val(),
        // EvaluationType: h.txtEvaluationType.val(),
        AllocatedBudget: parseFloat(h.txtAllocatedBudget.val()),
        TenderDescription: h.txtTenderDescription.val(),
        BidValidityPeriod: parseInt(h.ddlBidValidityPeriod.val()),

    }

    var pUrl = "/TenderManagement/TenderManagement/InsertUpdateTenderBasicInformation";

    $.ajax({
        type: "POST",
        url: pUrl,
        data: JSON.stringify(model),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {


            alertify
                .alert("Tender", data.responseMessage, function () {
                    if (data.responseCode == 200) {
                        var pUrl2 = "/TenderManagement/TenderManagement/UpdateTenderView";
                        $.ajax({
                            type: "POST",
                            url: pUrl2,
                            data: JSON.stringify(data.responseId),
                            dataType: 'json',
                            contentType: 'application/json; charset=utf-8',
                            async: false,
                            success: function (data2) {

                                window.location.href = '/TenderManagement/TenderManagement/ManageTenderAddUpdateTender?Uid=' + data2.recordId + '&formAction=' + data2.actionMode;
                                //goToPage();

                            },
                            error: function (data) {

                            }

                        });
                    }
                });


        },
        error: function (data) {

        }
    });



}
_ManageTender.prototype.InsertUpdateTenderCalendarDateSubmit = function () {
    var h = this;
    var Mode = '';
    $("input[name=Mode]:checked").each(function () {
        Mode = $(this).val();

    });

    var model = {
        Id: 0,
        TenderID: parseInt(h.hdnRecordId.val()),
        TenderStartDate: ConvertToValidDateFormate(h.txtTenderStartDate.val()),
        TenderStartDateFormate: h.txtTenderStartDate.val(),
        TenderEndDate: ConvertToValidDateFormate(h.txtTenderEndDate.val()),
        TenderEndDateFormate: (h.txtTenderEndDate.val()),
        BidStartDate: ConvertToValidDateFormate(h.txtBidStartDate.val()),
        BidStartDateFormate: (h.txtBidStartDate.val()),
        BidEndDate: ConvertToValidDateFormate(h.txtBidEndDate.val()),
        BidEndDateFormate: (h.txtBidEndDate.val()),
        TechnicalBidStartDate: ConvertToValidDateFormate(h.txtTechnicalBidStartDate.val()),
        TechnicalBidStartDateFormate: (h.txtTechnicalBidStartDate.val()),
        FinancialBidStartDate: ConvertToValidDateFormate(h.txtFinancialBidStartDate.val()),
        FinancialBidStartDateFormate: (h.txtFinancialBidStartDate.val()),
        BidMode: Mode,
        BidAddress: (h.txtAdress.val()),
    }

    var pUrl = "/TenderManagement/TenderManagement/InsertUpdateTenderCalendarDates";
    $.ajax({
        type: "POST",
        url: pUrl,
        data: JSON.stringify(model),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            alertify
                .alert("Tender", data.responseMessage, function () {
                    if (data.responseCode == 200) {

                    }
                });


        },
        error: function (data) {

        }
    });
}


$('#change11').change(function () {
    debugger;
    //this is just getting the value that is selected
    var title = $(this).val();
    $('#NewModelTitle').html();
    $('#NewModelNo').modal('show');
});

_ManageTender.prototype.InsertUpdateVendorFromTenderFeeEC = function () {
    debugger

    //var h = this;
    //var RequiredDoc = '';
    //$("input[name=RequiredDoc]:checked").each(function () {
    //    RequiredDoc = $(this).val();

    //});
    //var _DistPPWS = new Array();
    //_TargetsDistricWiseArray.forEach(function (v, i) {
    //    var _ppwsDist = {
    //        TendersID: _TargetsDistricWiseArray[i].TenderID,
    //        Criteria: _TargetsDistricWiseArray[i].Criteria,
    //        RequiredDocument: _TargetsDistricWiseArray[i].RequiredDocument,
    //        //Training_Target: _TargetsDistricWiseArray[i].TargetBeneficiary,
    //    }
    //    _DistPPWS.push(_ppwsDist)
    //});
    var objTen = {
        TendersID: parseInt($('#hdnRecordId').val()),
    }

    var _VendorFromTender = new Array();
    gvVendorFromTender.forEach(function (v, i) {
        var _Vendorvar = {
            Criteria: gvVendorFromTender[i].Criteria,
            RequiredDocument: gvVendorFromTender[i].RequiredDocument
        }
        _VendorFromTender.push(_Vendorvar)
    });
    var _DistPPWS = new Array();
    _TargetsDistricWiseArray.forEach(function (v, i) {
        var _ppwsDist = {
            TendersID: _TargetsDistricWiseArray[i].TenderID,
            Criteria: _TargetsDistricWiseArray[i].Criteria,
            RequiredDocument: _TargetsDistricWiseArray[i].RequiredDocument,
            //Training_Target: _TargetsDistricWiseArray[i].TargetBeneficiary,
        }
        _DistPPWS.push(_ppwsDist)
    });

<<<<<<< .mine
    var pUrl = "/TenderManagement/TenderManagement/InsertUpdateTenderEligibilityCriteria";
    var model = {
        lstTender: _VendorFromTender,
        objCriteria: objTen
    };
||||||| .r100
    var model = {
        Id: 0,
        TenderID: parseInt(h.hdnRecordId.val()),
        Criteria: (h.txtcriteria.val()),
        RequiredDocument: RequiredDoc,
        DocumentId: parseInt(h.hdncriteriaupload.val()),
           }

    var pUrl = "/TenderManagement/TenderManagement/InsertUpdateTenderEligibilityCriteria";
=======
    //var model = {
    //    Id: 0,
    //    TenderID: parseInt(h.hdnRecordId.val()),
    //    Criteria: (h.txtcriteria.val()),
    //    RequiredDocument: RequiredDoc,
    //    DocumentId: parseInt(h.hdncriteriaupload.val()),
    //}
   // _tbl_ProjectCandidateProposedArray.push(h.tempModel);
    var pUrl = "/TenderManagement/TenderManagement/InsertUpdateTenderEligibilityCriteria";
>>>>>>> .r103
    h.tempModel = "";
    var ppwsId = 0;
   var  Model = {
        pInDistPPWS : _DistPPWS,
    };
    $.ajax({
        type: "POST",
        url: pUrl,
        data: JSON.stringify(Model),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        success: function (data) {
            alertify
                .alert("Tender", data.responseMessage, function () {
                    if (data.responseCode == 200) {

                    }
                });


        },
        error: function (data) {

        }
    });
}

_ManageTender.prototype.InsertUpdateTenderFeeSubmit = function () {
    var h = this;
    var model = {
        Id: 0,
        TenderID: parseInt(h.hdnRecordId.val()),
        IsTenderFees: h.ddlIsTenderFees.val() == "1" ? true : false,
        TenderFeesAmount: h.txtTenderFeesAmount.val() == "" ? 0 : parseFloat(h.txtTenderFeesAmount.val()),
        IsEMDFees: h.ddlIsEMDFees.val() == "1" ? true : false,
        EMDAmount: h.txtEMDAmount.val() == "" ? 0 : parseFloat(h.txtEMDAmount.val()),
        Payable: h.txtPayable.val(),
        DDDocumentId: parseInt(h.hdnDDDocID.val()),
        BGDocumentId: parseInt(h.hdnBGDocID.val()),
        FiledType: h.ddlfiletype.val(),

    }
    var pUrl = "/TenderManagement/TenderManagement/InsertUpdateTenderFee";
    $.ajax({
        type: "POST",
        url: pUrl,
        data: JSON.stringify(model),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            alertify
                .alert("Tender", data.responseMessage, function () {
                    if (data.responseCode == 200) {
                        // goToPage();
                    }
                });


        },
        error: function (data) {

        }
    });



}
_ManageTender.prototype.InsertUpdateTenderDocument = function () {
    var h = this;
    var model = {
        Id: 0,
        TenderID: parseInt(h.hdnRecordId.val()),
        TenderDocumentId: parseInt(h.hdnTenderDocID.val()),
        BidDocumentId: parseInt(h.hdnTenderPriceBidDocID.val()),

    }
    var pUrl = "/TenderManagement/TenderManagement/InsertUpdateTenderDocument";
    $.ajax({
        type: "POST",
        url: pUrl,
        data: JSON.stringify(model),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            alertify
                .alert("Tender", data.responseMessage, function () {
                    if (data.responseCode == 200) {
                        // goToPage();
                    }
                });


        },
        error: function (data) {

        }
    });



}

_ManageTender.prototype.InsertFinalSubmit = function () {
    var h = this;
    var model = {
        Id: parseInt(h.hdnRecordId.val()),

    }
    var pUrl = "/TenderManagement/TenderManagement/InsertFinalSubmission";
    $.ajax({
        type: "POST",
        url: pUrl,
        data: JSON.stringify(model),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {
            alertify
                .alert("Tender", data.responseMessage, function () {
                    if (data.responseCode == 200) {
                        goToPage();
                    }
                    else {

                    }
                });


        },
        error: function (data) {

        }
    });



}
// Bind User Type
_ManageTender.prototype.GetTenderDetail = function () {
    var h = this;
    var TenderDocType = '';
    $("input[name=TenderType]:checked").each(function () {
        TenderDocType = $(this).val();

    });
    var pUrl = "/TenderManagement/TenderManagement/GetTenderDetailById/"
    var model = {
        tenderId: h.hdnRecordId.val(),
    };
    $.ajax({
        type: "GET",
        url: pUrl,
        data: model,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        async: false,
        success: function (data) {

            // alert(data.tenderCreationDateFormate);

            //h.TenderTypedoc.val(data.TenderDocumentType);
            //$("input[name=TenderType]:checked").val(data.tenderDocumentType);
            if (data.tenderDocumentType == "RFP") {
                $("#TenderTypeRFP").attr('checked', true);
            }
            else {
                $("#TenderTypeEOI").attr('checked', true);
            }

            h.txtTenderID.val(data.tenderID);
            h.txtTenderNo.val(data.tenderNumber);
            h.txtTenderTitle.val(data.tenderTitle);
            h.BindTenderTypeList();
            h.ddlTenderTypeList.val(data.tenderTypeId);
            h.BindTenderDepartmentList();
            h.ddlTenderDepartmentList.val(data.departmentId);
            h.BindTenderCategoryList();
            h.ddlTenderCategoryList.val(data.procurementCategoryId);
            h.BindTenderEnvelopTypeList();
            h.ddlTenderEnvelopList.val(data.envelopTypeId)
            h.txtEstimatedValue.val(data.estimatedValue);
            h.txtTenderCreationDate.val(data.tenderCreationDateFormate);
            h.BindTenderCurrencyList();
            h.ddlCurrency.val(data.currencyCode);
            h.txtSectionName.val(data.sectionName);
            h.txtEvaluationType.val(data.evaluationType);
            h.txtAllocatedBudget.val(data.allocatedBudget);
            h.txtTenderDescription.val(data.tenderDescription);
            h.BindBidValidityPeriodList();
            h.ddlBidValidityPeriod.val(data.bidValidityPeriod);


            h.hdnTenderDocID.val(data.tenderDocumentDetail.tenderDocumentId);
            ViewDocumentInformation(data.tenderDocumentDetail.tenderDocumentId, "aViewUpload-Tender", "aDelete-Tender", "lblDocName-Tender")
            h.hdnTenderPriceBidDocID.val(data.tenderDocumentDetail.bidDocumentId);
            ViewDocumentInformation(data.tenderDocumentDetail.bidDocumentId, "aViewUpload-TenderPriceBid", "aDelete-TenderPriceBid", "lblDocName-TenderPriceBid")
            if (data.tenderFeesDetail.isTenderFees) {
                h.ddlIsTenderFees.val("1");
                h.txtTenderFeesAmount.val(data.tenderFeesDetail.tenderFeesAmount);
            }
            else {
                h.ddlIsTenderFees.val("0");
            }
            if (data.tenderFeesDetail.isEMDFees) {
                h.ddlIsEMDFees.val("1");
                h.txtEMDAmount.val(data.tenderFeesDetail.emdAmount);
            }
            else {
                h.ddlIsEMDFees.val("0");
            }
            h.ddlfiletype.val(data.tenderFeesDetail.filedType);
            if (data.tenderFeesDetail.filedType == "DD") {
                $("#DDdoc").show();
                h.hdnDDDocID.val(data.tenderFeesDetail.ddDocumentId);
                ViewDocumentInformation(data.tenderFeesDetail.ddDocumentId, "aViewUpload-ddupload", "aDelete-ddupload", "lblDocName-ddupload")
            }
            if (data.tenderFeesDetail.filedType == "BG") {
                $("#bgdoc").show();
                h.hdnBGDocID.val(data.tenderFeesDetail.bgDocumentId);
                ViewDocumentInformation(data.tenderFeesDetail.bgDocumentId, "aViewUpload-bgupload", "aDelete-bgupload", "lblDocName-bgupload")
            }
            h.ShowHideBasicControl();
            h.txtPayable.val(data.tenderFeesDetail.payable);


            h.txtTenderStartDate.val(data.tenderCalendarDatesDetail.tenderStartDateFormate);
            h.txtTenderEndDate.val(data.tenderCalendarDatesDetail.tenderEndDateFormate);
            h.txtBidStartDate.val(data.tenderCalendarDatesDetail.bidStartDateFormate);
            h.txtBidEndDate.val(data.tenderCalendarDatesDetail.bidEndDateFormate);
            h.txtTechnicalBidStartDate.val(data.tenderCalendarDatesDetail.technicalBidStartDateFormate);
            h.txtFinancialBidStartDate.val(data.tenderCalendarDatesDetail.financialBidStartDateFormate);
            if (data.tenderCalendarDatesDetail.bidMode == "Online") {
                $("#OnlineMode").attr('checked', true);
                $("#lbladdress").show();
                $("#txtaddressmode").show();
                h.txtAdress.val(data.tenderCalendarDatesDetail.bidAddress);
            }
            else {
                $("#OfflineMode").attr('checked', true);
            }
            h.txtcriteria.val(data.eligibilityCriteria.criteria);
            if (data.eligibilityCriteria.requiredDocument == "Yes") {
                $("#DocYes").attr('checked', true);
                $("#tdcriteria").show();
                h.hdncriteriaupload.val(data.eligibilityCriteria.documentId);
                ViewDocumentInformation(data.eligibilityCriteria.documentId, "aViewUpload-criteriaupload", "aDelete-criteriaupload", "lblDocName-criteriaupload")
            }
            else {
                $("#DocNo").attr('checked', true);
                $("#tdcriteria").hide();
            }


        },
        error: function (data) {

        }
    });
}

<<<<<<< .mine
var gvVendorFromTender = new Array();
function AddVendorFromTenderDetail() {
    var valid = true;
    if (gvVendorFromTender.length > 0) {
        $.each(gvVendorFromTender, function (index, value) {
            if ($("#txtcriteria").val() == value.VendorFromTender) {
                Getalert('warning', 'Mandatory Fields', 'Selected Criteria is already exist.');
                valid = false;
            }
||||||| .r100
    var TotalDistrictTarget;
    _ManageTender.prototype.CreateTargetDistrictTable= function() {
        var TotalTarget = 0;
        var element = '<table class="table table-message">';
        element += '<tr class="module-head"><th class="heading">Sr.No</th><th class="heading">Criteria</th><th class="heading">Document Status</th><th class="heading">Document</th><th class="deteteHead">Delete</th></tr>';
        var Index = 1;
        if (_TargetsDistricWiseArray.length != 0) {
            for (var i = 0; i < _TargetsDistricWiseArray.length; i++) {
                element += '<tr class="read">';
                element += '<td class="cell-title">' + Index++ + '</td>';
                element += '<td class="cell-title">' + _TargetsDistricWiseArray[i].criteria + '</td>';
                element += '<td class="cell-title">' + _TargetsDistricWiseArray[i].RequiredDocument + '</td>';
                element += '<td class="cell-title" id="lblTarget">' + _TargetsDistricWiseArray[i].DocumentId + '</td>';
                element += '<td class="cellDelete"><a id="btnDistrictdelete" class="btn" data-id=' + i + '><img src="/Images/icon-delete.gif"></a></td>';
                element += '</tr>';
                TotalTarget = parseInt(_TargetsDistricWiseArray[i].TargetBeneficiary) + TotalTarget;
                TotalDistrictTarget = TotalTarget;
            }
=======
//    var TotalDistrictTarget;
//    _ManageTender.prototype.CreateTargetDistrictTable= function() {
//        var TotalTarget = 0;
//        var element = '<table class="table table-message">';
//        element += '<tr class="module-head"><th class="heading">Sr.No</th><th class="heading">Criteria</th><th class="heading">Document Status</th><th class="heading">Document</th><th class="deteteHead">Delete</th></tr>';
//        var Index = 1;
//        if (_TargetsDistricWiseArray.length != 0) {
//            for (var i = 0; i < _TargetsDistricWiseArray.length; i++) {
//                element += '<tr class="read">';
//                element += '<td class="cell-title">' + Index++ + '</td>';
//                element += '<td class="cell-title">' + _TargetsDistricWiseArray[i].Criteria + '</td>';
//                element += '<td class="cell-title">' + _TargetsDistricWiseArray[i].RequiredDocument + '</td>';
//               // element += '<td class="cell-title" id="lblTarget">' + _TargetsDistricWiseArray[i].DocumentId + '</td>';
//               // element += '<td class="cellDelete"><a id="btnDistrictdelete" class="btn" data-id=' + i + '><img src="/Images/icon-delete.gif"></a></td>';
//                element += '</tr>';
//                //TotalTarget = parseInt(_TargetsDistricWiseArray[i].TargetBeneficiary) + TotalTarget;
//               // TotalDistrictTarget = TotalTarget;
//            }
>>>>>>> .r103
        });
    }
    if (valid) {
        var model = {
            Criteria: $("#txtcriteria").val(),
            RequiredDocument: $('input[name="RequiredDoc"]:checked').val(),
        };
        gvVendorFromTender.push(model);
        createVendorFromTenderTable();
        $("#txtcriteria").val('');
    }
}
function createVendorFromTenderTable() {
    var table = '<table style="margin:10px 0" id="tbl_Component" class="table table-message"><tr class="heading"><th class="cell-title">Sr.No</th><th class="cell-title">Criteria</th><th class="cell-title">Required Document</th><th class="hdrDelete">Delete</th></tr>';
    var Index = 1;
    $.each(gvVendorFromTender, function (index, value) {
        table += '<tr class="read">';
        table += '<td class="cell-title">' + Index++ + '</td>';
        table += '<td>' + value.Criteria + '</td>';
        table += '<td>' + value.RequiredDocument + '</td>';
        table += '<td class="cellDelete"><a id="btnDistrictdelete" class="btn" data-id=' + index + '><img src="/Images/icon-delete.gif"></a></td>';
        table += '</tr>'
    });
    table += '<tr></tr></table>';
    if (gvVendorFromTender.length > 0) {
        $("#DivTrainInfraDetails").html(table);
    }
    else {
        $("#DivTrainInfraDetails").html("");
    }
}

<<<<<<< .mine
||||||| .r100
            element += '<tr class="module-head"><th class="heading">Total</th><th class="heading">&nbsp;</th><th class="heading">&nbsp;</th><th class="heading" id="TotalTarget">' + TotalTarget + '</th><th class="heading">&nbsp;</th></tr>';
        }
=======
//            element += '<tr class="module-head"><th class="heading">Total</th><th class="heading">&nbsp;</th><th class="heading">&nbsp;</th><th class="heading" id="TotalTarget">' + TotalTarget + '</th><th class="heading">&nbsp;</th></tr>';
//        }

//        element += '</table>';
//        if (_TargetsDistricWiseArray.length > 0) {
//            $('#DivTrainInfraDetails').html(element);
//        }
//        else {
//            $('#DivTrainInfraDetails').html('');
//        }
//}

var TotalDistrictTarget;
function CreateTargetDistrictTable() {
    var TotalTarget = 0;
    var element = '<table class="table table-message">';
    element += '<tr class="module-head"><th class="heading">Sr.No</th><th class="heading">Criteria</th><th class="heading">RequiredDocument</th><th class="deteteHead">Delete</th></tr>';
    var Index = 1;
    if (_TargetsDistricWiseArray.length != 0) {
        for (var i = 0; i < _TargetsDistricWiseArray.length; i++) {
            element += '<tr class="read">';
            element += '<td class="cell-title">' + Index++ + '</td>';
            element += '<td class="cell-title">' + _TargetsDistricWiseArray[i].Criteria + '</td>';
            element += '<td class="cell-title">' + _TargetsDistricWiseArray[i].RequiredDocument + '</td>';
            element += '<td class="cellDelete"><a id="btnDistrictdelete" class="btn" data-id=' + i + '><img src="/Images/icon-delete.gif"></a></td>';
            element += '</tr>';
            //element += '<td class="cell-title" id="lblTarget">' + _TargetsDistricWiseArray[i].TargetBeneficiary + '</td>';
            //TotalTarget = parseInt(_TargetsDistricWiseArray[i].TargetBeneficiary) + TotalTarget;
            //TotalDistrictTarget = TotalTarget;
        }
>>>>>>> .r103

<<<<<<< .mine
||||||| .r100
        element += '</table>';
        if (_TargetsDistricWiseArray.length > 0) {
            $('#DivTrainInfraDetails').html(element);
        }
        else {
            $('#DivTrainInfraDetails').html('');
        }
    }
=======
        //element += '<tr class="module-head"><th class="heading">Total</th><th class="heading">&nbsp;</th><th class="heading">&nbsp;</th><th class="heading" id="TotalTarget">' + TotalTarget + '</th><th class="heading">&nbsp;</th></tr>';
    }
>>>>>>> .r103

<<<<<<< .mine
||||||| .r100

    
=======
    element += '</table>';
    if (_TargetsDistricWiseArray.length > 0) {
        $('#DivTrainInfraDetails').html(element);
    }
    else {
        $('#DivTrainInfraDetails').html('');
    }
}


    
>>>>>>> .r103
