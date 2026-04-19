import { Pressable, Text, View, type PressableProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "brew" | "cancel";

interface ButtonProps extends Omit<PressableProps, "children" | "style"> {
  variant?: ButtonVariant;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const HEIGHT: Record<ButtonVariant, number> = {
  primary: 52,
  secondary: 48,
  ghost: 44,
  brew: 56,
  cancel: 48,
};

const TEXT_COLOR: Record<ButtonVariant, string> = {
  primary: "text-bg-primary",
  secondary: "text-gold",
  ghost: "text-gold",
  brew: "text-bg-primary",
  cancel: "text-text-secondary",
};

export function Button({
  variant = "primary",
  label,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const isGradient = variant === "primary" || variant === "brew";
  const height = HEIGHT[variant];
  const textCls = TEXT_COLOR[variant];

  const inner = (
    <View
      className={cn(
        "flex-row items-center justify-center gap-2",
        fullWidth && "w-full",
      )}
      style={{ height }}
    >
      {leftIcon}
      <Text
        className={cn(
          "font-body-semibold text-[15px]",
          textCls,
          disabled && "opacity-40",
        )}
      >
        {label}
      </Text>
      {rightIcon}
    </View>
  );

  if (isGradient) {
    return (
      <Pressable
        disabled={disabled}
        className={cn(
          "rounded-lg overflow-hidden",
          fullWidth && "w-full",
          disabled && "opacity-50",
          className,
        )}
        {...rest}
      >
        <LinearGradient
          colors={["#C9A962", "#8B7845"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ height }}
        >
          {inner}
        </LinearGradient>
      </Pressable>
    );
  }

  const borderCls =
    variant === "secondary"
      ? "border border-gold"
      : variant === "cancel"
        ? "border border-border"
        : "";

  return (
    <Pressable
      disabled={disabled}
      className={cn(
        "rounded-lg",
        borderCls,
        fullWidth && "w-full",
        disabled && "opacity-50",
        className,
      )}
      {...rest}
    >
      {inner}
    </Pressable>
  );
}
