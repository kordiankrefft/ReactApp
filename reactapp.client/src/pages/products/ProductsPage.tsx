import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { initialProducts, productCategories } from '../../mock/products';
import { useProducts } from '../../hooks/useProducts';
import { ProductsFilters } from './components/ProductsFilters';
import { ProductsTable } from './components/ProductsTable';
import { EditProductModal } from './components/EditProductModal';

export const Products: React.FC = () => {
    const productsState = useProducts(initialProducts, 10);
    const { filters, setFilters, page, setPage, current, totalPages, removeByCode, upsert } = productsState;

    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Product | null>(null);

    const openEdit = (product: Product) => {
        setSelected(product);
        setEditOpen(true);
    };

    return (
        <Container fluid>
            <ProductsFilters
                filters={filters}
                categories={productCategories}
                onChange={(name, value) => {
                    setFilters((prev) => ({ ...prev, [name]: value }));
                    setPage(1);
                }}
            />

            <ProductsTable
                products={current}
                onEdit={openEdit}
                onDelete={(code) => removeByCode(code)}
            />

            <Pagination className="justify-content-center mt-3">
                <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
                <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === page}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages} />
                <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
            </Pagination>

            <EditProductModal
                show={editOpen}
                product={selected}
                categories={productCategories}
                onClose={() => setEditOpen(false)}
                onSave={(next) => {
                    upsert(next);
                    setEditOpen(false);
                }}
            />
        </Container>
    );
};

