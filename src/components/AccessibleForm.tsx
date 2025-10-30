import React from "react";
import { useA11y } from "../a11y/accessibilityStore";

type Props = { children: React.ReactNode; className?: string };

export default function AccessibleForm({ children, className = "" }: Readonly<Props>) {
  const a = useA11y();

  const style: React.CSSProperties = {
    fontSize: `${a.textScale}rem`,
    lineHeight: String(a.lineHeight),
    letterSpacing: `${a.letterSpacing}em`,
  };

  const classes = [className];
  if (a.highContrast) classes.push("contrast-more");
  if (a.darkMode) classes.push("bg-gray-900 text-white");
  if (a.largeTargets) classes.push("touch-target-large");

  return (
    <div style={style} className={classes.join(" ")}>
      {children}
    </div>
  );
}
