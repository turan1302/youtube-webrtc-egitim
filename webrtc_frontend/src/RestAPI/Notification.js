import Swal from "sweetalert2";

class Notification{
    static success = (data)=>{
        return Swal.fire({
            title : data.title,
            text : data.message,
            icon : "success",
            confirmButtonText : "OK"
        })
    }

    static error = (data)=>{
        return Swal.fire({
            title : data.title,
            text : data.message,
            icon : "error",
            confirmButtonText : "OK"
        })
    }
}

export default Notification;
