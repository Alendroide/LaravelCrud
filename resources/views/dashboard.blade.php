@extends('layouts.app')
@section('content')
    <x-organisms.filters />
    <x-atoms.spinner id="loading-cars"/>
    
    <div id="cars">
    </div>
    <div id="pagination" class="mt-4"></div>

    <script src="{{ asset("js/fetching/fetch-all.js") }}"></script>
@endsection