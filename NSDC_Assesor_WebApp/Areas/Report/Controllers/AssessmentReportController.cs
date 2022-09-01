using NSDC.Assessor.BusinessObject.Assessment;
using NSDC.Assessor.BusinessObject.DailyReports;
using NSDC.Assessor.BusinessObject.UserAccount;
using NSDC.Assessor.Utility;
using NSDC_Assessor.BusinessOperation.Assessment;
using NSDC_Assessor.BusinessOperation.Common;
using NSDC_Assessor.BusinessOperation.DailyReports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace NSDC_Assesor.WebApp.Areas.Report.Controllers
{
    [CheckSession]
    public class AssessmentReportController : Controller
    {
        // GET: Report/AssessmentReport/AssessmentReport
        public ActionResult AssessmentReport()
        {
            string url = Request.Url.Scheme + "://" + Request.Url.Authority + "/";
            string newUrl = url == WebConfigurationManager.AppSettings["WebUrl"] ? WebConfigurationManager.AppSettings["WebUrl2"] : (url == WebConfigurationManager.AppSettings["WebUrl1"] ? WebConfigurationManager.AppSettings["WebUrl2"] : WebConfigurationManager.AppSettings["WebUrlGlobal"]);

            TempData["PhotoLogURL"] = newUrl;
            if (TempData["PhotoLogURL"] != null)
            {
                ViewBag.PhotoLogURL = TempData["PhotoLogURL"].ToString();

            }
            return View();
        }

        [CheckSession]
        public ActionResult OngoingAssessmentReport()
        {
            string url = Request.Url.Scheme + "://" + Request.Url.Authority + "/";
            string newUrl = url == WebConfigurationManager.AppSettings["WebUrl"] ? WebConfigurationManager.AppSettings["WebUrl2"] : (url == WebConfigurationManager.AppSettings["WebUrl1"] ? WebConfigurationManager.AppSettings["WebUrl2"] : WebConfigurationManager.AppSettings["WebUrlGlobal"]);

            TempData["PhotoLogURL"] = newUrl;
            if (TempData["PhotoLogURL"] != null)
            {
                ViewBag.PhotoLogURL = TempData["PhotoLogURL"].ToString();

            }
            return View();
        }
        [CheckSession]
        public ActionResult PendingAssessmentReport()
        {
            return View();
        }
        [CheckSession]
        public ActionResult UpcomingAssessmentReport()
        {
            return View();
        }



        #region "Assessment Report"      

        public JsonResult GetAssessmentReportDetailList(long RefSectorID, long RefJobRoleID, long RefStateID, long RefDistrictID, long RefTCID, long RefAgencyID, long RefAssessorID)
        {
            IEnumerable<AssessmentEntity> lst = null;
            try
            {
                UserInfo info = new UserInfo();
                info = (UserInfo)Session["UserInfo"];
                string AgencyID = string.Empty;
                string LoginType = string.Empty;
                if (info.LoginType == eLoginType.AGENCIES.ToString())
                {
                    AgencyID = info.AgencyId.ToString();
                    LoginType = info.LoginType.ToString();
                }
                else if (info.LoginType == eLoginType.SSC.ToString())
                {
                    RefSectorID = info.RefSectorID;

                }
                else
                {
                    AgencyID = "0";
                }

                AssessmentOperation operation = new AssessmentOperation();
                lst = operation.GetAssessmentReportDetailList(RefSectorID, RefJobRoleID, RefStateID, RefDistrictID, RefTCID, RefAgencyID, RefAssessorID, AgencyID, LoginType);
            }
            catch (Exception ex)
            {
                // Message = ex.Message;
                CLogger.WriteLog(ProjectSource.WebApp, ELogLevel.ERROR, "ERROR ocurred in AssessmentManagement Controller while calling GetAssessmentReportDetailList Action, Ex.: " + ex.Message);
            }
            //return Json(lst, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(lst, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult GetOngoingAssessment()
        {
            AssessmentOperation operation = new AssessmentOperation();
            IEnumerable<AssessmentEntity> lst = null;
            try
            {
                UserInfo info = new UserInfo();
                info = (UserInfo)Session["UserInfo"];
                string AgencyID = string.Empty;
                string LoginType = string.Empty;
                long RefSectorID = 0;
                if (info.LoginType == eLoginType.AGENCIES.ToString())
                {
                    AgencyID = info.AgencyId.ToString();

                }
                else if (info.LoginType == eLoginType.SSC.ToString())
                {
                    RefSectorID = info.RefSectorID;
                }
                else
                {
                    AgencyID = "0";
                }

                lst = operation.GetOngoingAssessment(AgencyID, RefSectorID);
            }
            catch (Exception ex)
            {
                // Message = ex.Message;
                CLogger.WriteLog(ProjectSource.WebApp, ELogLevel.ERROR, "ERROR ocurred in AssessmentManagement Controller while calling GetAssessmentReportDetailList Action, Ex.: " + ex.Message);
            }
            //return Json(lst, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(lst, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        /// <summary>
        /// Get Pending Assessment List
        /// </summary>
        /// <param name="RefSectorID"></param>
        /// <param name="RefJobRoleID"></param>
        /// <param name="RefStateID"></param>
        /// <param name="RefDistrictID"></param>
        /// <param name="RefTCID"></param>
        /// <param name="RefAgencyID"></param>
        /// <param name="RefAssessorID"></param>
        /// <returns></returns>
        public JsonResult GetPendingAssessmentList(long RefSectorID, long RefJobRoleID, long RefStateID, long RefDistrictID, long RefTCID, long RefAgencyID, long RefAssessorID)
        {
            IEnumerable<AssessmentEntity> lst = null;
            try
            {
                UserInfo info = new UserInfo();
                info = (UserInfo)Session["UserInfo"];
                string AgencyID = string.Empty;
                if (info.LoginType == eLoginType.AGENCIES.ToString())
                {
                    AgencyID = info.AgencyId.ToString();
                }
                else if (info.LoginType == eLoginType.SSC.ToString())
                {
                    RefSectorID = info.RefSectorID;
                }
                else
                {
                    AgencyID = "0";
                }
                AssessmentOperation operation = new AssessmentOperation();
                lst = operation.GetPendingAssessmentList(RefSectorID, RefJobRoleID, RefStateID, RefDistrictID, RefTCID, RefAgencyID, RefAssessorID, AgencyID);
            }
            catch (Exception ex)
            {
                // Message = ex.Message;
                CLogger.WriteLog(ProjectSource.WebApp, ELogLevel.ERROR, "ERROR ocurred in AssessmentManagement Controller while calling GetPendingAssessmentList Action, Ex.: " + ex.Message);
            }
            //return Json(lst, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(lst, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        /// <summary>
        /// GetUpcomingAssessmentList
        /// </summary>
        /// <param name="RefSectorID"></param>
        /// <param name="RefJobRoleID"></param>
        /// <param name="RefStateID"></param>
        /// <param name="RefDistrictID"></param>
        /// <param name="RefTCID"></param>
        /// <param name="RefAgencyID"></param>
        /// <param name="RefAssessorID"></param>
        /// <returns></returns>
        public JsonResult GetUpcomingAssessmentList(long RefSectorID, long RefJobRoleID, long RefStateID, long RefDistrictID, long RefTCID, long RefAgencyID, long RefAssessorID)
        {
            IEnumerable<AssessmentEntity> lst = null;
            try
            {
                UserInfo info = new UserInfo();
                info = (UserInfo)Session["UserInfo"];
                string AgencyID = string.Empty;
                if (info.LoginType == eLoginType.AGENCIES.ToString())
                {
                    AgencyID = info.AgencyId.ToString();
                }
                else if (info.LoginType == eLoginType.SSC.ToString())
                {
                    RefSectorID = info.RefSectorID;
                }
                else
                {
                    AgencyID = "0";
                }
                AssessmentOperation operation = new AssessmentOperation();
                lst = operation.GetUpcomingAssessmentList(RefSectorID, RefJobRoleID, RefStateID, RefDistrictID, RefTCID, RefAgencyID, RefAssessorID, AgencyID);
            }
            catch (Exception ex)
            {
                // Message = ex.Message;
                CLogger.WriteLog(ProjectSource.WebApp, ELogLevel.ERROR, "ERROR ocurred in AssessmentManagement Controller while calling GetUpcomingAssessmentList Action, Ex.: " + ex.Message);
            }
            //return Json(lst, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(lst, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult GetAllAssessmentDetailListByAssessorId(string BatchName)
        {
            IEnumerable<AssessmentBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetAllAssessmentDetailListByAssessorId(BatchName);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInprogessAssessment(string BatchName)
        {
            IEnumerable<AssessmentBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetInprogessAssessment(BatchName);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPhotographDetails(long AssessmentId)
        {
            IEnumerable<StartEndPhotographBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetPhotographDetails(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAssessmentDeviceDetail(long AssessmentId)
        {
            IEnumerable<AssessmentDeviceDetailBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetAssessmentDeviceDetail(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGeoLocation(long AssessmentId)
        {
            IEnumerable<GeoLocationBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetGeoLocation(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAssessmentStatusById(long AssessmentId)
        {
            IEnumerable<AssessmentStatusBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetAssessmentStatusById(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetInprogressAssessmentStatusById(long AssessmentId)
        {
            IEnumerable<AssessmentStatusBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetInprogressAssessmentStatusById(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCandidateList(string BatchId)
        {
            IEnumerable<CandidateListBatch> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetCandidateList(BatchId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetQuestionDetailByAssessmentId(long AssessmentId)
        {
            IEnumerable<FeedBackBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetQuestionDetailByAssessmentId(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEndAssessmentByAssessmentId(long AssessmentId)
        {
            IEnumerable<AssessmentPhotographLog> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetEndAssessmentByAssessmentId(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPendingAssessmentDetailListByAssessorId(string BatchName)
        {
            IEnumerable<AssessmentBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {
                //UserInfo info = new UserInfo();
                //info = (UserInfo)Session["UserInfo"];
                //string AgencyID = string.Empty;
                //if (info.LoginType == eLoginType.AGENCIES.ToString())
                //{
                //    AgencyID = info.AgencyId.ToString();
                //}
                //else
                //{
                //    AgencyID = "0";
                //}
                lst = operation.GetPendingAssessmentDetailListByAssessorId(BatchName);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUpcomingAssessmentDetailListByAssessorId(string BatchName)
        {
            IEnumerable<AssessmentBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {
                //UserInfo info = new UserInfo();
                //info = (UserInfo)Session["UserInfo"];
                //string AgencyID = string.Empty;
                //if (info.LoginType == eLoginType.AGENCIES.ToString())
                //{
                //    AgencyID = info.AgencyId.ToString();
                //}
                //else
                //{
                //    AgencyID = "0";
                //}
                lst = operation.GetUpcomingAssessmentDetailListByAssessorId(BatchName);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetStartedAssessmentList()
        {
            IEnumerable<StartedAssessmentBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetStartedAssessmentList();
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetPendingRemarks(long AssessmentID)
        {
            IEnumerable<OverdueBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetPendingRemarks(AssessmentID);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetEndAssessmentSummary(long AssessmentId)
        {
            IEnumerable<EndAssessmentBO> lst = null;
            AssessmentOperation operation = new AssessmentOperation();
            try
            {

                lst = operation.GetEndAssessmentSummary(AssessmentId);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        [CheckSession]
        public ActionResult DailyReports()
        {
            return View();
        }
        public JsonResult GetDailyReports(string Report_Type, string Training_Type, string Training_Date)
        {
            IEnumerable<BatchesAPPEnded> mdl = null;
            DailyReportsOperation operation = new DailyReportsOperation();
            try
            {
                int days = Training_Date == "0" ? 0 : (Convert.ToDateTime(Training_Date) - DateTime.Now).Days;
                mdl = operation.GetDailyReports(Report_Type, Training_Type, Training_Date);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            var JsonResult = Json(mdl, JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }

        #endregion
        [CheckSession]
        public ActionResult CandidateCountWiseBatchlist()
        {
            return View();
        }
        public JsonResult GetCandidateCountBatchList(string Training_Type, string Training_Date)
        {
            IEnumerable<CandidateCountList> mdl = null;
            CandidateCountOperation operation = new CandidateCountOperation();
            try
            {
                int days = Training_Date == "0" ? 0 : (Convert.ToDateTime(Training_Date) - DateTime.Now).Days;
                mdl = operation.GetCandidateCountBatchList(Training_Type, Training_Date);
            }
            catch (Exception ex)
            {
                CLogger.WriteLog(ProjectSource.WebApi, ELogLevel.ERROR, "ERROR ocurred in Examination Controller while calling GetScheduleExamsetupList Action, Ex.: " + ex.Message);
            }
            var JsonResult = Json(mdl, JsonRequestBehavior.AllowGet);
            JsonResult.MaxJsonLength = int.MaxValue;
            return JsonResult;
        }


    }
}