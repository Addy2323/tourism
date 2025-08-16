import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminTest: React.FC = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCredentials, setShowCredentials] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const testAccounts = [
    { email: 'admin@babblerstours.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
    { email: 'superadmin@babblerstours.com', password: 'super123', name: 'Super Admin', role: 'admin' as const },
    { email: 'user@babblerstours.com', password: 'user123', name: 'John Doe', role: 'user' as const },
    { email: 'sarah@example.com', password: 'sarah123', name: 'Sarah Johnson', role: 'user' as const }
  ];

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugLog(prev => [`${timestamp}: ${message}`, ...prev.slice(0, 4)]);
  };

  useEffect(() => {
    addLog(`Route changed to: ${location.pathname}`);
  }, [location.pathname]);

  const quickLogin = (account: typeof testAccounts[0]) => {
    addLog(`Logging in as ${account.role}: ${account.email}`);
    login({
      name: account.name,
      email: account.email,
      role: account.role
    });
  };

  const testAdminRoute = () => {
    addLog(`Attempting to navigate to /admin`);
    addLog(`Current auth: ${isAuthenticated ? 'Yes' : 'No'}, Role: ${user?.role || 'None'}`);
    navigate('/admin');
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border z-50 max-w-sm">
      <h3 className="font-bold text-sm mb-3">Admin Test Panel</h3>
      
      <div className="space-y-2 text-xs">
        <div className="bg-gray-100 p-2 rounded">
          <strong>Status:</strong> {isAuthenticated ? 'Logged In' : 'Not Logged In'}<br/>
          <strong>User:</strong> {user?.name || 'None'}<br/>
          <strong>Role:</strong> {user?.role || 'None'}<br/>
          <strong>Email:</strong> {user?.email || 'None'}<br/>
          <strong>Current Route:</strong> {location.pathname}
        </div>

        {debugLog.length > 0 && (
          <div className="bg-yellow-50 p-2 rounded text-xs">
            <strong>Debug Log:</strong>
            {debugLog.map((log, index) => (
              <div key={index} className="text-yellow-800">{log}</div>
            ))}
          </div>
        )}
        
        <button 
          onClick={() => setShowCredentials(!showCredentials)}
          className="w-full bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
        >
          {showCredentials ? 'Hide' : 'Show'} Test Credentials
        </button>

        {showCredentials && (
          <div className="bg-blue-50 p-2 rounded text-xs space-y-1">
            <div className="font-semibold text-blue-800">Available Accounts:</div>
            {testAccounts.map((account, index) => (
              <div key={index} className="border-b border-blue-200 pb-1 mb-1 last:border-b-0">
                <div className="font-medium text-blue-700">{account.name} ({account.role})</div>
                <div className="text-blue-600">{account.email}</div>
                <div className="text-blue-600">Password: {account.password}</div>
                <button 
                  onClick={() => quickLogin(account)}
                  className="mt-1 bg-blue-500 text-white px-2 py-0.5 rounded text-xs hover:bg-blue-600"
                >
                  Quick Login
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="space-y-1">
          <button 
            onClick={logout}
            className="w-full bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
          >
            Logout
          </button>
          
          <button 
            onClick={testAdminRoute}
            className="w-full bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600"
          >
            Test /admin Route
          </button>

          <button 
            onClick={() => setDebugLog([])}
            className="w-full bg-gray-400 text-white px-2 py-1 rounded text-xs hover:bg-gray-500"
          >
            Clear Log
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTest;
