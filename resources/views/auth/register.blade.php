<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Register | AutoHub</title>
</head>
<body>
    <form method="POST" action="{{route('register.post')}}">
        @csrf
        <input type="text" name="name" required placeholder="Pepe Bonilla">
        <input type="email" name="email" required placeholder="pepe@example.com">
        <input type="password" name="password" required placeholder="********">
        <input type="password" name="password_confirmation" required placeholder="********">
        <button type="submit">Submit</button>
    </form>
</body>
</html>