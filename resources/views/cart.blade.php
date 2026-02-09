@extends('layouts.app')
@section('content')
    <p class="fs-3 fw-bold">Tu carrito</p>
    <div id="cart">
    </div>

    <div id="cart-total" class="mt-4"></div>

    <link rel="stylesheet" href="{{ asset("css/cars/cart.css") }}">
    <script src="{{ asset("js/cart.js") }}"></script>
@endsection