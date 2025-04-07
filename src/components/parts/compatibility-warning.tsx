import React from 'react';

type CompatibilityIssue = {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  components: string[];
};

type CompatibilityWarningProps = {
  issues: CompatibilityIssue[];
};

export default function CompatibilityWarning({ issues }: CompatibilityWarningProps) {
  if (issues.length === 0) {
    return null;
  }

  const getBgColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-400';
      case 'warning':
        return 'bg-yellow-50 border-yellow-400';
      case 'info':
        return 'bg-blue-50 border-blue-400';
      default:
        return 'bg-gray-50 border-gray-400';
    }
  };

  const getTextColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-700';
      case 'warning':
        return 'text-yellow-700';
      case 'info':
        return 'text-blue-700';
      default:
        return 'text-gray-700';
    }
  };

  const getIconColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">互換性の問題</h3>
      
      {issues.map((issue, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border-l-4 ${getBgColor(issue.severity)}`}
        >
          <div className="flex">
            <div className={`flex-shrink-0 ${getIconColor(issue.severity)}`}>
              {issue.severity === 'critical' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
              {issue.severity === 'warning' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {issue.severity === 'info' && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <h4 className={`text-sm font-medium ${getTextColor(issue.severity)}`}>
                {issue.type}
              </h4>
              <div className="mt-1 text-sm text-gray-700">
                {issue.message}
              </div>
              {issue.components.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-gray-500">関連パーツ: </span>
                  <span className="text-xs font-medium text-gray-700">
                    {issue.components.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
