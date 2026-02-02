@extends('layouts.auth')
@section('title') Login @endsection
@section('content')
    <form method="POST" action="{{route('login.post')}}">
        <img src="{{ asset("/img/logo-dark.png") }}" alt="logo">
        @csrf
        <x-atoms.custom-input type="email" name="email" value="{{old('email')}}" required placeholder="pepe@example.com" />
        <x-atoms.custom-input type="password" name="password" required placeholder="********" />
        <a href="{{route("register")}}">No tienes una cuenta? Regístrate aquí</a>
        <div>
            <x-atoms.custom-button type="submit" color="primary-button">Iniciar sesión</x-atoms.custom-button>
        </div>
    </form>
    @error('email')
        <p>Error iniciando sesión</p>
    @enderror
@endsection