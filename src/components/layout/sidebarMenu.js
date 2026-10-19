import {
  LayoutGrid,
  MousePointerClick,
  FormInput,
  Bell,
  Monitor,
  Combine,
  CreditCard,
  PanelsTopLeft,
  CalendarDays,
} from "lucide-react";

export const menuItems = [
  { icon: LayoutGrid, label: "Home", path: "/" },
  { icon: MousePointerClick, label: "Buttons", path: "/buttons" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
  { icon: FormInput, label: "Forms", path: "/forms" },
  { icon: CalendarDays, label: "Date & Time", path: "/date-time" },
  { icon: Combine, label: "Form Compositions", path: "/form-compositions" },
  { icon: PanelsTopLeft, label: "Layout Module", path: "/layouts" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Monitor, label: "Data Display", path: "/data-display" },
];
