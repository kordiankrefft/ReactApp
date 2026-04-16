import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
/*import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";*/
import { ProductCreate } from './pages/products/ProductCreatePage';
import { Products } from './pages/products/ProductsPage';
import { ProductDetails } from './pages/products/ProductDetailsPage';
import { ProductReports } from './pages/products/ProductReportsPage';
import { BusinessPartners } from './pages/businessPartners/BusinessPartnersPage';
import { EmployeeCreate } from './pages/employees/EmployeeCreatePage';
import { Employees } from './pages/employees/EmployeesPage';
import { Payroll } from './pages/employees/PayrollPage';
import { EmployeeReports } from './pages/employees/EmployeeReportsPage';
import { Invoices } from './pages/invoices/InvoicesPage';
import { Certificates } from './pages/development/CertificatesPage';
import { Trainings } from './pages/development/TrainingsPage';
import { Account } from './pages/account/AccountPage';
import { Support } from './pages/support/SupportPage';
import { Returns } from './pages/returns/ReturnsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';

/*const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/towar",
        element: <Towar />,
    },
    {
        path: "/towary",
        element: <Towary />,
    },
]);*/
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        {/*<RouterProvider router={router} />*/}
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<App />} />
                    <Route path='/towar' element={<ProductCreate />} />
                    <Route path='/towary' element={<Products />} />
                    <Route path='/raporty' element={<ProductReports />} />
                    <Route path='/pracownik' element={<EmployeeCreate />} />
                    <Route path='/pracownicy' element={<Employees />} />
                    <Route path='/place' element={<Payroll />} />
                    <Route path='/raport' element={<EmployeeReports />} />
                    <Route path='/kontrahenci' element={<BusinessPartners />} />
                    <Route path='/faktury' element={<Invoices />} />
                    <Route path='/certyfikaty' element={<Certificates />} />
                    <Route path='/szkolenia' element={<Trainings />} />
                    <Route path='/moje-konto' element={<Account />} />
                    <Route path='/pomocikontakt' element={<Support />} />
                    <Route path='/szczegoly-produktow' element={<ProductDetails />} />
                    <Route path='/zwroty' element={<Returns />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

