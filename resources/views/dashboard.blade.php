@extends('layouts.app')
@section('content')
    <x-organisms.filters />
    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>
    <div id="pagination" class="mt-4"></div>
    
    <x-organisms.create-car-form />
    <x-organisms.update-car-form />

    <script src="{{  asset("js/cars/cart.js") }}"></script>
    <script src="{{ asset("js/cars/car-actions.js") }}"></script>
    <script src="{{ asset("js/cars/fetching/fetch-all.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("css/cars/global.css") }}">
@endsection