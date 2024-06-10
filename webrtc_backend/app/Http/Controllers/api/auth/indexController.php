<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Requests\api\client\LoginRequest;
use App\Http\Requests\api\client\RegisterRequest;
use App\Models\ClientModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class indexController extends BaseController
{
    public function login(LoginRequest $request)
    {
        $data = $request->except("_token");

        $client = ClientModel::where("email", $data['email'])->first();

        if ($client && Hash::check($data['password'], $client->password)) {
            $token = $client->createToken("webrtc")->accessToken;

            return parent::success("Kullanıcı Girişi Gerçekleştirildi", [
                "id" => $client->id,
                "name" => $client->name,
                "email" => $client->email,
                "conn_string" => $client->conn_string,
                "token_type" => "Bearer",
                "access_token" => $token,
            ]);

        } else {
            return parent::error("Kullanıcı Bilgileri Hatalı");
        }

    }

    public function register(RegisterRequest $request)
    {
        $data = $request->except("_token","password_confirmation");
        $data['password'] = Hash::make($data['password']);
        $data['conn_string'] = Str::random(10);

        $create = ClientModel::create($data);

        if ($create){
            return parent::success("Kullanıcı Kayıt İşlemi Başarılı",[$create],201);
        }else{
            return parent::error("Kullanıcı kayıt işleminde hata oluştu",[]);
        }
    }

    public function profile(Request $request)
    {
        $client = $request->user();

        return parent::success("Kullanıcı Bilgileri Getirildi",[
            "user"=>$client
        ]);
    }

    public function check(Request $request)
    {
        $client = $request->user();

        if ($client){
            $token = $client->createToken("webrtc")->accessToken;

            return response()->json([
                "success" => true,
                "isLoggedIn" => true,
                "data" => [
                    "id" => $client->id,
                    "name" => $client->name,
                    "email" => $client->email,
                    "conn_string" => $client->conn_string,
                    "token_type" => "Bearer",
                    "access_token" => $token,
                ]
            ]);
        }else{
            return response()->json([
                "success" => false,
                "isLoggedIn" => false,
            ]);
        }
    }

    public function logout(Request $request)
    {
        $client = $request->user();
        $token = $client->token();
        $token->revoke();

        return parent::success("Kullanıcı Çıkış İşlemi Başarılı");
    }
}
