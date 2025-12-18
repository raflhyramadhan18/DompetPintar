<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'amount',
        'description',
        'transaction_date',
    ];

    // Tambahkan Relasi biar enak dipanggil nanti
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
