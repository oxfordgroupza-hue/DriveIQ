import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import InstallPrompt from "../InstallPrompt";

export default function Splash() {
  const isMobile = useIsMobile();
  const [visible, setVisible] = React.useState(false);
  const [showInstall, setShowInstall] = React.useState(false);

  React.useEffect(() => {
    if (!isMobile) return;
    setVisible(true);
    // Show install button after 3 seconds of pulsing
    const showInstallTimer = setTimeout(() => setShowInstall(true), 3000);
    // Hide splash after 10 seconds
    const hideTimer = setTimeout(() => setVisible(false), 10000);
    return () => {
      clearTimeout(showInstallTimer);
      clearTimeout(hideTimer);
    };
  }, [isMobile]);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background pb-12">
      <style>{`
        @keyframes pulse-splash {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .splash-pulse {
          animation: pulse-splash 1.5s ease-in-out 6;
        }
      `}</style>
      
      <div className="flex flex-col items-center gap-6">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fd0bbd55af2ca41b992bc39029063eb3e%2F3e3b409a071745c98373fa1da8e1e492?format=webp&width=800"
          alt="DriveIQ splash"
          className="w-48 h-48 object-contain splash-pulse"
        />
        
        {showInstall && (
          <div className="animate-in fade-in duration-500">
            <InstallPrompt />
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 py-4 text-center text-xs text-muted-foreground">
        © 2025 DriveIQ Academy. Powered by Oxford Business Group (PTY) LTD. All rights reserved.
      </div>
    </div>
  );
}
