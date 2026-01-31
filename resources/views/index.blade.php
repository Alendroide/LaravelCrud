@extends('layouts.app')
@section('content')
    <x-spinner id="loading-cars"/>
    <div id="cars">
    </div>
    <script src="{{ asset("/js/dashboard.js") }}"></script>
    <link rel="stylesheet" href="{{ asset("/css/dashboard.css") }}">
@endsection