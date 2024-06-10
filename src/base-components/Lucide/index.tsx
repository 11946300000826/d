import * as lucideIcons from "lucide-react";
import { twMerge } from "tailwind-merge";

export const { icons } = lucideIcons;

interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: keyof typeof icons;
  title?: string;
  size?: number; // Add size prop
  color?: string; // Add color prop
}

function Lucide(props: LucideProps) {
  const { icon, className, size, color, ...computedProps } = props; // Remove default size
  const Component = icons[props.icon];
  const sizeClasses = size ? `w-${size} h-${size}` : '';

  return (
      <Component
          {...computedProps}
          className={twMerge([sizeClasses, className])}
          style={{ color }}
      />
  );
}

export default Lucide;