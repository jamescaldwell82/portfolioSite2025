import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

// Analytics utility functions
export const trackPageView = (pageName: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};

export const trackContactFormSubmission = () => {
  trackEvent('contact_form_submit', {
    form_type: 'portfolio_contact'
  });
};

export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', {
    project_name: projectName
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  });
};
