<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up()
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->json('photos')->nullable()->after('color');
            $table->foreignId('owner_id')
                  ->constrained('users')
                  ->nullOnDelete()
                  ->after('photos');
        });
    }

    public function down()
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropForeign(['owner_id']);
            $table->dropColumn(['photos', 'owner_id']);
        });
    }
};
