<?php

namespace App\Trait;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


/**
 * @property static string|null $sortScope
*/
trait HasSortOrder
{
    protected static function bootHasSortOrder()
    {
        static::creating(function (Model $model) {
            $model->sort_order = 1;
            // 既存のデータのsort_order変更
            $query = DB::table($model->getTable());

            if (static::$sortScope && $model->{static::$sortScope}) {
                $query->where(static::$sortScope, $model->{static::$sortScope});
            }

            $query->increment('sort_order');
        });

        static::deleted(function (Model $model) {
            $deletedOrder = $model->sort_order;

            $query = DB::table($model->getTable());

            if (static::$sortScope && $model->{static::$sortScope}) {
                $query->where(static::$sortScope, $model->{static::$sortScope});
            }

            $query->where('sort_order', '>', $deletedOrder)
                ->decrement('sort_order');
        });

        static::updating(function (Model $model) {
            if (!static::$sortScope) {
                return;
            }

            $scopeField = static::$sortScope;
            $oldScopeValue = $model->getOriginal($scopeField);
            $newScopeValue = $model->{$scopeField};

            if ($oldScopeValue == $newScopeValue) {
                return;
            }
            $model->sort_order = 1;

            // 旧sortScope所属のsort_order変更
            $oldSortOrder = $model->getOriginal('sort_order');
            DB::table($model->getTable())
                ->where($scopeField, $oldScopeValue)
                ->where('sort_order', '>', $oldSortOrder)
                ->decrement('sort_order');

            // 新sortScope所属のsort_order変更
            DB::table($model->getTable())
                ->where($scopeField, $newScopeValue)
                ->increment('sort_order');
        });

    }

    public function reorder($from, $to, $type = '')
    {
        if ($type == 'react') {
            $from = $from + 1;
            $to = $to + 1;
        }

        if ($from == $to) {
            return;
        }
        $query = DB::table($this->getTable())
                ->where('id', '!=', $this->id);
        if ($from < $to) {
            // 順番を下げる
            $query
                ->where('sort_order', '>', $from)
                ->where('sort_order', '<=', $to)
                ->decrement('sort_order');
        } else {
            // 順番を上げる
            $query
                ->where('sort_order', '<', $from)
                ->where('sort_order', '>=', $to)
                ->increment('sort_order');
        }
        return $this->updateQuietly([
            'sort_order' => $to
        ]);

    }


}
