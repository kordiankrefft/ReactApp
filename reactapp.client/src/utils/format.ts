export function formatPLNCurrency(value: number): string {
    return new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    }).format(value);
}

