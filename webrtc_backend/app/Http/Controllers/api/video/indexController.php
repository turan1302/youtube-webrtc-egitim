<?php

namespace App\Http\Controllers\api\video;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\ClientModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        if ($data['conn_string']==$client->conn_string){
            return parent::error("Kendinizle eşleşemezsiniz",[],404);
        }

        $clientCheck = ClientModel::where([
            ["conn_string","=",$data['conn_string']]
        ])->first();

        if (!$clientCheck){
            return parent::error("Kullanıcı Bulunamadı",[],404);
        }
    }
}
