<?php

namespace App\Trait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

trait HasSortOrder
{
    protected static function bootHasSortOrder()
    {
        static::creating(function (Model $model) {
            $model->sort_order = 1;
            // 既存のデータのsort_order変更
            DB::table($model->getTable())
                ->increment('sort_order');
        });

        static::deleted(function (Model $model) {
            $deletedOrder = $model->sort_order;
            DB::table($model->getTable())
                ->where('sort_order', '>', $deletedOrder)
                ->decrement('sort_order');
        });

    }



}
