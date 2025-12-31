<?php

namespace App\Http\Requests\Admin;

use App\Models\Content;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContentStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],
            'display_name' => [
                'max:255',
            ],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique(Content::class)
            ],
            'theme_id' => [
                'required',
                'numeric'
            ],
            'description' => [],
            'type' => [],
            'url' => [],
            'is_listed' => [],
            'status' => [],
            'has_categories' => [],
        ];
    }

}
