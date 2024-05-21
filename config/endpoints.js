class Endpoints {
  constructor() {
    //this.serverAddress = "http://142.93.215.255:2081/gui-services";
    // this.serverAddress = "http://142.93.215.255:2083/resellerservices/";

    // this.serverAddress = "https://backend5.telsp.in/resellerservices/";
    this.serverAddress = "https://backend1.quicksmart.in/resellerservices/";
    
    //this.serverAddress = "https://backend1.telsp.in/resellerservices/";
    // this.serverAddress = "https://uatbackend2.gmstool.com/resellerservices/";
    this.endpoints = {
      login: "reseller/login",
      dashboard: "reseller/dashboard",
      verifyOtp: "reseller/verifyotp",
      getHourlyReport: "reportService/getHourlySummaryReport",
      listUser: "staticService/getAllChildUserDetails",
      getAllUsers: "staticService/getAllChildsForUser",
      searchExternalUser: "staticService/getChildUserDetails",
      summaryReport: "reportService/summaryReport",
      userSummaryReport: "reportService/userSummaryReport",
      customSummaryReport: "reportService/customSummaryReport",
      getAllUserList: "userService/getAllUsersList",
      detailedMis: "reportService/detailedMis",
      uploadLogo: "reseller/uploadLogo",
      saveUser: "userService/saveUser",
      viewUser: "userService/viewUser",
      viewCredit: "creditService/getAvailableCreditForUser",
      updateCredit: "creditService/updateCreditForUser",
      viewRoutingGroups: "reseller/viewRoutingGroupDetails",
      getUserRoutingGroups: "reseller/getUserRoutingGroups",
      getUserKennalList: "reseller/getUserKannelList",
      updatedKennalGroupMap: "reseller/updateKannelGroupMapping",
      getAllChildForUser: "reseller/getAllChildForUser",
      getAllRoutingForUser: "reseller/getAllRoutingForUser",
      getAllCircleList: "reseller/getAllCircleList",
      getAllOperatorList: "reseller/getAllOperatorList",
      getUserSenderIdList: "reseller/getUserSenderIdList",
      updateRoutingForUser: "reseller/updateRoutingForUser",
      generateUserApi: "pushApiKeyService/generateUserApiKey",
      getCreditHistory: "creditService/getCreditHistory",
      getUserApi: "pushApiKeyService/getUserApiKey",
      updatedPassword: "userProfile/updatedPassword",
      profileDetails: "userProfile/userProfileDetails",
      saveInternalUser: "userService/saveInternalUser",
      listInternalusers: "userService/getAllInternalUsersList",
      getInternalUserData: "userService/viewInternalUser",
      saveOrganization: "organisationService/saveOrganisation",
      getAllOrganization: "organisationService/getAllOrganisationsList",
      getOrganization: "organisationService/getOrganisation",
      saveDepartment: "departmentService/saveDepartment",
      getAlldepartment: "departmentService/getAllDepartmentsList",
      getDepartment: "departmentService/getDepartment",
      saveSenderId: "senderIdService/saveSenderId",
      getAllSenderIdsForUser: "senderIdService/getAllSenderIdsForUser",
      viewExternalUser: "userService/viewUser",
      errorCode: "errorCodesService/getAllPlatformErrorCodesForAdmin",
      senderIdSummaryReport: "reportService/senderIdSummaryReport",
      smppStatus: "reseller/getSmppStats",
      connectSenderIdSummary: "connectSummaryService/connectSenderIdSummary",
      connectSummary: "connectSummaryService/connectSummary",
      generateReport: "mis/generateReport",
      downloadReport: "mis/viewGeneratedReports",
      unbindUserSession: "reseller/unbindUserSession",
      getAllRoutingDetailesForUser: "reseller/getAllRoutingDetailsForUser",
      viewRoutingForAllUserByGroupName: "reseller/viewRoutingForAllUserByGroupName",
      updateGroupRoutingDetailsForAllUser:"reseller/updateGroupRoutingDetailsForAllUser",
      uploadErrorCodeFile:"errorCodesService/uploadErrorCodeFile",
      addNewErrorCode:"errorCodesService/addNewErrorCode"
    };
  }

  get(name) {
    return `${this.serverAddress}/${this.endpoints[name]}`;
  }

  validateResponse(data) {
    if (data && typeof data === "object" && data.constructor === Object) {
      switch (data.code) {
        case 1001:
          window.location.pathname !== "/login"
            ? (window.location.href = "/login")
            : alert(data.message || "Login failed. Please try again!");
          return false;
        default:
          return data;
      }
    } else {
      alert("Something went wrong. Please try again!");
      return false;
    }
  }
}

export default new Endpoints();
