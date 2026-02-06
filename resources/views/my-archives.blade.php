@extends('layouts.app')
@section('content')

    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>
    <div id="pagination" class="mt-4"></div>

    <x-organisms.update-car-form />

    <script src="{{  asset("js/cars/cart.js") }}"></script>
    <script src="{{ asset("/js/cars/car-actions.js") }}"></script>
    <script src="{{ asset("/js/cars/fetching/my-archives.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/cars/global.css") }}">
@endsection