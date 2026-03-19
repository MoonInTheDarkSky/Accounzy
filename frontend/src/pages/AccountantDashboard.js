import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import {
  Users,
  TrendingUp,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Euro,
  Calendar,
  BarChart3,
  Calculator,
  FileCheck,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';

const AccountantDashboard = () => {
  const [stats] = useState({
    totalClients: 28,
    activeClients: 24,
    pendingReviews: 42,
    completedThisMonth: 156,
    totalVATtoProcess: 28450.75,
    upcomingDeadlines: 5,
  });

  const [clients] = useState([
    {
      id: '1',
      name: 'John Client',
      company: 'ABC Company Ltd',
      pendingBills: 8,
      totalExpenses: 5420.50,
      lastActivity: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Mary O\'Sullivan',
      company: 'Dublin Tech Solutions',
      pendingBills: 3,
      totalExpenses: 12850.00,
      lastActivity: '2024-01-14',
      status: 'active',
    },
    {
      id: '3',
      name: 'Patrick Murphy',
      company: 'Murphy Retail Ltd',
      pendingBills: 12,
      totalExpenses: 8975.25,
      lastActivity: '2024-01-13',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Siobhan Walsh',
      company: 'Walsh Consulting',
      pendingBills: 5,
      totalExpenses: 6240.75,
      lastActivity: '2024-01-12',
      status: 'active',
    },
  ]);

  const [pendingBills] = useState([
    {
      id: '1',
      client: 'ABC Company Ltd',
      merchant: 'Office Supplies Ltd',
      amount: 245.80,
      date: '2024-01-15',
      category: 'Office Expenses',
      urgency: 'medium',
    },
    {
      id: '2',
      client: 'Dublin Tech Solutions',
      merchant: 'Tech Equipment Co',
      amount: 1250.00,
      date: '2024-01-14',
      category: 'IT Equipment',
      urgency: 'high',
    },
    {
      id: '3',
      client: 'Murphy Retail Ltd',
      merchant: 'Marketing Agency',
      amount: 3500.00,
      date: '2024-01-13',
      category: 'Professional Services',
      urgency: 'high',
    },
    {
      id: '4',
      client: 'Walsh Consulting',
      merchant: 'Travel Agency',
      amount: 850.50,
      date: '2024-01-12',
      category: 'Travel & Transport',
      urgency: 'low',
    },
  ]);

  const [taxTasks] = useState([
    { task: 'VAT Return - Q4 2023', deadline: '2024-01-31', client: '5 clients', status: 'in_progress' },
    { task: 'Corporation Tax Filing', deadline: '2024-02-15', client: 'ABC Company Ltd', status: 'pending' },
    { task: 'Expense Report Review', deadline: '2024-01-25', client: 'Dublin Tech', status: 'in_progress' },
    { task: 'ROS Submission', deadline: '2024-02-01', client: '3 clients', status: 'pending' },
  ]);

  const getStatusBadge = (status) => {
    const variants = {
      active: { className: 'bg-secondary/10 text-secondary border-secondary/20', label: 'Active' },
      pending: { className: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
      inactive: { className: 'bg-muted text-muted-foreground border-border', label: 'Inactive' },
    };
    const config = variants[status] || variants.active;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getUrgencyBadge = (urgency) => {
    const variants = {
      high: { className: 'bg-destructive/10 text-destructive border-destructive/20', label: 'High' },
      medium: { className: 'bg-warning/10 text-warning border-warning/20', label: 'Medium' },
      low: { className: 'bg-secondary/10 text-secondary border-secondary/20', label: 'Low' },
    };
    const config = variants[urgency] || variants.medium;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accountant Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage clients, review bills, and ensure tax compliance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeClients} active clients
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingReviews}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.completedThisMonth} completed this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VAT to Process</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{stats.totalVATtoProcess.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.upcomingDeadlines} upcoming deadlines
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Clients List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Client Overview</CardTitle>
                <CardDescription>Your active clients and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.company}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {client.pendingBills} pending bills
                            </span>
                            <span className="text-xs text-muted-foreground">
                              €{client.totalExpenses.toFixed(2)} expenses
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(client.status)}
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Bills Review */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Bills Pending Review</CardTitle>
                <CardDescription>Review and approve client expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="high">High Priority</TabsTrigger>
                    <TabsTrigger value="recent">Recent</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4 mt-4">
                    {pendingBills.map((bill) => (
                      <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="bg-warning/10 p-3 rounded-lg">
                            <FileText className="h-5 w-5 text-warning" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{bill.merchant}</p>
                            <p className="text-sm text-muted-foreground">{bill.client}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">{bill.category}</Badge>
                              <span className="text-xs text-muted-foreground">{new Date(bill.date).toLocaleDateString('en-IE')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right mr-4">
                            <p className="font-semibold text-foreground">€{bill.amount.toFixed(2)}</p>
                            {getUrgencyBadge(bill.urgency)}
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="high" className="mt-4">
                    <p className="text-sm text-muted-foreground text-center py-8">High priority bills would be filtered here</p>
                  </TabsContent>
                  <TabsContent value="recent" className="mt-4">
                    <p className="text-sm text-muted-foreground text-center py-8">Recent bills would be shown here</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tax Compliance Tasks */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Tax Compliance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {taxTasks.map((task, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{task.task}</p>
                        <p className="text-xs text-muted-foreground mt-1">{task.client}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Due: {new Date(task.deadline).toLocaleDateString('en-IE')}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Process VAT Returns
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Client
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+353 1 234 5678</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@finntaxpro.ie</span>
                </div>
                <Button className="w-full mt-2" variant="outline" size="sm">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountantDashboard;
