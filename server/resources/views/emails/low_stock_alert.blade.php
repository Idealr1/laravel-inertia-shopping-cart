<x-mail::message>
# Low stock alert

Product: {{ $product->name }}

Current stock: {{ $product->stock_quantity }}

Threshold: {{ $product->low_stock_threshold }}

Price: ${{ number_format($product->price, 2) }}

Please restock soon.

@isset($url)
<x-mail::button :url="$url">
View in Admin
</x-mail::button>
@endisset

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
