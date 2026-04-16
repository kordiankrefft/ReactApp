export type ProductCategory = 'Odziez' | 'Akcesoria' | 'Obuwie' | 'Sprzet' | 'Rekawice' | 'Odziez dziecieca' | 'Sprzet dzieciecy';

export interface Product {
    code: string;
    name: string;
    category: ProductCategory | string;
    pkwiu: string;
    price: number;
}

