<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Register | AutoHub</title>
    <link rel="stylesheet" href="/css/auth.css">
    <link rel="stylesheet" href="/css/global.css">
</head>
<body>
    <form method="POST" action="{{route('register.post')}}">
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
</body>
</html>