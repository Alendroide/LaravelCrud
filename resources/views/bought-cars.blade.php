@extends('layouts.app')
@section('content')
    <p class="fs-3 fw-bold">Mis compras</p>
    
    <x-atoms.spinner id="loading-cars"/>

    <div id="purchased-cars">
    </div>

    <link rel="stylesheet" href="{{ asset("css/cars/bought-cars.css") }}">
    <script src="{{ asset("js/bought-cars.js") }}"></script>
@endsection