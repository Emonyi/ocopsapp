<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $guarded = [];

    public function topics() {
        return $this->hasMany(Topic::class);
    }

    public function questions() {
        return $this->hasMany(Question::class);
    }
}
