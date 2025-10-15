import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import InstallPrompt from "../InstallPrompt";

export default function Splash() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 10000);
    return () => clearTimeout(t);
  }, [isMobile]);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fd0bbd55af2ca41b992bc39029063eb3e%2F3e3b409a071745c98373fa1da8e1e492?format=webp&width=800"
        alt="DriveIQ splash"
        className="w-40 h-40 object-contain animate-pulse"
      />
      <div className="mt-6">
        <InstallPrompt onAccepted={() => {}} />
      </div>
      <div className="absolute bottom-4 inset-x-0 text-center text-xs text-muted-foreground px-4">
        © 2025 DriveIQ Academy. Powered by Oxford Business Group (PTY) LTD. All rights reserved.
      </div>
    </div>
  );
}
