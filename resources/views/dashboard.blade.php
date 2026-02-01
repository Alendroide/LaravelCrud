@extends('layouts.app')
@section('content')

    <x-atoms.custom-button id="upload-car-button" color="success-button" style="margin-left: auto;" />

    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>
    
    <x-organisms.modal id="upload-car-modal" title="Sube tu auto">
        <form action="" style="display: flex; flex-direction: column; gap: 1rem;">
            <x-atoms.input type="text" maxLength="255" name="brand" placeholder="Marca" required />
            <x-atoms.input type="text" maxLength="255" name="line" placeholder="Linea" required />
            <x-atoms.input type="number" min="1980" max="2026" name="model" placeholder="Modelo" required />
            <x-atoms.input type="text" minLength="6" maxLength="8" name="plate" placeholder="Placa" required />
            <x-atoms.input type="text" maxLength="255" name="color" placeholder="Color" required />
            <button></button>
        </form>
    </x-organisms.modal>

    <script src="{{ asset("/js/dashboard.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/dashboard.css") }}">
@endsection