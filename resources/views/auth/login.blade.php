@extends('layouts.auth')
@section('title') Login @endsection
@section('content')
    <form id="login-form" method="POST" action="{{route('login.post')}}">
        <img src="{{ asset("/img/logo-dark.png") }}" alt="logo">
        @csrf
        <x-atoms.custom-input type="email" maxLength="40" name="email" value="{{old('email')}}" required placeholder="pepe@example.com" />
        <x-atoms.custom-input type="password" minLength="8" name="password" required placeholder="********" />
        @error('email')
            <p class="error">Credenciales incorrectas</p>
        @enderror
        <a href="{{route("register")}}">No tienes una cuenta? Regístrate aquí</a>
        <div>
            <x-atoms.custom-button type="submit" color="primary-button">Iniciar sesión</x-atoms.custom-button>
        </div>
    </form>
    <script>$("#login-form").validate();</script>
@endsection