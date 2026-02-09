@extends('layouts.app')
@section('content')

    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>
    <div id="pagination" class="mt-4"></div>

    <x-organisms.update-car-form />

    <script src="{{ asset("js/fetching/my-archives.js") }}"></script>
@endsection