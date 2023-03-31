<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class Room extends Model
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'rooms';
    protected $primaryKey = 'roomId';

    protected $fillable = [
        'name',
        'location',
        'capacity',
        'num_computers',
        'num_projectors',
        'num_microphones',
    ];
}
