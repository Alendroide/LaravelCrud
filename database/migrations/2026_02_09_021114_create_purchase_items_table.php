<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::table('purchases', function (Blueprint $table) {
            $table->dropColumn(['items']);
        });

        Schema::create('purchase_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('purchase_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('car_id')
                ->constrained()
                ->cascadeOnDelete();
            
            $table->integer('amount');

            $table->timestamps();

            $table->unique(['purchase_id', 'car_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('purchase_items');
        Schema::table('purchases', function (Blueprint $table) {
            $table->json('items')->after('user_id');
        });
    }
};
