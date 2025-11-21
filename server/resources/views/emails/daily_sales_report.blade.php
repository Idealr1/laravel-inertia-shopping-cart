<x-mail::message>
# Daily Sales Report ({{ $date->format('Y-m-d') }})

@if (empty($lines))
No sales recorded today.
@else
| Product | Quantity | Revenue |
|:--|--:|--:|
@foreach($lines as $line)
| {{ $line['name'] }} | {{ $line['quantity'] }} | ${{ $line['revenue'] }} |
@endforeach

**Total Revenue:** ${{ $totalRevenue }}
@endif

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
