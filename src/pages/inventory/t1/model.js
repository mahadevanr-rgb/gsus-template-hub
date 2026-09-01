import {
  LayoutDashboard, Package, Tag, Truck, ClipboardList,
  BarChart2, Settings, AlertTriangle, ShoppingCart, DollarSign,
} from "lucide-react";

export const NAV = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Package, label: "Products", badge: "12" },
  { icon: Tag, label: "Categories" },
  { icon: Truck, label: "Suppliers" },
  { icon: ClipboardList, label: "Orders", badge: "3" },
  { icon: BarChart2, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export const KPI = [
  { label: "Total Products", value: "2,847", change: "+12%", up: true, Icon: Package, color: "#6366f1", bg: "#eff6ff" },
  { label: "Low Stock", value: "34", change: "-5%", up: false, Icon: AlertTriangle, color: "#ef4444", bg: "#fef2f2" },
  { label: "Total Orders", value: "1,293", change: "+8%", up: true, Icon: ShoppingCart, color: "#22c55e", bg: "#f0fdf4" },
  { label: "Revenue", value: "$84.2K", change: "+18%", up: true, Icon: DollarSign, color: "#f59e0b", bg: "#fffbeb" },
];

export const LIST_DATA = {
  Products: {
    cols: ["Name", "SKU", "Category", "Stock", "Price", "Status"],
    rows: [
      ['MacBook Pro 14"', "MBP-001", "Electronics", "24", "$1,999", "In Stock"],
      ["iPhone 15 Pro", "IPH-015", "Electronics", "8", "$999", "Low Stock"],
      ["AirPods Pro", "APP-002", "Audio", "0", "$249", "Out of Stock"],
      ["iPad Air M2", "IPA-003", "Tablets", "45", "$599", "In Stock"],
      ["Apple Watch S9", "AWS-009", "Wearables", "12", "$399", "Low Stock"],
    ],
  },
  Categories: {
    cols: ["Category", "Total Items", "Active", "Last Updated"],
    rows: [
      ["Electronics", "1,240", "Yes", "2h ago"],
      ["Audio", "320", "Yes", "5h ago"],
      ["Tablets", "180", "Yes", "1d ago"],
      ["Wearables", "95", "No", "3d ago"],
    ],
  },
  Suppliers: {
    cols: ["Supplier", "Contact", "Country", "Items", "Status"],
    rows: [
      ["Apple Inc.", "supplier@apple.com", "USA", "840", "Active"],
      ["Samsung", "contact@samsung.com", "Korea", "620", "Active"],
      ["Sony", "info@sony.com", "Japan", "310", "Active"],
      ["Logitech", "sales@logitech.com", "Switzerland", "190", "Inactive"],
    ],
  },
  Orders: {
    cols: ["Order ID", "Customer", "Items", "Total", "Date", "Status"],
    rows: [
      ["#ORD-001", "John Smith", "3", "$2,997", "Dec 20", "Pending"],
      ["#ORD-002", "Sarah Lee", "1", "$999", "Dec 19", "Shipped"],
      ["#ORD-003", "Mike Brown", "5", "$4,495", "Dec 18", "Delivered"],
      ["#ORD-004", "Emma Davis", "2", "$1,598", "Dec 17", "Pending"],
    ],
  },
  Reports: {
    cols: ["Report", "Period", "Generated", "Size", "Status"],
    rows: [
      ["Monthly Sales", "Dec 2024", "Dec 1", "2.4 MB", "Ready"],
      ["Stock Audit", "Nov 2024", "Nov 30", "1.8 MB", "Ready"],
      ["Supplier Report", "Q4 2024", "Dec 15", "3.1 MB", "Processing"],
    ],
  },
  Settings: {
    cols: ["Setting", "Value", "Category", "Last Changed"],
    rows: [
      ["Currency", "USD", "General", "Jan 2024"],
      ["Timezone", "UTC+0", "General", "Jan 2024"],
      ["Low Stock Alert", "10 units", "Notifications", "Dec 2024"],
      ["Auto Reorder", "Enabled", "Automation", "Nov 2024"],
    ],
  },
};

export const STATUS_STYLE = {
  "In Stock": { bg: "#f0fdf4", color: "#16a34a" },
  "Low Stock": { bg: "#fffbeb", color: "#d97706" },
  "Out of Stock": { bg: "#fef2f2", color: "#dc2626" },
  Active: { bg: "#f0fdf4", color: "#16a34a" },
  Inactive: { bg: "#fef2f2", color: "#dc2626" },
  Pending: { bg: "#fffbeb", color: "#d97706" },
  Shipped: { bg: "#eff6ff", color: "#2563eb" },
  Delivered: { bg: "#f0fdf4", color: "#16a34a" },
  Ready: { bg: "#f0fdf4", color: "#16a34a" },
  Processing: { bg: "#fffbeb", color: "#d97706" },
};
