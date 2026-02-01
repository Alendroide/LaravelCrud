@extends('layouts.app')
@section('content')

    <x-atoms.custom-button id="upload-car-button" color="success-button" style="margin-left: auto;" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Sube tu vehículo
    </x-atoms.custom-button>

    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>
    
    <x-organisms.modal id="upload-car-modal" title="Sube tu auto">
        <form id="create-car-form" style="display: flex; flex-direction: column; gap: 1rem;">
            <x-atoms.custom-input type="text" maxLength="255" name="brand" placeholder="Marca" required />
            <x-atoms.custom-input type="text" maxLength="255" name="line" placeholder="Linea" required />
            <x-atoms.custom-input type="number" min="1980" max="2026" name="model" placeholder="Modelo" required />
            <x-atoms.custom-input type="text" minLength="6" maxLength="8" name="plate" placeholder="Placa" required />
            <x-atoms.custom-input type="text" maxLength="255" name="color" placeholder="Color" required />
            <div>
                <x-atoms.custom-button type="submit" color="success-button">
                    Guardar vehiculo
                </x-atoms.custom-button>
            </div>
        </form>
    </x-organisms.modal>

    <script src="{{ asset("/js/dashboard.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/dashboard.css") }}">
@endsection