@extends('layouts.app')
@section('content')

    <x-atoms.upload-car-button id="upload-car-button" style="margin-left: auto;" />

    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>

    <x-organisms.modal id="upload-car-modal" title="Sube tu auto">
        Hola
    </x-organisms.modal>

    <script src="{{ asset("/js/dashboard.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/dashboard.css") }}">
@endsection