<?php

namespace Tests\Unit\Traits;

use App\Models\Category;
use App\Models\Post;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HasSortOrderTest extends TestCase
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
            $post[$id] = Post::factory()->create([
                            'category_id' => $categoryA->id,
                            'content_id' => $categoryA->content_id,
                            ]);
        }

        $post[2]->update(['category_id' => $categoryB->id]);

        $this->assertEquals(
            [1, 2, 3, 4],
            $categoryA->posts()->orderBy('sort_order')->pluck('sort_order')->toArray(),
        );

    }
}
