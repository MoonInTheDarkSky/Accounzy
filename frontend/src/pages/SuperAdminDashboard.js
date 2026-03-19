import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Users,
  Shield,
  Activity,
  AlertTriangle,
  TrendingUp,
  Database,
  Lock,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Server,
  BarChart3,
  UserCog,
  Eye,
  Download
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 156,
    activeUsers: 142,
    totalClients: 98,
    totalAccountants: 44,
    systemHealth: 98,
    gdprCompliance: 100,
    dataBreaches: 0,
    pendingConsents: 3,
  });

  const [users] = useState([
    {
      id: '1',
      name: 'John Client',
      email: 'john@example.com',
      role: 'client',
      status: 'active',
      lastActive: '2024-01-15',
      gdprConsent: true,
    },
    {
      id: '2',
      name: 'Sarah Accountant',
      email: 'sarah@accounting.ie',
      role: 'accountant',
      status: 'active',
      lastActive: '2024-01-15',
      gdprConsent: true,
    },
    {
      id: '3',
      name: 'Mary O\'Sullivan',
      email: 'mary@tech.ie',
      role: 'client',
      status: 'active',
      lastActive: '2024-01-14',
      gdprConsent: true,
    },
    {
      id: '4',
      name: 'Patrick Murphy',
      email: 'patrick@murphy.ie',
      role: 'accountant',
      status: 'inactive',
      lastActive: '2024-01-10',
      gdprConsent: false,
    },
  ]);

  const [gdprActivities] = useState([
    {
      type: 'consent_granted',
      user: 'john@example.com',
      action: 'Data Processing Consent Granted',
      timestamp: '2024-01-15 14:30',
      status: 'success',
    },
    {
      type: 'data_export',
      user: 'mary@tech.ie',
      action: 'Personal Data Export Requested',
      timestamp: '2024-01-15 12:15',
      status: 'completed',
    },
    {
      type: 'consent_updated',
      user: 'sarah@accounting.ie',
      action: 'Marketing Consent Updated',
      timestamp: '2024-01-14 16:45',
      status: 'success',
    },
    {
      type: 'data_deletion',
      user: 'old@user.com',
      action: 'Account Deletion Requested',
      timestamp: '2024-01-14 10:20',
      status: 'pending',
    },
  ]);

  const [systemMetrics] = useState([
    { name: 'API Response Time', value: '95ms', status: 'good', progress: 95 },
    { name: 'Database Performance', value: '98%', status: 'excellent', progress: 98 },
    { name: 'Uptime', value: '99.9%', status: 'excellent', progress: 99.9 },
    { name: 'Storage Used', value: '45%', status: 'good', progress: 45 },
  ]);

  const getRoleBadge = (role) => {
    const variants = {
      client: { className: 'bg-primary/10 text-primary border-primary/20', label: 'Client' },
      accountant: { className: 'bg-secondary/10 text-secondary border-secondary/20', label: 'Accountant' },
      super_admin: { className: 'bg-accent/10 text-accent border-accent/20', label: 'Admin' },
    };
    const config = variants[role] || variants.client;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: { className: 'bg-secondary/10 text-secondary border-secondary/20', icon: <CheckCircle2 className="h-3 w-3" />, label: 'Active' },
      inactive: { className: 'bg-muted text-muted-foreground border-border', icon: <Clock className="h-3 w-3" />, label: 'Inactive' },
      suspended: { className: 'bg-destructive/10 text-destructive border-destructive/20', icon: <XCircle className="h-3 w-3" />, label: 'Suspended' },
    };
    const config = variants[status] || variants.active;
    return (
      <Badge className={config.className}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getActivityIcon = (type) => {
    const icons = {
      consent_granted: <CheckCircle2 className="h-5 w-5 text-secondary" />,
      data_export: <Download className="h-5 w-5 text-primary" />,
      consent_updated: <FileText className="h-5 w-5 text-warning" />,
      data_deletion: <XCircle className="h-5 w-5 text-destructive" />,
    };
    return icons[type] || <Activity className="h-5 w-5" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
          <p className="text-muted-foreground mt-1">Monitor system health, manage users, and ensure compliance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <TrendingUp className="inline h-3 w-3 text-secondary mr-1" />
                {stats.activeUsers} active
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemHealth}%</div>
              <Progress value={stats.systemHealth} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GDPR Compliance</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.gdprCompliance}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                <CheckCircle2 className="inline h-3 w-3 text-secondary mr-1" />
                Fully compliant
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Breaches</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stats.dataBreaches}</div>
              <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* User Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage system users and permissions</CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Users className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="clients">Clients</TabsTrigger>
                    <TabsTrigger value="accountants">Accountants</TabsTrigger>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4 mt-4">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <UserCog className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              {getRoleBadge(user.role)}
                              <span className="text-xs text-muted-foreground">
                                Last active: {new Date(user.lastActive).toLocaleDateString('en-IE')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(user.status)}
                          {user.gdprConsent ? (
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                              <Shield className="h-3 w-3 mr-1" />
                              GDPR
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-warning">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              No Consent
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="clients" className="mt-4">
                    <p className="text-sm text-muted-foreground text-center py-8">
                      {stats.totalClients} client accounts
                    </p>
                  </TabsContent>
                  <TabsContent value="accountants" className="mt-4">
                    <p className="text-sm text-muted-foreground text-center py-8">
                      {stats.totalAccountants} accountant accounts
                    </p>
                  </TabsContent>
                  <TabsContent value="admins" className="mt-4">
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Administrator accounts
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* GDPR Activity Log */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>GDPR Activity Log</span>
                </CardTitle>
                <CardDescription>Recent data protection and privacy activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gdprActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.user}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                        </div>
                      </div>
                      <Badge
                        className={
                          activity.status === 'success' || activity.status === 'completed'
                            ? 'bg-secondary/10 text-secondary border-secondary/20'
                            : 'bg-warning/10 text-warning border-warning/20'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Metrics */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>System Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{metric.name}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <Progress value={metric.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* GDPR Compliance Card */}
            <Card className="border-2 bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>GDPR Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Protection Impact Assessments</span>
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Consent Management</span>
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Retention Policies</span>
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Breach Detection</span>
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Compliance Report
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Database className="mr-2 h-4 w-4" />
                  Backup Database
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Lock className="mr-2 h-4 w-4" />
                  Security Audit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
