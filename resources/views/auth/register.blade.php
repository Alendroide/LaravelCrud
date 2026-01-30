@extends('layouts.app')
@section('content')
<form method="POST" action="{{route('register.post')}}">
    @csrf
    <input type="text" name="name" required placeholder="Pepe Bonilla">
    <input type="email" name="email" required placeholder="pepe@example.com">
    <input type="password" name="password" required placeholder="********">
    <input type="password_confirmation" name="password" required placeholder="********">
    <button type="submit">Submit</button>
</form>
@endsection