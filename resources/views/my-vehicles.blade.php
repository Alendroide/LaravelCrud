@extends('layouts.app')
@section('content')
    <x-atoms.spinner id="loading-cars"/>
    <div id="cars">
    </div>
    <script src="{{ asset("/js/my-vehicles.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/my-vehicles.css") }}">
@endsection