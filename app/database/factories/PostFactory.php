<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Category;
use App\Models\Content;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    protected $model = Post::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'content_id' => Content::factory(),
            'title' => fake()->sentence(),
            'body' => fake()->paragraph(4),
            'status' => 'published',
        ];
    }
}
