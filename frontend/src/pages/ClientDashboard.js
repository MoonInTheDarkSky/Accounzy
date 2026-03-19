import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Scan, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign,
  PieChart,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  Euro
} from 'lucide-react';
import { toast } from 'sonner';

const ClientDashboard = () => {
  const { user } = useAuth();
  
  // Mock data
  const [stats] = useState({
    totalExpenses: 15420.50,
    thisMonth: 3280.75,
    pendingReview: 8,
    approved: 45,
    vatRecoverable: 2150.25,
  });

  const [recentBills] = useState([
    {
      id: '1',
      merchant: 'Office Supplies Ltd',
      amount: 245.80,
      date: '2024-01-15',
      category: 'Office Expenses',
      status: 'approved',
      vatAmount: 49.16,
    },
    {
      id: '2',
      merchant: 'Tech Solutions Ireland',
      amount: 1250.00,
      date: '2024-01-14',
      category: 'IT Equipment',
      status: 'pending',
      vatAmount: 250.00,
    },
    {
      id: '3',
      merchant: 'Dublin Catering Services',
      amount: 385.50,
      date: '2024-01-13',
      category: 'Entertainment',
      status: 'approved',
      vatAmount: 77.10,
    },
    {
      id: '4',
      merchant: 'Fuel Station Cork',
      amount: 95.25,
      date: '2024-01-12',
      category: 'Travel & Transport',
      status: 'pending',
      vatAmount: 19.05,
    },
    {
      id: '5',
      merchant: 'Amazon Business',
      amount: 520.00,
      date: '2024-01-10',
      category: 'Office Supplies',
      status: 'approved',
      vatAmount: 104.00,
    },
  ]);

  const [expenses] = useState([
    { category: 'Office Expenses', amount: 4250.50, percentage: 28, color: 'bg-chart-1' },
    { category: 'IT Equipment', amount: 3800.00, percentage: 25, color: 'bg-chart-2' },
    { category: 'Travel & Transport', amount: 2950.25, percentage: 19, color: 'bg-chart-3' },
    { category: 'Entertainment', amount: 2420.00, percentage: 16, color: 'bg-chart-4' },
    { category: 'Professional Services', amount: 1999.75, percentage: 12, color: 'bg-chart-5' },
  ]);

  const getStatusBadge = (status) => {
    const variants = {
      approved: { variant: 'default', className: 'bg-secondary text-secondary-foreground', icon: <CheckCircle2 className="h-3 w-3" /> },
      pending: { variant: 'secondary', className: 'bg-warning/10 text-warning border-warning/20', icon: <Clock className="h-3 w-3" /> },
      rejected: { variant: 'destructive', icon: <AlertCircle className="h-3 w-3" /> },
    };
    const config = variants[status] || variants.pending;
    return (
      <Badge className={config.className}>
        {config.icon}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const handleQuickScan = () => {
    toast.info('Opening bill scanner...');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground mt-1">Manage your expenses and track your financial health</p>
          </div>
          <Link to="/client/scan">
            <Button className="bg-primary hover:bg-primary/90 shadow-md">
              <Scan className="mr-2 h-4 w-4" />
              Scan New Bill
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{stats.totalExpenses.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 text-secondary mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{stats.thisMonth.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingDown className="inline h-3 w-3 text-destructive mr-1" />
                -5.2% from average
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VAT Recoverable</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{stats.vatRecoverable.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">Available for claim</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReview}</div>
              <p className="text-xs text-muted-foreground mt-1">{stats.approved} approved this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Bills */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Recent Bills</CardTitle>
                <CardDescription>Your latest expense submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4 mt-4">
                    {recentBills.map((bill) => (
                      <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{bill.merchant}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{bill.category}</Badge>
                              <span className="text-xs text-muted-foreground">{new Date(bill.date).toLocaleDateString('en-IE')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold text-foreground">€{bill.amount.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">VAT: €{bill.vatAmount.toFixed(2)}</p>
                          </div>
                          {getStatusBadge(bill.status)}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="pending" className="space-y-4 mt-4">
                    {recentBills.filter(b => b.status === 'pending').map((bill) => (
                      <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="bg-warning/10 p-3 rounded-lg">
                            <Clock className="h-5 w-5 text-warning" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{bill.merchant}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{bill.category}</Badge>
                              <span className="text-xs text-muted-foreground">{new Date(bill.date).toLocaleDateString('en-IE')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold text-foreground">€{bill.amount.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">VAT: €{bill.vatAmount.toFixed(2)}</p>
                          </div>
                          {getStatusBadge(bill.status)}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="approved" className="space-y-4 mt-4">
                    {recentBills.filter(b => b.status === 'approved').map((bill) => (
                      <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="bg-secondary/10 p-3 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-secondary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{bill.merchant}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{bill.category}</Badge>
                              <span className="text-xs text-muted-foreground">{new Date(bill.date).toLocaleDateString('en-IE')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold text-foreground">€{bill.amount.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">VAT: €{bill.vatAmount.toFixed(2)}</p>
                          </div>
                          {getStatusBadge(bill.status)}
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Expense Breakdown */}
          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>By category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{expense.category}</span>
                      <span className="font-medium">€{expense.amount.toFixed(2)}</span>
                    </div>
                    <Progress value={expense.percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground text-right">{expense.percentage}% of total</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/client/scan">
                  <Button className="w-full justify-start" variant="outline">
                    <Scan className="mr-2 h-4 w-4" />
                    Scan New Bill
                  </Button>
                </Link>
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <PieChart className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
