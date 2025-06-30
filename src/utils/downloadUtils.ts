/**
 * Download utility functions with ReForm branding
 */

export const downloadFile = (content: string, filename: string, title: string, mimeType: string = 'text/plain') => {
  // Create ReForm branded header
  const header = `
================================================================================
                                   ReForm
                        Reimagining Urban Mining
================================================================================

Report Title: ${title}
Generated on: ${new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  })}
Platform: ReForm Waste Management Platform
Website: https://reform.dev
Support: support@reform.dev

================================================================================

`;

  // Create ReForm branded footer
  const footer = `

================================================================================
                              End of Report
================================================================================

About ReForm:
ReForm is India's leading waste-to-resource platform, transforming e-waste 
crisis into sustainable, profitable opportunities through technology-driven 
solutions and innovative circular economy practices.

Our Mission:
To create a sustainable future by reimagining urban mining and empowering 
communities through comprehensive waste management solutions.

Contact Information:
- Email: info@reform.dev
- Phone: +91 (555) 123-4567
- Address: Mumbai, India

Follow us:
- Website: https://reform.dev
- LinkedIn: linkedin.com/company/reform-platform
- Twitter: @ReFormPlatform

© ${new Date().getFullYear()} ReForm. All rights reserved.
Confidential and proprietary information of ReForm Platform.

================================================================================
`;

  // Combine header, content, and footer
  const fullContent = header + content + footer;

  // Create blob and download
  const blob = new Blob([fullContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  
  // Create temporary link and trigger download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 100);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};