import { AddProductForm } from '@/app/componets/AddProductForm';
import OrdersTable from '@/app/componets/OrdersTable';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <AddProductForm />
        </div>
        <div>
          <OrdersTable />
        </div>
      </div>
    </div>
  );
}

