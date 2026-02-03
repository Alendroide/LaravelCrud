<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'color',
        'plate',
        'brand',
        'line',
        'model',
        'photos',
        'owner_id',
        'price',
        'views',
    ];

    protected $casts = [
        'photos' => 'array',
    ];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

}
