<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    protected $fillable = [
        'name',
    ];

    public function contents()
    {
        return $this->hasMany(Content::class);
    }
}
