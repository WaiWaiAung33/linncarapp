import { exp } from "react-native/Libraries/Animated/src/Easing";

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

//refuel list
export const GetRefuelApi = BaseUrl + "getAllfuel?driverId=";

//refuel create
export const CreateRefuelApi = BaseUrl + "createFuel";

//edit fuel
export const EditRefuelApi  = BaseUrl + "editFuel/";

//img url
export const ImguploadApi ="http://128.199.79.79/cardb/public/uploads/fuel/";

//maintence list api
export const MaintenceListApi  = BaseUrl + "getallMaintenance?driverId=";

//get history api
export const gethistoryapi  = BaseUrl + "getAllHistory?driverId=";




