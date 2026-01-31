<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login | AutoHub</title>
</head>
<body>
    <form method="POST" action="{{route('login.post')}}">
        @csrf
        <input type="email" name="email" value="{{old('email')}}" required placeholder="pepe@example.com">
        <input type="password" name="password" required placeholder="********">
        <button type="submit">Submit</button>
    </form>
    @error('email')
        <p>Error iniciando sesión</p>
    @enderror
</body>
</html>