import React from "react";
import Drawer from "../Drawer/Drawer";

export default function SideSheet({
  open = false,
  onClose,
  side = "right", // 'right' | 'left'
  width = "md", // 'sm' | 'md' | 'lg' | 'xl'
  title,
  description,
  icon,
  badge,
  children,
  footer,
  showClose = true,
  className = "",
}) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      side={side}
      size={width}
      title={title}
      description={description}
      icon={icon}
      badge={badge}
      footer={footer}
      showClose={showClose}
      className={className}
    >
      {children}
    </Drawer>
  );
}
