import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  Calculator,
  LayoutDashboard,
  Scan,
  FileText,
  Users,
  Settings,
  Shield,
  LogOut,
  Menu,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  Lock,
  UserCog
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '#' },
      { icon: <Shield className="h-5 w-5" />, label: 'Privacy Center', href: '/privacy' },
    ];

    switch (user?.role) {
      case 'client':
        return [
          { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: '/client/dashboard' },
          { icon: <Scan className="h-5 w-5" />, label: 'Scan Bills', href: '/client/scan' },
          { icon: <FileText className="h-5 w-5" />, label: 'My Expenses', href: '#' },
          { icon: <BarChart3 className="h-5 w-5" />, label: 'Reports', href: '#' },
          ...commonItems,
        ];
      case 'accountant':
        return [
          { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: '/accountant/dashboard' },
          { icon: <Users className="h-5 w-5" />, label: 'Clients', href: '#' },
          { icon: <FileText className="h-5 w-5" />, label: 'Bills Review', href: '#' },
          { icon: <Calculator className="h-5 w-5" />, label: 'Tax Compliance', href: '#' },
          { icon: <BarChart3 className="h-5 w-5" />, label: 'Analytics', href: '#' },
          ...commonItems,
        ];
      case 'super_admin':
        return [
          { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: '/admin/dashboard' },
          { icon: <Users className="h-5 w-5" />, label: 'User Management', href: '#' },
          { icon: <Lock className="h-5 w-5" />, label: 'GDPR Compliance', href: '#' },
          { icon: <BarChart3 className="h-5 w-5" />, label: 'System Analytics', href: '#' },
          { icon: <UserCog className="h-5 w-5" />, label: 'System Config', href: '#' },
          ...commonItems,
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  const getRoleBadge = () => {
    const roleConfig = {
      client: { label: 'Client', className: 'bg-primary/10 text-primary border-primary/20' },
      accountant: { label: 'Accountant', className: 'bg-secondary/10 text-secondary border-secondary/20' },
      super_admin: { label: 'Admin', className: 'bg-accent/10 text-accent border-accent/20' },
    };
    const config = roleConfig[user?.role] || roleConfig.client;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'U';
  };

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">FinnTax Pro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item, index) => {
          const isActive = isActiveRoute(item.href);
          return (
            <Link
              key={index}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col border-r bg-card">
        <NavigationContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <NavigationContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search */}
            <div className="flex-1 flex items-center max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 bg-background"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">{user?.name}</p>
                      {getRoleBadge()}
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/privacy" className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy Center
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
