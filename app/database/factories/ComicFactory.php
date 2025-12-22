<?php

namespace Database\Factories;

use App\Models\Comic;
use App\Models\Category;
use App\Models\Content;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comic>
 */
class ComicFactory extends Factory
{
    protected $model = Comic::class;
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
            'title' => $this->faker->sentence(),
            'body' => $this->faker->paragraph(4),
            'status' => 'published',
        ];
    }
}
