import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  GraduationCap, 
  DollarSign, 
  CheckCircle, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Target, 
  Heart, 
  Shield, 
  Award, 
  Plane, 
  Building, 
  Calendar,
  X,
  MessageCircle,
  Globe
} from 'lucide-react';

// Icon component that renders Lucide React icons
function Icon({ name, className = "w-4 h-4", ...props }) {
  const icons = {
    'graduation-cap': GraduationCap,
    'dollar-sign': DollarSign,
    'check-circle': CheckCircle,
    'users': Users,
    'map-pin': MapPin,
    'phone': Phone,
    'mail': Mail,
    'target': Target,
    'heart': Heart,
    'shield': Shield,
    'award': Award,
    'plane': Plane,
    'building': Building,
    'calendar': Calendar,
    'x': X,
    'message-circle': MessageCircle,
    'globe': Globe
  };

  const IconComponent = icons[name];
  if (!IconComponent) return null;

  return <IconComponent className={className} {...props} />;
}

// Function to render an icon into a specific element
function renderIcon(containerId, iconName, className, props = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(Icon, { name: iconName, className, ...props }));
}

// Function to render multiple icons
function renderIcons(iconConfigs) {
  iconConfigs.forEach(config => {
    renderIcon(config.containerId, config.iconName, config.className, config.props);
  });
}

// Export for use in main.js
window.renderIcon = renderIcon;
window.renderIcons = renderIcons;

