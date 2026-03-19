import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Camera,
  Upload,
  FileText,
  Loader2,
  CheckCircle2,
  X,
  Scan,
  Sparkles,
  Calendar,
  DollarSign,
  Store,
  Tag,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const BillScanner = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scannedData, setScannedData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Mock Google Vision AI extraction
  const mockExtractBillData = () => {
    return {
      merchant: 'Office Supplies Ltd',
      amount: 245.80,
      date: new Date().toISOString().split('T')[0],
      category: 'Office Expenses',
      vatAmount: 49.16,
      vatRate: 20,
      description: 'Office supplies and stationery',
      paymentMethod: 'Credit Card',
      confidence: 0.95,
    };
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File too large', {
          description: 'Please select a file smaller than 10MB',
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
      toast.success('File selected', {
        description: 'Ready to scan',
      });
    }
  };

  const handleScan = async () => {
    if (!selectedFile && !previewUrl) {
      toast.error('No file selected', {
        description: 'Please upload or capture an image first',
      });
      return;
    }

    setScanning(true);
    setScanProgress(0);

    // Simulate AI processing
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearInterval(progressInterval);
    setScanProgress(100);

    // Mock extracted data
    const extractedData = mockExtractBillData();
    setScannedData(extractedData);
    setScanning(false);

    toast.success('Bill scanned successfully!', {
      description: `Extracted data with ${(extractedData.confidence * 100).toFixed(0)}% confidence`,
    });
  };

  const handleSave = () => {
    toast.success('Bill saved successfully!', {
      description: 'Your expense has been recorded',
    });
    setTimeout(() => {
      navigate('/client/dashboard');
    }, 1000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setScannedData(null);
    setScanProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDataChange = (field, value) => {
    setScannedData({
      ...scannedData,
      [field]: value,
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bill Scanner</h1>
          <p className="text-muted-foreground mt-1">Upload or capture a bill to extract data automatically</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload/Camera Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scan className="h-5 w-5" />
                <span>Scan Bill</span>
              </CardTitle>
              <CardDescription>Upload an image or take a photo of your receipt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview Area */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/30">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Bill preview"
                      className="max-h-80 mx-auto rounded-lg shadow-lg"
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Image Ready
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={handleReset}>
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">No image selected</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload a bill or receipt to get started
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={scanning}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    toast.info('Camera feature', {
                      description: 'Camera access would be requested in production',
                    });
                  }}
                  disabled={scanning}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Scan Button */}
              {previewUrl && !scannedData && (
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleScan}
                  disabled={scanning}
                >
                  {scanning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scanning with AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Extract Data with AI
                    </>
                  )}
                </Button>
              )}

              {/* Progress Bar */}
              {scanning && (
                <div className="space-y-2">
                  <Progress value={scanProgress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    Analyzing document... {scanProgress}%
                  </p>
                </div>
              )}

              {/* AI Badge */}
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>Powered by Google Vision AI (Mock)</span>
              </div>
            </CardContent>
          </Card>

          {/* Extracted Data Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Bill Details</span>
              </CardTitle>
              <CardDescription>
                {scannedData
                  ? 'Review and edit the extracted information'
                  : 'Extracted data will appear here'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scannedData ? (
                <div className="space-y-4">
                  {/* Confidence Badge */}
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-secondary" />
                      <span className="text-sm font-medium">AI Confidence Score</span>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">
                      {(scannedData.confidence * 100).toFixed(0)}%
                    </Badge>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="merchant" className="flex items-center space-x-2">
                        <Store className="h-4 w-4" />
                        <span>Merchant Name</span>
                      </Label>
                      <Input
                        id="merchant"
                        value={scannedData.merchant}
                        onChange={(e) => handleDataChange('merchant', e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4" />
                          <span>Amount (€)</span>
                        </Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={scannedData.amount}
                          onChange={(e) => handleDataChange('amount', parseFloat(e.target.value))}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Date</span>
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={scannedData.date}
                          onChange={(e) => handleDataChange('date', e.target.value)}
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="flex items-center space-x-2">
                        <Tag className="h-4 w-4" />
                        <span>Category</span>
                      </Label>
                      <Select
                        value={scannedData.category}
                        onValueChange={(value) => handleDataChange('category', value)}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Office Expenses">Office Expenses</SelectItem>
                          <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                          <SelectItem value="Travel & Transport">Travel & Transport</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Professional Services">Professional Services</SelectItem>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vatAmount">VAT Amount (€)</Label>
                        <Input
                          id="vatAmount"
                          type="number"
                          step="0.01"
                          value={scannedData.vatAmount}
                          onChange={(e) => handleDataChange('vatAmount', parseFloat(e.target.value))}
                          className="bg-background"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vatRate">VAT Rate (%)</Label>
                        <Select
                          value={scannedData.vatRate.toString()}
                          onValueChange={(value) => handleDataChange('vatRate', parseInt(value))}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0% (Exempt)</SelectItem>
                            <SelectItem value="9">9% (Reduced)</SelectItem>
                            <SelectItem value="13.5">13.5% (Second Reduced)</SelectItem>
                            <SelectItem value="20">20% (Standard)</SelectItem>
                            <SelectItem value="23">23% (Standard - Old)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={scannedData.description}
                        onChange={(e) => handleDataChange('description', e.target.value)}
                        placeholder="Add any additional notes..."
                        className="bg-background min-h-[80px]"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleSave}>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Save Bill
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-muted/30 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No data extracted yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload and scan a bill to see extracted data
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="border-2 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-lg">Tips for Better Scanning</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid md:grid-cols-2 gap-3 text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Ensure the entire receipt is visible and in focus</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Use good lighting to avoid shadows</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Keep the receipt flat and straight</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Supported formats: JPG, PNG, PDF (max 10MB)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BillScanner;
