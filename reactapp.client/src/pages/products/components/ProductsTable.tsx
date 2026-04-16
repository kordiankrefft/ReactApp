import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import type { Product } from '../../../types/product';
import { formatPLNCurrency } from '../../../utils/format';
import { pl } from '../../../i18n/pl';

interface ProductsTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (code: string) => void;
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps): JSX.Element {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>{pl.products.table.code}</th>
                    <th>{pl.products.table.name}</th>
                    <th>{pl.products.table.category}</th>
                    <th>{pl.products.table.pkwiu}</th>
                    <th>{pl.products.table.price}</th>
                    <th>{pl.products.table.actions}</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.code}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.pkwiu}</td>
                        <td>{formatPLNCurrency(product.price)}</td>
                        <td>
                            <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(product)}>
                                {pl.common.edit}
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => onDelete(product.code)}>
                                {pl.common.delete}
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

