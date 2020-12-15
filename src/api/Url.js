export const BaseUrl = "http://128.199.79.79/cardb/public/api/";

//login api
export const LoginApi = BaseUrl + "sendOtp";
export const OTPApi = BaseUrl + "verifyOtp";

//time out
export const TimeoutApi = BaseUrl + "checkEndTimeStatus/";

//carlist api
export const CarlistApi = BaseUrl + "carlists?page=";

//car create report
export const CarCreateApi = BaseUrl + "createreport";

//car use api
export const CarUseApi = BaseUrl + "getUsingCar?id=";
