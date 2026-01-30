@extends('layouts.app')
@section('content')
<form method="POST" action="{{route('login.post')}}">
    @csrf
    <input type="email" name="email" value="{{old('email')}}" required placeholder="pepe@example.com">
    <input type="password" name="password" required placeholder="********">
    <button type="submit">Submit</button>
</form>
@error('email')
    <p>Error iniciando sesión</p>
@enderror
@endsection