export function paginate<T>(items: T[], page: number, perPage: number): T[] {
    const start = (page - 1) * perPage;
    return items.slice(start, start + perPage);
}

export function getTotalPages(totalItems: number, perPage: number): number {
    return Math.max(1, Math.ceil(totalItems / perPage));
}

