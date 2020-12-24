export const BaseUrl = "http://128.199.79.79/cardb/public/api/";

//login api
export const LoginApi = BaseUrl + "sendOtp";
export const OTPApi = BaseUrl + "verifyOtp";

//time out
export const TimeoutApi = BaseUrl + "checkEndTimeStatus/";

//carlist api

// export const CarlistHomeApi = BaseUrl + "carlists?page=";
export const CarlistApi = BaseUrl + "carlists";

//car create report
export const CarCreateApi = BaseUrl + "createreport";

//car use api
export const CarUseApi = BaseUrl + "getUsingCar?id=";

//refuel list
export const GetRefuelApi = BaseUrl + "getAllfuel?page=";

//refuel create
export const CreateRefuelApi = BaseUrl + "createFuel";

//edit fuel
export const EditRefuelApi = BaseUrl + "editFuel/";

//img url
export const ImguploadApi = "http://128.199.79.79/cardb/public/uploads/fuel/";

//maintence list api
export const MaintenceListApi = BaseUrl + "getallMaintenance?page=";

//get history api
export const gethistoryapi = BaseUrl + "getAllHistory?page=";
export const gethistorydetailapi = BaseUrl + "report?id=";

//get dirver list api
export const driverlistapi = BaseUrl + "getAllDriver?page=";

export const createmaintenceapi = BaseUrl + "createMaintenance";

export const editmaintenceapi = BaseUrl + "editMaintenance";

//img maintenance api
export const ImgMaintenanceuploadApi =
  "http://128.199.79.79/cardb/public/uploads/maintenance/";

//img history api
export const ImgHistoryuploadApi =
  "http://128.199.79.79/cardb/public/uploads/reports/";

//time out api

export const timeoutApi = BaseUrl +"endreportcreate/";

//img history api
export const ImgDriveruploadApi =
  "http://128.199.79.79/cardb/public/uploads/drivers/";

