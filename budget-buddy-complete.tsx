import React, { useState } from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import { DollarSign, PlusCircle, List, User, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const BudgetBuddyApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {isLoggedIn ? <BudgetBuddyFeatures /> : <LoginPage onLogin={() => setIsLoggedIn(true)} />}
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to BudgetBuddy</CardTitle>
          <CardDescription>Login to manage your finances</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onLogin} className="w-full">
            <img src="/api/placeholder/24/24" alt="Google logo" className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">By logging in, you agree to our Terms of Service and Privacy Policy.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

const BudgetBuddyFeatures = () => {
  const [activeTab, setActiveTab] = useState('budget');

  const renderContent = () => {
    switch (activeTab) {
      case 'budget':
        return <BudgetView />;
      case 'add':
        return <AddTransactionView />;
      case 'transactions':
        return <TransactionsView />;
      case 'account':
        return <AccountView />;
      default:
        return <BudgetView />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 mt-4">
        <div className="flex justify-around py-2">
          <button onClick={() => setActiveTab('budget')} className={`flex flex-col items-center ${activeTab === 'budget' ? 'text-blue-500' : 'text-gray-500'}`}>
            <DollarSign size={24} />
            <span className="text-xs mt-1">Budget</span>
          </button>
          <button onClick={() => setActiveTab('add')} className={`flex flex-col items-center ${activeTab === 'add' ? 'text-blue-500' : 'text-gray-500'}`}>
            <PlusCircle size={24} />
            <span className="text-xs mt-1">Add</span>
          </button>
          <button onClick={() => setActiveTab('transactions')} className={`flex flex-col items-center ${activeTab === 'transactions' ? 'text-blue-500' : 'text-gray-500'}`}>
            <List size={24} />
            <span className="text-xs mt-1">Transactions</span>
          </button>
          <button onClick={() => setActiveTab('account')} className={`flex flex-col items-center ${activeTab === 'account' ? 'text-blue-500' : 'text-gray-500'}`}>
            <User size={24} />
            <span className="text-xs mt-1">Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const BudgetView = () => {
  const data = [
    { name: 'Food', value: 400 },
    { name: 'Rent', value: 800 },
    { name: 'Utilities', value: 200 },
    { name: 'Entertainment', value: 100 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Budget Overview</h2>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Total Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-500">$1,500</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Budget Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="mt-4">
            {data.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center mb-2">
                <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span>{entry.name}: ${entry.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AddTransactionView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
      <Card>
        <CardContent className="pt-6">
          <form>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input type="number" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option>Food</option>
                  <option>Rent</option>
                  <option>Utilities</option>
                  <option>Entertainment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-md" rows="3" placeholder="Add a note"></textarea>
              </div>
              <Button className="w-full">Add Transaction</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionsView = () => {
  const transactions = [
    { id: 1, type: 'expense', amount: 50, category: 'Food', date: '2023-04-15' },
    { id: 2, type: 'income', amount: 1000, category: 'Salary', date: '2023-04-01' },
    { id: 3, type: 'expense', amount: 200, category: 'Utilities', date: '2023-04-10' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions</h2>
      <Card>
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
              {transaction.type === 'expense' ? (
                <ArrowDownCircle className="text-red-500 mr-2" />
              ) : (
                <ArrowUpCircle className="text-green-500 mr-2" />
              )}
              <div>
                <p className="font-semibold">{transaction.category}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <p className={`font-semibold ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
              {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
            </p>
          </div>
        ))}
      </Card>
    </div>
  );
};

const AccountView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account</h2>
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
              JD
            </div>
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-500">john.doe@example.com</p>
            </div>
          </div>
          <Button className="w-full mb-2">Edit Profile</Button>
          <Button variant="outline" className="w-full">Logout</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              <span>Notifications</span>
              <div className="w-10 h-6 bg-blue-500 rounded-full p-1 cursor-pointer">
                <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-4"></div>
              </div>
            </li>
            <li className="flex items-center justify-between">
              <span>Dark Mode</span>
              <div className="w-10 h-6 bg-gray-300 rounded-full p-1 cursor-pointer">
                <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
              </div>
            </li>
            <li className="flex items-center justify-between">
              <span>Currency</span>
              <select className="border border-gray-300 rounded-md p-1">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetBuddyApp;
