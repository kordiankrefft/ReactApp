import type { Employee } from '../types/employee';

export const initialEmployees: Employee[] = [
    { code: '011', firstName: 'Jan', lastName: 'Kowalski', unit: 'Wydział A', address: 'ul. Kowalska 1, Warszawa', phone: '123456789', jobTitle: 'Inżynier', email: 'jan.kowalski@example.com', dateOfBirth: '1985-01-01', nationalId: '85010112345', hasDependents: true },
    { code: '052', firstName: 'Anna', lastName: 'Nowak', unit: 'Wydział B', address: 'ul. Nowa 2, Kraków', phone: '987654321', jobTitle: 'Menadżer', email: 'anna.nowak@example.com', dateOfBirth: '1990-02-02', nationalId: '90020254321', hasDependents: false },
    { code: '143', firstName: 'Marcin', lastName: 'Wiśniewski', unit: 'Wydział C', address: 'ul. Wiśniowa 3, Gdańsk', phone: '456789123', jobTitle: 'Technik', email: 'marcin.wisniewski@example.com', dateOfBirth: '1987-03-03', nationalId: '87030365432', hasDependents: true },
    { code: '234', firstName: 'Robert', lastName: 'Kostuch', unit: 'Wydział D', address: 'ul. Kostuchowa 4, Wrocław', phone: '654321987', jobTitle: 'Dyrektor', email: 'robert.kostuch@example.com', dateOfBirth: '1983-04-04', nationalId: '83040476543', hasDependents: false },
    { code: '012', firstName: 'Oskar', lastName: 'Kaprycki', unit: 'Wydział C', address: 'ul. Kapryśna 5, Poznań', phone: '321654987', jobTitle: 'Projektant', email: 'oskar.kaprycki@example.com', dateOfBirth: '1992-05-05', nationalId: '92050587654', hasDependents: true },
    { code: '063', firstName: 'Paulina', lastName: 'Pykiel', unit: 'Wydział C', address: 'ul. Pykielowa 6, Lublin', phone: '789123456', jobTitle: 'Kierownik', email: 'paulina.pykiel@example.com', dateOfBirth: '1991-06-06', nationalId: '91060698765', hasDependents: false },
    { code: '023', firstName: 'Olga', lastName: 'Wiśniewska', unit: 'Wydział A', address: 'ul. Wiśniowa 7, Szczecin', phone: '123789456', jobTitle: 'Asystent', email: 'olga.wisniewska@example.com', dateOfBirth: '1989-07-07', nationalId: '89070709876', hasDependents: true },
    { code: '099', firstName: 'Katarzyna', lastName: 'Nowicka', unit: 'Wydział E', address: 'ul. Nowicka 8, Poznań', phone: '159753486', jobTitle: 'Specjalista', email: 'katarzyna.nowicka@example.com', dateOfBirth: '1988-08-08', nationalId: '88080812345', hasDependents: false },
];

