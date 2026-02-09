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
        'tax',
        'views',
    ];

    protected $casts = [
        'photos' => 'array',
        'status' => 'boolean'
    ];

    public function owner() {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function purchases()
    {
        return $this->belongsToMany(
            Purchase::class,
            'purchase_items'
        )
        ->withPivot('amount')
        ->withTimestamps();
    }
}
