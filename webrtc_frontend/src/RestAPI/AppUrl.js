class AppUrl{
    static baseURL = "http://127.0.0.1:8000/";

    static apiBaseUrl = "http://127.0.0.1:8000/api";

    // auth
    static login = this.apiBaseUrl+"/client/login";
    static register = this.apiBaseUrl+"/client/register";
    static profile = this.apiBaseUrl+"/client/profile";
    static check = this.apiBaseUrl+"/client/check";
    static logout = this.apiBaseUrl+"/client/logout";

    // home
    static home = this.apiBaseUrl+"/home";

    // video
    static video = this.apiBaseUrl+"/video";
}

export default AppUrl;
