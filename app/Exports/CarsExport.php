<?php

namespace App\Exports;

use App\Models\Car;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithMapping;

class CarsExport implements FromQuery, WithHeadings, WithMapping, WithChunkReading
{
    protected Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function query()
    {
        return Car::query()
            ->when($this->request->brand, fn ($q) =>
                $q->where('brand', 'ILIKE', "%{$this->request->brand}")
            )
            ->when($this->request->line, fn ($q) =>
                $q->where('line', 'ILIKE', "%{$this->request->line}")
            )
            ->when($this->request->color, fn ($q) =>
                $q->where('color', $this->request->color)
            )
            ->when($this->request->model, fn ($q) =>
                $q->where('model', $this->request->model)
            )
            ->when($this->request->min_price, fn ($q) =>
                $q->where('price', '>=', $this->request->min_price)
            )
            ->when($this->request->max_price, fn ($q) =>
                $q->where('price', '<=', $this->request->max_price)
            )
            ->where('status', true)
            ->orderBy('id');
    }

    public function headings(): array
    {
        return [
            'ID',
            'Marca',
            'Línea',
            'Modelo',
            'Color',
            'Placa',
            'Precio',
            'Vistas',
            'Propietario',
            'Fecha creación',
        ];
    }

    public function map($car): array
    {
        return [
            $car->id,
            $car->brand,
            $car->line,
            $car->model,
            $car->color,
            $car->plate,
            $car->price,
            $car->views,
            optional($car->owner)->name,
            $car->created_at?->format('Y-m-d'),
        ];
    }

    public function chunkSize(): int
    {
        return 100;
    }
}
