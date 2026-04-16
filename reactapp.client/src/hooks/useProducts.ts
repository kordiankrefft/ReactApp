import { useMemo, useState } from 'react';
import type { Product } from '../types/product';
import { getTotalPages, paginate } from '../utils/pagination';

export interface ProductFilters {
    name: string;
    priceFrom: string;
    priceTo: string;
    category: string;
}

export function useProducts(initial: Product[], perPage = 10) {
    const [products, setProducts] = useState<Product[]>(initial);
    const [filters, setFilters] = useState<ProductFilters>({
        name: '',
        priceFrom: '',
        priceTo: '',
        category: '',
    });
    const [page, setPage] = useState<number>(1);

    const filtered = useMemo(() => {
        const name = filters.name.trim().toLowerCase();
        const priceFrom = filters.priceFrom ? Number(filters.priceFrom) : null;
        const priceTo = filters.priceTo ? Number(filters.priceTo) : null;
        const category = filters.category;

        return products.filter((p) => {
            if (name && !p.name.toLowerCase().includes(name)) return false;
            if (priceFrom !== null && p.price < priceFrom) return false;
            if (priceTo !== null && p.price > priceTo) return false;
            if (category && p.category !== category) return false;
            return true;
        });
    }, [filters, products]);

    const totalPages = getTotalPages(filtered.length, perPage);
    const current = useMemo(() => paginate(filtered, page, perPage), [filtered, page, perPage]);

    const removeByCode = (code: string) => {
        setProducts((prev) => prev.filter((p) => p.code !== code));
    };

    const upsert = (next: Product) => {
        setProducts((prev) => prev.map((p) => (p.code === next.code ? next : p)));
    };

    return {
        products,
        setProducts,
        filters,
        setFilters,
        page,
        setPage,
        perPage,
        filtered,
        current,
        totalPages,
        removeByCode,
        upsert,
    };
}

