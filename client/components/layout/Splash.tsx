import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Splash() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, [isMobile]);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fd0bbd55af2ca41b992bc39029063eb3e%2F3e3b409a071745c98373fa1da8e1e492?format=webp&width=800"
        alt="DriveIQ splash"
        className="w-40 h-40 object-contain animate-in fade-in duration-300"
      />
    </div>
  );
}
