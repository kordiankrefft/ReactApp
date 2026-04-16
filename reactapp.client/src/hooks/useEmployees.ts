import { useMemo, useState } from 'react';
import type { Employee } from '../types/employee';

export interface EmployeeFilters {
    lastNameQuery: string;
    unit: string;
    dependentsOnly: boolean;
}

export function useEmployees(initial: Employee[]) {
    const [employees, setEmployees] = useState<Employee[]>(initial);
    const [filters, setFilters] = useState<EmployeeFilters>({
        lastNameQuery: '',
        unit: '',
        dependentsOnly: false,
    });

    const filtered = useMemo(() => {
        const q = filters.lastNameQuery.trim().toLowerCase();
        return employees.filter((e) => {
            if (q && !e.lastName.toLowerCase().includes(q)) return false;
            if (filters.unit && e.unit !== filters.unit) return false;
            if (filters.dependentsOnly && !e.hasDependents) return false;
            return true;
        });
    }, [employees, filters]);

    const removeByCode = (code: string) => setEmployees((prev) => prev.filter((e) => e.code !== code));
    const upsert = (next: Employee) => setEmployees((prev) => prev.map((e) => (e.code === next.code ? next : e)));

    return { employees, setEmployees, filters, setFilters, filtered, removeByCode, upsert };
}

