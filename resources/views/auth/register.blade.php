@extends('layouts.auth')
@section('title') Register @endsection
@section('content')
    <form method="POST" action="{{route('register.post')}}">
        <img src="{{ asset("/img/logo-dark.png") }}" alt="logo">
        @csrf
        <x-atoms.custom-input type="text" name="name" required placeholder="Pepe Bonilla" />
        <x-atoms.custom-input type="email" name="email" required placeholder="pepe@example.com" />
        <x-atoms.custom-input type="password" name="password" required placeholder="********" />
        <x-atoms.custom-input type="password" name="password_confirmation" required placeholder="********" />
        <a href="{{route("login")}}">Ya tienes una cuenta? Inicia sesión aquí</a>
        <div>
            <x-atoms.custom-button type="submit" color="primary-button">Registrarte</x-atoms.custom-button>
        </div>
    </form>
@endsection