import { View, type ViewProps } from "react-native";
import { cn } from "@/utils/cn";

interface CardProps extends ViewProps {
  bordered?: boolean;
  padded?: boolean;
  className?: string;
}

export function Card({
  bordered = true,
  padded = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <View
      className={cn(
        "rounded-card bg-bg-card",
        bordered && "border border-border",
        padded && "p-5",
        className,
      )}
      {...rest}
    >
      {children}
    </View>
  );
}
