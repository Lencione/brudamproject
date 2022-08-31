<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    
    public function store(OrderRequest $request)
    {
        try {
            Order::create($request->all());
        } catch (\Throwable $th) {
           return response()->json('Não foi possível inserir os dados.'.$th, 402);
        }
        return response()->json(['message' => 'Pedido inserido com sucesso!'], 200);
    }

    public function getAll()
    {
        return json_encode(Order::with('client')->paginate(10));
    }

    public function destroy(Order $order)
    {
        //
    }
}
