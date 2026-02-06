@extends('layouts.app')
@section('content')
    <p class="fs-3 fw-bold">Mis compras</p>
    <div id="purchased-cars">
    </div>

    <link rel="stylesheet" href="{{ asset("css/cars/global.css") }}">
    <link rel="stylesheet" href="{{ asset("css/cars/cart.css") }}">
    <script src="{{ asset("js/cars/bought-cars.js") }}"></script>
@endsection