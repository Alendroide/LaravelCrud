<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function show($cc)
    {
        $client = Client::where('cc', $cc)->first();
        return $client;
    }
}
