import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Separator } from '../components/ui/separator';
import {
  Shield,
  Download,
  Trash2,
  Eye,
  Lock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Info,
  User,
  Settings,
  Globe,
  Database,
  Bell
} from 'lucide-react';
import { toast } from 'sonner';

const PrivacyCenter = () => {
  const [consents, setConsents] = useState({
    dataProcessing: true,
    marketing: false,
    analytics: true,
    thirdParty: false,
  });

  const [dataCategories] = useState([
    {
      category: 'Personal Information',
      description: 'Name, email, phone number, company details',
      dataPoints: 5,
      lastUpdated: '2024-01-15',
    },
    {
      category: 'Financial Data',
      description: 'Bill scans, expense records, VAT information',
      dataPoints: 142,
      lastUpdated: '2024-01-15',
    },
    {
      category: 'Usage Analytics',
      description: 'Login history, feature usage, system interactions',
      dataPoints: 38,
      lastUpdated: '2024-01-14',
    },
    {
      category: 'Communication Records',
      description: 'Messages with accountant, support tickets',
      dataPoints: 12,
      lastUpdated: '2024-01-10',
    },
  ]);

  const [privacyEvents] = useState([
    {
      type: 'consent_granted',
      action: 'Data Processing Consent Granted',
      date: '2024-01-15 14:30',
      status: 'success',
    },
    {
      type: 'data_access',
      action: 'Personal Data Accessed',
      date: '2024-01-14 10:15',
      status: 'info',
    },
    {
      type: 'settings_updated',
      action: 'Privacy Settings Updated',
      date: '2024-01-12 16:45',
      status: 'success',
    },
  ]);

  const handleConsentChange = (key) => {
    setConsents({
      ...consents,
      [key]: !consents[key],
    });
    toast.success('Consent preferences updated', {
      description: 'Your privacy settings have been saved',
    });
  };

  const handleExportData = () => {
    toast.success('Data export initiated', {
      description: 'You will receive a download link within 24 hours',
    });
  };

  const handleDeleteAccount = () => {
    toast.info('Account deletion requested', {
      description: 'This action requires verification. Check your email.',
    });
  };

  const handleViewData = () => {
    toast.info('Opening data viewer', {
      description: 'Review all your stored personal data',
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary" />
            <span>Privacy Center</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your data, privacy settings, and GDPR rights in compliance with Irish and EU data protection laws
          </p>
        </div>

        {/* GDPR Compliance Banner */}
        <Alert className="bg-secondary/10 border-secondary/20">
          <Shield className="h-4 w-4 text-secondary" />
          <AlertDescription>
            <p className="font-medium text-secondary">Your data is protected</p>
            <p className="text-sm mt-1">
              We are fully compliant with GDPR and Irish Data Protection Commission (DPC) regulations. 
              You have complete control over your personal data.
            </p>
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consents">Consents</TabsTrigger>
            <TabsTrigger value="data">My Data</TabsTrigger>
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span>GDPR Compliance Status</span>
                  </CardTitle>
                  <CardDescription>Your account is fully GDPR compliant</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Processing Consent</span>
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Privacy Policy Acknowledged</span>
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Encryption Enabled</span>
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cross-border Transfer Safeguards</span>
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Data Summary</span>
                  </CardTitle>
                  <CardDescription>Overview of your stored data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Data Categories</span>
                    <span className="font-semibold">4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Data Points</span>
                    <span className="font-semibold">197</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Data Retention Period</span>
                    <span className="font-semibold">7 years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Data Export</span>
                    <span className="font-semibold">Never</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common privacy management tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <Button variant="outline" className="h-auto flex-col items-start space-y-2 p-4" onClick={handleViewData}>
                    <Eye className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">View My Data</p>
                      <p className="text-xs text-muted-foreground">See all stored information</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-start space-y-2 p-4" onClick={handleExportData}>
                    <Download className="h-5 w-5 text-secondary" />
                    <div className="text-left">
                      <p className="font-medium">Export Data</p>
                      <p className="text-xs text-muted-foreground">Download in JSON/CSV</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto flex-col items-start space-y-2 p-4" onClick={handleDeleteAccount}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <div className="text-left">
                      <p className="font-medium">Delete Account</p>
                      <p className="text-xs text-muted-foreground">Permanent removal</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consents Tab */}
          <TabsContent value="consents" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Consent Management</CardTitle>
                <CardDescription>
                  Control how we process your personal data. You can withdraw consent at any time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="dataProcessing" className="text-base font-medium cursor-pointer">
                        Essential Data Processing
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Required for core functionality: account management, bill scanning, expense tracking. Cannot be disabled.
                      </p>
                    </div>
                    <Switch
                      id="dataProcessing"
                      checked={consents.dataProcessing}
                      disabled
                    />
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="marketing" className="text-base font-medium cursor-pointer">
                        Marketing Communications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features, tips, and promotional offers via email.
                      </p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={consents.marketing}
                      onCheckedChange={() => handleConsentChange('marketing')}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="analytics" className="text-base font-medium cursor-pointer">
                        Analytics & Performance
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Help us improve by allowing anonymous usage analytics and performance monitoring.
                      </p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={consents.analytics}
                      onCheckedChange={() => handleConsentChange('analytics')}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="thirdParty" className="text-base font-medium cursor-pointer">
                        Third-Party Data Sharing
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymized data with trusted partners for research and industry insights.
                      </p>
                    </div>
                    <Switch
                      id="thirdParty"
                      checked={consents.thirdParty}
                      onCheckedChange={() => handleConsentChange('thirdParty')}
                    />
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Changes to consent preferences are effective immediately. You can update these settings at any time.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your Personal Data</CardTitle>
                <CardDescription>Categories of data we store and process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataCategories.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.category}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                        <Badge variant="outline">{item.dataPoints} items</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Last updated: {new Date(item.lastUpdated).toLocaleDateString('en-IE')}</span>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Your Rights Tab */}
          <TabsContent value="rights" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Your GDPR Rights</CardTitle>
                <CardDescription>
                  Under GDPR and Irish Data Protection Acts, you have the following rights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Right to Access</span>
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Request a copy of all personal data we hold about you in a structured, commonly used format.
                    </p>
                    <Button size="sm" variant="outline" className="ml-7" onClick={handleExportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Request Data Export
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Right to Rectification</span>
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Correct any inaccurate or incomplete personal data we hold about you.
                    </p>
                    <Button size="sm" variant="outline" className="ml-7">
                      <Settings className="mr-2 h-4 w-4" />
                      Update Information
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Right to Erasure (Right to be Forgotten)</span>
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Request deletion of your personal data. We will comply within 30 days unless legally required to retain it.
                    </p>
                    <Button size="sm" variant="outline" className="ml-7 text-destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Request Account Deletion
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Right to Data Portability</span>
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Receive your data in a machine-readable format to transfer to another service provider.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span>Right to Object</span>
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Object to processing of your data for direct marketing or legitimate interests.
                    </p>
                  </div>

                  <Alert className="mt-6">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      To exercise any of these rights or if you have concerns about how we handle your data, 
                      contact our Data Protection Officer at dpo@finntaxpro.ie or the Irish Data Protection Commission at info@dataprotection.ie
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Privacy Activity Log</CardTitle>
                <CardDescription>Recent privacy-related actions on your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {privacyEvents.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        {event.status === 'success' ? (
                          <CheckCircle2 className="h-5 w-5 text-secondary" />
                        ) : (
                          <Info className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{event.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                      </div>
                      <Badge
                        className={
                          event.status === 'success'
                            ? 'bg-secondary/10 text-secondary border-secondary/20'
                            : 'bg-primary/10 text-primary border-primary/20'
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact DPO */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Contact Data Protection Officer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you have questions about your privacy, data protection, or wish to file a complaint, our DPO is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">
                <Globe className="mr-2 h-4 w-4" />
                dpo@finntaxpro.ie
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Privacy Policy
              </Button>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Report to Irish DPC
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PrivacyCenter;
