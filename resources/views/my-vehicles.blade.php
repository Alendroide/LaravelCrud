@extends('layouts.app')
@section('content')
    <x-atoms.custom-button id="upload-car-button" color="success-button" style="margin-left: auto;" >
        <x-icons.plus />
        Sube tu vehículo
    </x-atoms.custom-button>

    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>
    <div id="pagination" class="mt-4"></div>

    <x-organisms.create-car-form />
    <x-organisms.update-car-form />

    <script src="{{ asset("/js/cars/car-actions.js") }}"></script>
    <script src="{{ asset("/js/cars/fetching/my-own.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/cars/global.css") }}">
@endsection