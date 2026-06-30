"use client";

interface PremiumSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse" | "orbit";
  showText?: boolean;
  text?: string;
}

const PremiumSpinner = ({
  size = "md",
  variant = "default",
  showText = true,
  text = "Loading...",
}: PremiumSpinnerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  if (variant === "dots") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-primary"
              style={{
                animation: `premium-bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
              }}
            />
          ))}
        </div>
        {showText && (
          <p className={`font-medium text-primary ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
        <style jsx>{`
          @keyframes premium-bounce {
            0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className={`relative ${sizeClasses[size]}`}>
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-full bg-primary/40 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-primary" />
        </div>
        {showText && (
          <p className={`font-medium text-primary ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "orbit") {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className={`relative ${sizeClasses[size]}`}>
          <div className="absolute inset-0 rounded-full border-2 border-defaultBorder" />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                animation: `premium-orbit 1.5s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-primary" />
            </div>
          ))}
        </div>
        {showText && (
          <p className={`font-medium text-primary ${textSizeClasses[size]}`}>
            {text}
          </p>
        )}
        <style jsx>{`
          @keyframes premium-orbit {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Default variant - modern gradient spinner
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-defaultBorder" />
        
        {/* Animated gradient ring */}
        <div
          className="absolute inset-0 rounded-full border-[3px] border-transparent"
          style={{
            borderTopColor: "hsl(var(--primary))",
            borderRightColor: "hsl(var(--primary) / 0.6)",
            animation: "premium-spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />
        
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-linear-to-br from-primary/20 to-transparent animate-pulse" />
      </div>
      
      {showText && (
        <p className={`font-medium text-primary ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}

      <style jsx>{`
        @keyframes premium-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PremiumSpinner;

// Made with Bob
