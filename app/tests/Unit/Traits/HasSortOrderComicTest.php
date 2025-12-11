<?php

namespace Tests\Unit\Traits;

use App\Models\Category;
use App\Models\Comic;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HasSortOrderComicTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */
    public function test_sort_order_is_compacted_in_old_category_web_moved(): void
    {
        $categoryA = Category::factory()->create();
        $categoryB = Category::factory()->create();

        $ids = [1,2,3,4,5];

        foreach ($ids as $id) {
            Comic::factory()->create([
                            'category_id' => $categoryA->id,
                            'content_id' => $categoryA->content_id,
                            ]);
        }

        // カテゴリAの3つ目（sort_order3）を取得
        $post_3 = Comic::find(3);
        $post_3->update(['category_id' => $categoryB->id]);

        $this->assertEquals(
            [1, 2, 3, 4],
            $categoryA->comics()->orderBy('sort_order')->pluck('sort_order')->toArray(),
        );
    }

    public function test_sort_order_is_appended_in_new_category_when_moved()
    {
        $categoryA = Category::factory()->create();
        $categoryB = Category::factory()->create();

        $ids = [1,2,3,4,5];

        foreach ($ids as $id) {
            Comic::factory()->create([
                            'category_id' => $categoryB->id,
                            'content_id' => $categoryB->content_id,
                            ]);
        }
        foreach ($ids as $id) {
            Comic::factory()->create([
                            'category_id' => $categoryA->id,
                            'content_id' => $categoryA->content_id,
                            ]);
        }

        // カテゴリAの3つ目（sort_order3）を取得
        $post = Comic::find(8);
        $post->update(['category_id' => $categoryB->id]);

        $this->assertEquals(
            [1, 2, 3, 4, 5, 6],
            $categoryB->comics()->orderBy('sort_order')->pluck('sort_order')->toArray(),
        );
    }

    public function test_sort_order_when_moved_backword()
    {
        $categoryA = Category::factory()->create();

        $ids = [1,2,3,4,5];

        foreach ($ids as $id) {
            Comic::factory()->create([
                            'category_id' => $categoryA->id,
                            'content_id' => $categoryA->content_id,
                            ]);
        }

        $comic = Comic::find(3);
        $comic->reorder(1, 2, 'react');
        $this->assertEquals(
            [1, 2, 3, 4, 5],
            $categoryA->comics()->orderBy('sort_order')->pluck('sort_order')->toArray()
        );
    }
}
