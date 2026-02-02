<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login | AutoHub</title>
    <link rel="stylesheet" href="/css/auth.css">
    <link rel="stylesheet" href="/css/global.css">
</head>
<body>
    <form method="POST" action="{{route('login.post')}}">
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
</body>
</html>