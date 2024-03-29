<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('records', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('userId');
            $table->unsignedBigInteger('roomId');
            $table->timestamp('timeFrom');
            $table->timestamp('timeTo');
            $table->integer('status')->default(0);
            $table->timestamps();
            $table->foreign('userId')->references('userId')->on('users');
            $table->foreign('roomId')->references('roomId')->on('rooms');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('records');
    }
};
