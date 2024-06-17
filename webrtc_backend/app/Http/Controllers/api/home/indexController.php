<?php

namespace App\Http\Controllers\api\home;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\ClientModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();

        $clientList = ClientModel::where([
            ["id","!=",$client->id],
            ["conn_string","!=",$client->conn_string],
        ])->get();

        return parent::success("Kullanıcı Listesi Getirildi",[
            "clients" =>$clientList
        ],200);
    }
}
