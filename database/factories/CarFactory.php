<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Car;
use App\Models\User;

class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition(): array
    {
        return [
            'color'     => $this->faker->randomElement([
                'rojo', 'azul', 'negro', 'blanco', 'gris', 'plata', 'amarillo', 'verde', 'naranja', 'rojo_metalico', 'azul_metalico', 'gris_metalico', 'plata_metalico', 'negro_metalico', 'verde_metalico',
            ]),
            'plate'     => strtoupper($this->faker->bothify('???###')),
            'brand'     => $this->faker->randomElement([
                'Toyota', 'Mazda', 'Chevrolet', 'Renault', 'Kia', 'Nissan', 'Hyundai', 'Volkswagen', 'Peugeot', 'Ford', 'Mercedes', 'BMW', 'Audi', 'Lamborghini', 'Ferrari', 'Mclaren', 'Bugatti',
            ]),
            'line'      => $this->faker->word(),
            'model'     => $this->faker->numberBetween(1980, 2026),
            'photos'    => [],
            'owner_id'  => User::factory(),
            'price'     => $this->faker->numberBetween(10_000_000, 150_000_000),
        ];
    }
}
