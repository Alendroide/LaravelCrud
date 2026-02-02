@extends('layouts.app')

@section('content')
    <a class="back-button" href="{{url()->previous()}}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Volver
    </a>

    <x-atoms.spinner id="loading-vehicle"/>

    <div id="vehicle"></div>

    <script>
        window.VEHICLE_ID = {{ request()->route('id') }};
    </script>

    <script src="{{ asset('/js/vehicle-show.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('/css/vehicle-show.css') }}">
@endsection
