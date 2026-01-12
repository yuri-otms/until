<?php

namespace App\Trait;

use Illuminate\Database\Eloquent\Model;

trait HasPrevNextNavigation
{
    public function previous(): ?Model
    {
        return
            $this->previousInSameCategory() ?? $this->previousAcrossCategories();
    }

    public function next(): ?Model
    {
        return
            $this->nextInSameCategory() ?? $this->nextAcrossCategories();
    }

    public function previousWithUrl()
    {
        $prev = $this->previous();
        if ($prev) {
            $prev->url = route($this->routeName(), ['content' => $this->content->slug, $this->content->type => $prev]);
        }
        return $prev;
    }

    public function nextWithUrl()
    {
        $next = $this->next();
        if ($next) {
            $next->url = route($this->routeName(), ['content' => $this->content->slug, $this->content->type => $next]);
        }
        return $next;
    }

    protected function previousInSameCategory(): ?Model
    {
        return static::where('category_id', $this->category_id)
            ->where('status', 'published')
            ->where('sort_order', '<', $this->sort_order)
            ->orderByDesc('sort_order')
            ->first();
    }

    protected function nextInSameCategory(): ?Model
    {
        return static::where('category_id', $this->category_id)
            ->where('status', 'published')
            ->where('sort_order', '>', $this->sort_order)
            ->orderBy('sort_order')
            ->first();
    }

    protected function previousAcrossCategories(): ?Model
    {
        $currentCategory = $this->category;
        if (!$currentCategory) {
            return null;
        }
        $targetCategory = $currentCategory->newQuery()
                            ->where('content_id', $this->content_id)
                            ->where('sort_order', '<', $currentCategory->sort_order)
                            ->orderByDesc('sort_order')
                            ->first();
        if (!$targetCategory) {
            return null;
        }
        // そのカテゴリの最後の記事
        return static::where('category_id', $targetCategory->id)
            ->orderByDesc('sort_order')
            ->first();
    }

    protected function nextAcrossCategories(): ?Model
    {
        $currentCategory = $this->category;
        if (!$currentCategory) {
            return null;
        }
        $targetCategory = $currentCategory->newQuery()
                            ->where('content_id', $this->content_id)
                            ->where('sort_order', '>', $currentCategory->sort_order)
                            ->orderBy('sort_order')
                            ->first();
        if (!$targetCategory) {
            return null;
        }

        // そのカテゴリの最初の記事
        return static::where('category_id', $targetCategory->id)
            ->orderBy('sort_order')
            ->first();
    }
    abstract protected function routeName(): string;
}
