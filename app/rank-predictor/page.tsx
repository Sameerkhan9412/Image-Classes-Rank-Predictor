"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

type Step = "form" | "otp" | "result";
type FormStep = 1 | 2 | 3;

type FormType = {
  name: string;
  email: string;
  mobile: string;
  exam: string;
  className: string;
  stream: string;
  marks: string;
  gender: string;
  category: string;
  quota: string;
  rollNo: string;
  isImageStudent: boolean;
  isPublicConsent: boolean;
};

type ResultType = {
  predictedRankRange: {
    min: number;
    max: number;
  };
  predictedRankAvg: number;
};

// Animated Counter Component
const AnimatedCounter = ({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count}</span>;
};

// Circular Progress Component
const CircularProgress = ({
  percentage,
  size = 180,
  forExport = false,
}: {
  percentage: number;
  size?: number;
  forExport?: boolean;
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(
    forExport ? percentage : 0,
  );
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    if (!forExport) {
      const timer = setTimeout(() => setAnimatedPercentage(percentage), 100);
      return () => clearTimeout(timer);
    }
  }, [percentage, forExport]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={forExport ? "" : "transition-all duration-1000 ease-out"}
        />
        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl font-black text-white">
            {forExport ? percentage : <AnimatedCounter value={percentage} />}%
          </span>
          <p className="text-xs text-gray-400 mt-1">Selection Chance</p>
        </div>
      </div>
    </div>
  );
};

// Confetti Component
const Confetti = () => {
  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#ec4899",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-20px",
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-3 h-3"
            style={{
              backgroundColor:
                colors[Math.floor(Math.random() * colors.length)],
              transform: `rotate(${Math.random() * 360}deg)`,
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Floating Particles Background
const ParticleBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[150px] animate-pulse" />
    <div
      className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[150px] animate-pulse"
      style={{ animationDelay: "1s" }}
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px]" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${10 + Math.random() * 10}s`,
        }}
      />
    ))}
  </div>
);

// Share Modal Component
const ShareModal = ({
  isOpen,
  onClose,
  result,
  form,
  selectionChance,
}: {
  isOpen: boolean;
  onClose: () => void;
  result: ResultType;
  form: FormType;
  selectionChance: number;
}) => {
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/rank-predictor"
      : "";
  const shareTitle = `🎯 I got Rank #${result.predictedRankAvg} in ${form.exam} Class ${form.className} Result Predictor!`;
  const shareText = `My predicted rank for ${form.exam} Class ${form.className}${form.stream ? ` ${form.stream}` : ""} is #${result.predictedRankAvg} with ${selectionChance}% selection chance! Check your rank too!`;

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: "📱",
      color: "from-green-500 to-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${shareUrl}`)}`,
    },
    {
      name: "Twitter",
      icon: "🐦",
      color: "from-blue-400 to-blue-500",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      icon: "📘",
      color: "from-blue-600 to-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
    },
    {
      name: "Telegram",
      icon: "✈️",
      color: "from-sky-400 to-sky-500",
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${shareTitle}\n\n${shareText}`)}`,
    },
    {
      name: "LinkedIn",
      icon: "💼",
      color: "from-blue-700 to-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Email",
      icon: "✉️",
      color: "from-gray-600 to-gray-700",
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${shareTitle}\n\n${shareText}\n\n${shareUrl}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess("Shared successfully!");
        setTimeout(() => setShareSuccess(null), 2000);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    }
  };

  const handleSocialShare = (url: string, platform: string) => {
    window.open(url, "_blank", "width=600,height=400,noopener,noreferrer");
    setShareSuccess(`Opening ${platform}...`);
    setTimeout(() => setShareSuccess(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#111] border border-white/10 rounded-3xl max-w-md w-full p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📤</span> Share Your Result
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Preview Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 mb-6">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Your Predicted Rank</p>
            <p className="text-4xl font-black text-red-500 my-2">
              #{result.predictedRankAvg}
            </p>
            <p className="text-gray-400 text-sm">
              {form.exam} Class {form.className}{" "}
              {form.stream && `• ${form.stream}`}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm">
              <span className="text-green-400">{selectionChance}%</span>
              <span className="text-gray-400">Selection Chance</span>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {shareSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm text-center animate-fadeIn">
            ✓ {shareSuccess}
          </div>
        )}

        {/* Native Share (Mobile) */}
        {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
          <button
            onClick={handleNativeShare}
            className="w-full py-3 mb-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold flex items-center justify-center gap-2 hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            <span>📲</span> Share via Device
          </button>
        )}

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {shareLinks.map((social) => (
            <button
              key={social.name}
              onClick={() => handleSocialShare(social.url, social.name)}
              className={`p-3 rounded-xl bg-gradient-to-r ${social.color} hover:scale-105 active:scale-95 transition-all flex flex-col items-center gap-1`}
            >
              <span className="text-2xl">{social.icon}</span>
              <span className="text-xs font-medium">{social.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link */}
        <div className="relative">
          <input
            type="text"
            value={`${shareTitle.slice(0, 40)}...`}
            readOnly
            className="w-full px-4 py-3 pr-24 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400"
          />
          <button
            onClick={handleCopyLink}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              copied
                ? "bg-green-500 text-white"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        {/* Share Stats */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span>🔗 Easy sharing</span>
          <span>📱 Mobile friendly</span>
          <span>🌐 All platforms</span>
        </div>
      </div>
    </div>
  );
};

// Download Modal Component
const DownloadModal = ({
  isOpen,
  onClose,
  result,
  form,
  selectionChance,
  resultRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  result: ResultType;
  form: FormType;
  selectionChance: number;
  resultRef: React.RefObject<HTMLDivElement>;
}) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateResultImage = useCallback(async (): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    // Canvas dimensions
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(0.5, "#111111");
    gradient.addColorStop(1, "#0a0a0a");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle pattern
    ctx.strokeStyle = "rgba(255,255,255,0.02)";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // ===== LOGO WATERMARK (BACKGROUND) =====
    try {
      const logo = new (window.Image)();
      logo.src = "/logo.png";

      await new Promise((resolve, reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
      });

      const logoWidth = 350;
      const logoHeight = 180;

      const x = (width - logoWidth) / 2;
      const y = (height - logoHeight) / 2;

      ctx.save();

      // 🔥 opacity control (IMPORTANT)
      ctx.globalAlpha = 0.06;

      // optional blur for premium feel
      ctx.filter = "blur(1px)";

      ctx.drawImage(logo, x, y, logoWidth, logoHeight);

      ctx.restore();
    } catch (err) {
      console.log("Logo load failed");
    }

    // Decorative circles
    const circleGradient1 = ctx.createRadialGradient(
      200,
      200,
      0,
      200,
      200,
      300,
    );
    circleGradient1.addColorStop(0, "rgba(239, 68, 68, 0.15)");
    circleGradient1.addColorStop(1, "transparent");
    ctx.fillStyle = circleGradient1;
    ctx.fillRect(0, 0, 500, 500);

    const circleGradient2 = ctx.createRadialGradient(
      600,
      800,
      0,
      600,
      800,
      300,
    );
    circleGradient2.addColorStop(0, "rgba(249, 115, 22, 0.15)");
    circleGradient2.addColorStop(1, "transparent");
    ctx.fillStyle = circleGradient2;
    ctx.fillRect(300, 500, 500, 500);

    // Header badge
    ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
    ctx.beginPath();
    ctx.roundRect(width / 2 - 120, 40, 240, 36, 18);
    ctx.fill();
    ctx.strokeStyle = "rgba(239, 68, 68, 0.3)";
    ctx.stroke();

    ctx.fillStyle = "#fca5a5";
    ctx.font = "bold 14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("🎯 AI-Powered Rank Prediction", width / 2, 64);

    // Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px system-ui";
    ctx.fillText("Entrance Predictor", width / 2, 130);

    // Subtitle
    ctx.fillStyle = "#9ca3af";
    ctx.font = "18px system-ui";
    ctx.fillText("Image Classes • AMU & JMI Preparation", width / 2, 165);

    // Main rank card
    const cardGradient = ctx.createLinearGradient(100, 200, 700, 500);
    cardGradient.addColorStop(0, "rgba(239, 68, 68, 0.1)");
    cardGradient.addColorStop(1, "rgba(249, 115, 22, 0.1)");
    ctx.fillStyle = cardGradient;
    ctx.beginPath();
    ctx.roundRect(100, 200, 600, 280, 24);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();

    // "Your Predicted Rank" label
    ctx.fillStyle = "#9ca3af";
    ctx.font = "18px system-ui";
    ctx.fillText("Your Predicted Rank", width / 2, 260);

    // Main rank number with gradient effect
    const rankGradient = ctx.createLinearGradient(200, 280, 600, 380);
    rankGradient.addColorStop(0, "#ef4444");
    rankGradient.addColorStop(0.5, "#f97316");
    rankGradient.addColorStop(1, "#eab308");
    ctx.fillStyle = rankGradient;
    ctx.font = "bold 100px system-ui";
    ctx.fillText(`#${result.predictedRankAvg}`, width / 2, 370);

    // Range badge
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.roundRect(width / 2 - 120, 400, 240, 40, 20);
    ctx.fill();

    ctx.fillStyle = "#9ca3af";
    ctx.font = "14px system-ui";
    ctx.fillText("Expected Range:", width / 2 - 50, 425);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 14px system-ui";
    ctx.fillText(
      `${result.predictedRankRange.min} - ${result.predictedRankRange.max}`,
      width / 2 + 70,
      425,
    );

    // Selection chance circle
    const centerX = width / 2;
    const centerY = 580;
    const radius = 70;

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress circle
    const progressAngle = (selectionChance / 100) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, progressAngle);
    const progressGradient = ctx.createLinearGradient(
      centerX - radius,
      centerY,
      centerX + radius,
      centerY,
    );
    progressGradient.addColorStop(0, "#ef4444");
    progressGradient.addColorStop(0.5, "#f97316");
    progressGradient.addColorStop(1, "#22c55e");
    ctx.strokeStyle = progressGradient;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // Percentage text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px system-ui";
    ctx.fillText(`${selectionChance}%`, centerX, centerY + 8);
    ctx.fillStyle = "#9ca3af";
    ctx.font = "12px system-ui";
    ctx.fillText("Selection Chance", centerX, centerY + 30);

    // Student details card
    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    ctx.beginPath();
    ctx.roundRect(100, 680, 600, 120, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();

    ctx.fillStyle = "#9ca3af";
    ctx.font = "14px system-ui";
    ctx.textAlign = "left";
    ctx.fillText("Student Details", 130, 715);

    // Details grid
    const details = [
      { icon: "👤", label: "Name", value: form.name },
      {
        icon: "🎓",
        label: "Class",
        value: `${form.className}${form.stream ? ` ${form.stream}` : ""}`,
      },
      { icon: "📊", label: "Marks", value: `${form.marks}%` },
      { icon: "🏷️", label: "Category", value: form.category },
    ];

    details.forEach((detail, i) => {
      const x = 130 + (i % 2) * 300;
      const y = 745 + Math.floor(i / 2) * 30;
      ctx.fillStyle = "#9ca3af";
      ctx.font = "13px system-ui";
      ctx.fillText(`${detail.icon} ${detail.label}:`, x, y);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px system-ui";
      ctx.fillText(detail.value, x + 100, y);
    });

    // Message based on rank
    let messageText = "";
    let messageColor = "";
    let messageEmoji = "";

    if (result.predictedRankAvg <= 100) {
      messageText = "Outstanding! You have an excellent chance of selection!";
      messageColor = "#4ade80";
      messageEmoji = "🎉";
    } else if (result.predictedRankAvg <= 300) {
      messageText = "Good position! Keep working hard to improve!";
      messageColor = "#facc15";
      messageEmoji = "👍";
    } else {
      messageText = "Keep pushing! Success comes with persistence!";
      messageColor = "#f87171";
      messageEmoji = "💪";
    }

    ctx.fillStyle = messageColor + "20";
    ctx.beginPath();
    ctx.roundRect(100, 820, 600, 50, 12);
    ctx.fill();

    ctx.fillStyle = messageColor;
    ctx.font = "bold 14px system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`${messageEmoji} ${messageText}`, width / 2, 850);

    // Footer
    ctx.fillStyle = "#4b5563";
    ctx.font = "12px system-ui";
    ctx.fillText("Generated by Image Classes Entrance Result Predictor", width / 2, 920);
    ctx.fillText(
      `${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`,
      width / 2,
      940,
    );

    // Watermark
    // ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    // ctx.font = "bold 120px system-ui";
    // ctx.fillText("IMAGE", width / 2, height / 2);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), "image/png", 1.0);
    });
  }, [result, form, selectionChance]);

  const handleDownloadImage = async () => {
    setDownloading("image");
    try {
      const blob = await generateResultImage();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Rank-Prediction-${form.name.replace(/\s+/g, "-")}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess("Image downloaded successfully!");
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading("pdf");
    try {
      // Dynamic import for jsPDF
      const { jsPDF } = await import("jspdf");
      const blob = await generateResultImage();
      const imageUrl = URL.createObjectURL(blob);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const img = new (window.Image)();
      img.src = imageUrl;

      await new Promise<void>((resolve) => {
        img.onload = () => {
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (img.height * imgWidth) / img.width;
          const pageHeight = 297; // A4 height in mm
          const yPos = (pageHeight - imgHeight) / 2;

          pdf.addImage(img as string | HTMLImageElement, "PNG", 0, yPos > 0 ? yPos : 0, imgWidth, imgHeight);
          pdf.save(
            `Rank-Prediction-${form.name.replace(/\s+/g, "-")}-${Date.now()}.pdf`,
          );
          URL.revokeObjectURL(imageUrl);
          resolve();
        };
      });

      setDownloadSuccess("PDF downloaded successfully!");
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadJSON = () => {
    setDownloading("json");
    try {
      const data = {
        generatedAt: new Date().toISOString(),
        student: {
          name: form.name,
          email: form.email,
          mobile: form.mobile,
          rollNo: form.rollNo,
        },
        exam: {
          type: form.exam,
          class: form.className,
          stream: form.stream || "N/A",
          category: form.category,
          gender: form.gender,
          quota: form.quota,
        },
        result: {
          marks: Number(form.marks),
          predictedRank: result.predictedRankAvg,
          rankRange: {
            min: result.predictedRankRange.min,
            max: result.predictedRankRange.max,
          },
          selectionChance: selectionChance,
        },
        isImageStudent: form.isImageStudent,
        source: "Image Classes Entrance Result Predictor",
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Rank-Data-${form.name.replace(/\s+/g, "-")}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadSuccess("Data exported successfully!");
      setTimeout(() => setDownloadSuccess(null), 3000);
    } catch (error) {
      console.error("JSON download failed:", error);
    } finally {
      setDownloading(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#111] border border-white/10 rounded-3xl max-w-md w-full p-6 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📥</span> Download Result
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Success Message */}
        {downloadSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm text-center animate-fadeIn">
            ✓ {downloadSuccess}
          </div>
        )}

        {/* Preview */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Preview</p>
            <p className="text-3xl font-black text-red-500">
              #{result.predictedRankAvg}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {form.name} • {form.exam} Class {form.className}
            </p>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          {/* Image Download */}
          <button
            onClick={handleDownloadImage}
            disabled={downloading !== null}
            className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 group ${
              downloading === "image"
                ? "bg-purple-500/20 border-purple-500/50"
                : "bg-white/5 border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🖼️
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Download as Image</p>
              <p className="text-xs text-gray-400">High-quality PNG file</p>
            </div>
            {downloading === "image" ? (
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-gray-400 group-hover:text-purple-400 transition-colors">
                →
              </span>
            )}
          </button>

          {/* PDF Download */}
          <button
            onClick={handleDownloadPDF}
            disabled={downloading !== null}
            className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 group ${
              downloading === "pdf"
                ? "bg-red-500/20 border-red-500/50"
                : "bg-white/5 border-white/10 hover:bg-red-500/10 hover:border-red-500/30"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📄
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Download as PDF</p>
              <p className="text-xs text-gray-400">Print-ready document</p>
            </div>
            {downloading === "pdf" ? (
              <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-gray-400 group-hover:text-red-400 transition-colors">
                →
              </span>
            )}
          </button>

          {/* JSON Export */}
          <button
            onClick={handleDownloadJSON}
            disabled={downloading !== null}
            className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 group ${
              downloading === "json"
                ? "bg-blue-500/20 border-blue-500/50"
                : "bg-white/5 border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30"
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold">Export Data</p>
              <p className="text-xs text-gray-400">JSON format for analysis</p>
            </div>
            {downloading === "json" ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-gray-400 group-hover:text-blue-400 transition-colors">
                →
              </span>
            )}
          </button>
        </div>

        {/* Info */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span>🔒 Secure download</span>
          <span>📱 Mobile compatible</span>
          <span>⚡ Instant generation</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default function PredictPage() {
  const [step, setStep] = useState<Step>("form");
  const [formStep, setFormStep] = useState<FormStep>(1);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const resultRef = useRef<HTMLDivElement>(null!);

  const [form, setForm] = useState<FormType>({
    name: "",
    email: "",
    mobile: "",
    exam: "AMU",
    className: "6",
    stream: "",
    marks: "",
    gender: "",
    category: "",
    quota: "",
    rollNo: "",
    isImageStudent: false,
    isPublicConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);

  // Clear error
  useEffect(() => {
    if (errorMsg) {
      const timeout = setTimeout(() => setErrorMsg(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [errorMsg]);

  // Validation
  const isStep1Valid = () => {
    if (!form.name || form.name.length < 3) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return false;
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(form.mobile)) return false;
    return true;
  };

  const isStep2Valid = () => {
    if (!form.category || !form.gender || !form.quota) return false;
    if (form.className === "11" && !form.stream) return false;
    return true;
  };

  const isStep3Valid = () => {
    if (!form.marks || Number(form.marks) < 0 || Number(form.marks) > 100)
      return false;
    if (!form.rollNo) return false;
    if (!form.isPublicConsent) return false;
    return true;
  };

  const isFormValid = () => isStep1Valid() && isStep2Valid() && isStep3Valid();

  // OTP Timer
  useEffect(() => {
    if (step !== "otp") return;
    setTimer(60);
    setCanResend(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // OTP Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    otpRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (errorMsg) setErrorMsg("");
    const updated = {
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    };
    if (name === "className" && value !== "11") updated.stream = "";
    setForm(updated);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return setErrorMsg("Please fill all fields correctly");

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/email-otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      if (res.ok) {
        setStep("otp");
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        setErrorMsg("Failed to send OTP");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return setErrorMsg("Enter valid 6-digit OTP");

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/email-otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: otpValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setErrorMsg(data.error || "Invalid OTP");
      }

      await handlePredict();
    } catch {
      setLoading(false);
      setErrorMsg("Network error. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      await fetch("/api/email-otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } catch {
      setErrorMsg("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    const payload = {
      ...form,
      stream: form.className === "11" ? form.stream : "",
    };

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setErrorMsg(data.error || "Prediction failed");
      }

      setResult(data.data);
      setStep("result");

      if (data.data.predictedRankAvg <= 100) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep("form");
    setFormStep(1);
    setResult(null);
    setOtp(["", "", "", "", "", ""]);
    setErrorMsg("");
    setForm({
      name: "",
      email: "",
      mobile: "",
      exam: "AMU",
      className: "6",
      stream: "",
      marks: "",
      gender: "",
      category: "",
      quota: "",
      rollNo: "",
      isImageStudent: false,
      isPublicConsent: false,
    });
  };

  const getSelectionChance = () => {
    if (!result) return 0;
    if (result.predictedRankAvg <= 50) return 95;
    if (result.predictedRankAvg <= 100) return 85;
    if (result.predictedRankAvg <= 200) return 70;
    if (result.predictedRankAvg <= 300) return 50;
    if (result.predictedRankAvg <= 500) return 30;
    return 15;
  };

  const formSteps = [
    { num: 1, title: "Personal Info", icon: "👤" },
    { num: 2, title: "Exam Details", icon: "📝" },
    { num: 3, title: "Marks & Consent", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      <ParticleBackground />
      {showConfetti && <Confetti />}

      {/* Share Modal */}
      {result && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          result={result}
          form={form}
          selectionChance={getSelectionChance()}
        />
      )}

      {/* Download Modal */}
      {result && (
        <DownloadModal
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
          result={result}
          form={form}
          selectionChance={getSelectionChance()}
          resultRef={resultRef}
        />
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm text-red-300">
                AI-Powered Prediction
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Entrance Result
              </span>{" "}
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Predictor
              </span>
            </h1>

            <p className="text-gray-400 max-w-md mx-auto">
              Get accurate rank predictions for AMU & JMI entrance exams powered
              by AI
            </p>
          </div>

          {/* Progress Steps - Form */}
          {step === "form" && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                {formSteps.map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <button
                      onClick={() => {
                        if (
                          s.num === 1 ||
                          (s.num === 2 && isStep1Valid()) ||
                          (s.num === 3 && isStep1Valid() && isStep2Valid())
                        ) {
                          setFormStep(s.num as FormStep);
                        }
                      }}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        formStep === s.num
                          ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 text-white shadow-lg shadow-red-500/10"
                          : formStep > s.num
                            ? "bg-green-500/20 border border-green-500/50 text-green-400"
                            : "bg-white/5 border border-white/10 text-gray-500"
                      }`}
                    >
                      <span className="text-lg">
                        {formStep > s.num ? "✓" : s.icon}
                      </span>
                      <span className="hidden sm:inline text-sm font-medium">
                        {s.title}
                      </span>
                    </button>
                    {i < formSteps.length - 1 && (
                      <div
                        className={`w-8 h-0.5 mx-1 rounded transition-colors duration-300 ${formStep > s.num ? "bg-green-500" : "bg-white/10"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Steps - OTP/Result */}
          {step !== "form" && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                {[
                  { key: "form", label: "Details", icon: "📝" },
                  { key: "otp", label: "Verify", icon: "🔐" },
                  { key: "result", label: "Result", icon: "🎯" },
                ].map((s, i) => (
                  <div key={s.key} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                        step === s.key
                          ? "bg-red-500/20 border border-red-500/50 text-white"
                          : (step === "otp" && s.key === "form") ||
                              (step === "result" &&
                                ["form", "otp"].includes(s.key))
                            ? "bg-green-500/20 border border-green-500/50 text-green-400"
                            : "bg-white/5 border border-white/10 text-gray-500"
                      }`}
                    >
                      <span>
                        {(step === "otp" && s.key === "form") ||
                        (step === "result" && ["form", "otp"].includes(s.key))
                          ? "✓"
                          : s.icon}
                      </span>
                      <span className="text-sm font-medium">{s.label}</span>
                    </div>
                    {i < 2 && <div className="w-6 h-0.5 bg-white/10 mx-2" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl opacity-50" />

            <div className="relative bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
              {/* Loading */}
              {loading && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-red-500/30 rounded-full" />
                      <div className="absolute inset-0 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-gray-300 animate-pulse">Processing...</p>
                  </div>
                </div>
              )}

              {/* Error */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 animate-shake">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-red-400 text-sm flex-1">{errorMsg}</p>
                  <button
                    onClick={() => setErrorMsg("")}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* FORM STEP 1 */}
              {step === "form" && formStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-3xl mb-4">
                      👤
                    </div>
                    <h2 className="text-xl font-bold">Personal Information</h2>
                    <p className="text-gray-400 text-sm">
                      Tell us about yourself
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Full Name *
                      </label>
                      <div className="relative group">
                        {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-400 transition-colors">
                          👤
                        </span> */}
                        <input
                          name="name"
                          value={form.name}
                          placeholder="Enter your full name"
                          className="input pl-12"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Email Address *
                      </label>
                      <div className="relative group">
                        {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-400 transition-colors">
                          ✉️
                        </span> */}
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          placeholder="you@example.com"
                          className="input pl-12"
                          onChange={handleChange}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                        <span>🔒</span> OTP will be sent to this email
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Mobile Number *
                      </label>
                      <div className="relative group">
                        {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-400 transition-colors">
                          📱
                        </span> */}
                        {/* <span className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                          +91
                        </span> */}
                        <input
                          name="mobile"
                          type="tel"
                          value={form.mobile}
                          placeholder="9999999999"
                          className="input pl-[4.5rem]"
                          onChange={handleChange}
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setFormStep(2)}
                    disabled={!isStep1Valid()}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      isStep1Valid()
                        ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {/* FORM STEP 2 */}
              {step === "form" && formStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center text-3xl mb-4">
                      📝
                    </div>
                    <h2 className="text-xl font-bold">Exam Details</h2>
                    <p className="text-gray-400 text-sm">
                      Select your exam preferences
                    </p>
                  </div>

                  {/* Exam Selection */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-3">
                      Select Exam *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          value: "AMU",
                          logo: "/amu.png",
                          desc: "Aligarh Muslim University",
                        },
                        {
                          value: "JMI",
                          logo: "/jmi.png",
                          desc: "Jamia Millia Islamia",
                        },
                      ].map((exam) => (
                        <button
                          key={exam.value}
                          type="button"
                          onClick={() => setForm({ ...form, exam: exam.value })}
                          className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex gap-2 justify-evenly text-left group ${
                            form.exam === exam.value
                              ? "border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20"
                              : "border-white/10 bg-white/5 hover:border-white/20"
                          }`}
                        >
                          {form.exam === exam.value && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          {/* <div className="text-3xl mb-2 group-hover:scale-110 transition-transform"> */}
                            {/* {exam.icon} */}
                            <Image width={50} height={50} alt="logo" className="w-auto" src={exam.logo}/>
                          {/* </div> */}
                          <div>
                          <p className="font-bold text-lg">{exam.value}</p>
                          <p className="text-xs text-gray-500">{exam.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Class Selection */}
                  <div>
                    <label className="block text-sm text-gray-400 mb-3">
                      Select Class *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "6", icon: "📚" },
                        { value: "9", icon: "📖" },
                        { value: "11", icon: "🎯" },
                      ].map((cls) => (
                        <button
                          key={cls.value}
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              className: cls.value,
                              stream: "",
                            })
                          }
                          className={`py-4 px-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                            form.className === cls.value
                              ? "border-red-500 bg-red-500/10 text-white"
                              : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <span className="text-2xl">{cls.icon}</span>
                          <span className="font-semibold text-sm">
                            Class {cls.value}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stream */}
                  {form.className === "11" && (
                    <div className="animate-fadeIn">
                      <label className="block text-sm text-gray-400 mb-3">
                        Select Stream *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: "PCM", icon: "🔬" },
                          { value: "PCB", icon: "🧬" },
                          { value: "Diploma", icon: "📐" },
                        ].map((s) => (
                          <button
                            key={s.value}
                            type="button"
                            onClick={() =>
                              setForm({ ...form, stream: s.value })
                            }
                            className={`py-4 px-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-1 ${
                              form.stream === s.value
                                ? "border-purple-500 bg-purple-500/10"
                                : "border-white/10 bg-white/5 hover:border-white/20"
                            }`}
                          >
                            <span className="text-2xl">{s.icon}</span>
                            <span className="font-semibold text-sm">
                              {s.value}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Category, Gender, Quota */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="input text-sm  text-gray-400"
                      >
                        <option className="bg-red-500"  value="">Select</option>
                        <option className="bg-red-500"  value="General">General</option>
                        <option className="bg-red-500"  value="OBC">OBC</option>
                        <option className="bg-red-500"  value="SC">SC</option>
                        <option className="bg-red-500"  value="ST">ST</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="input text-sm"
                      >
                        <option className="bg-red-500"  value="">Select</option>
                        <option className="bg-red-500"  value="Male">Male</option>
                        <option className="bg-red-500"  value="Female">Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Quota *
                      </label>
                      <select
                        name="quota"
                        value={form.quota}
                        onChange={handleChange}
                        className="input text-sm"
                      >
                        <option className="bg-red-500"  value="">Select</option>
                        <option className="bg-red-500"  value="Internal">Internal</option>
                        <option className="bg-red-500"  value="External">External</option>
                      </select>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setFormStep(1)}
                      className="flex-1 py-4 rounded-xl font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      Back
                    </button>
                    <button
                      onClick={() => setFormStep(3)}
                      disabled={!isStep2Valid()}
                      className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isStep2Valid()
                          ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/25"
                          : "bg-gray-800 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Continue
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* FORM STEP 3 */}
              {step === "form" && formStep === 3 && (
                <form
                  onSubmit={handleSendOtp}
                  className="space-y-6 animate-fadeIn"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-3xl mb-4">
                      ✅
                    </div>
                    <h2 className="text-xl font-bold">Final Details</h2>
                    <p className="text-gray-400 text-sm">
                      Enter your marks and consent
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Your Marks (%) *
                      </label>
                      <div className="relative group">
                        {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          📊
                        </span> */}
                        <input
                          name="marks"
                          type="number"
                          value={form.marks}
                          placeholder="e.g., 85"
                          className="input pl-12"
                          onChange={handleChange}
                          min={0}
                          max={100}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Roll Number *
                      </label>
                      <div className="relative group">
                        {/* <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                          🎫
                        </span> */}
                        <input
                          name="rollNo"
                          value={form.rollNo}
                          placeholder="Your roll no"
                          className="input pl-12"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Marks Visualization */}
                  {form.marks && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Score Analysis</span>
                        <span
                          className={`font-bold ${Number(form.marks) >= 80 ? "text-green-400" : Number(form.marks) >= 60 ? "text-yellow-400" : "text-red-400"}`}
                        >
                          {Number(form.marks) >= 80
                            ? "🎉 Excellent!"
                            : Number(form.marks) >= 60
                              ? "👍 Good"
                              : "💪 Keep Trying"}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-700"
                          style={{
                            width: `${Math.min(Number(form.marks), 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.07] transition-all group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          name="isImageStudent"
                          checked={form.isImageStudent}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-6 h-6 rounded-lg border-2 border-gray-600 peer-checked:border-red-500 peer-checked:bg-red-500 transition-all flex items-center justify-center">
                          {form.isImageStudent && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          I am an Image Classes student
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Check if enrolled in Image Classes
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/[0.07] transition-all group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          name="isPublicConsent"
                          checked={form.isPublicConsent}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-6 h-6 rounded-lg border-2 border-gray-600 peer-checked:border-red-500 peer-checked:bg-red-500 transition-all flex items-center justify-center">
                          {form.isPublicConsent && (
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          I agree to display my data publicly *
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Your data may appear in leaderboard
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="flex-1 py-4 rounded-xl font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 17l-5-5m0 0l5-5m-5 5h12"
                        />
                      </svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid() || loading}
                      className={`flex-1 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        isFormValid() && !loading
                          ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98]"
                          : "bg-gray-800 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      🚀 Predict My Rank
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-6 pt-2 text-xs text-gray-500">
                    <span>🔒 Secure</span>
                    <span>⚡ Instant</span>
                    <span>🎯 95% Accurate</span>
                  </div>
                </form>
              )}

              {/* OTP */}
              {step === "otp" && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-4xl mb-4">
                      ✉️
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Verify Your Email
                    </h2>
                    <p className="text-gray-400">
                      We've sent a 6-digit code to
                      <br />
                      <span className="text-white font-medium">
                        {form.email}
                      </span>
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div
                    className="flex justify-center gap-3"
                    onPaste={handleOtpPaste}
                  >
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          otpRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 bg-white/5 transition-all duration-300 focus:outline-none ${
                          digit
                            ? "border-green-500 bg-green-500/10 text-white"
                            : "border-white/20 text-gray-400 focus:border-red-500"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.some((d) => !d)}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      !loading && otp.every((d) => d)
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/25 hover:scale-[1.02] active:scale-[0.98]"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Verifying..." : "Verify & Get Rank ✓"}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-sm">
                    {canResend ? (
                      <button
                        onClick={handleResendOtp}
                        disabled={loading}
                        className="text-red-400 hover:text-red-300 font-medium"
                      >
                        🔄 Resend Code
                      </button>
                    ) : (
                      <span className="text-gray-500">
                        Resend in{" "}
                        <span className="text-white font-mono bg-white/10 px-2 py-1 rounded">
                          {timer}s
                        </span>
                      </span>
                    )}

                    <span className="text-gray-700">|</span>

                    <button
                      onClick={() => {
                        setStep("form");
                        setOtp(["", "", "", "", "", ""]);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      ← Change Email
                    </button>
                  </div>
                </div>
              )}

              {/* RESULT */}
              {step === "result" && result && (
                <div ref={resultRef} className="space-y-6 animate-fadeIn">
                  {/* Success Badge */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-4">
                      <span className="text-green-400">✓</span>
                      <span className="text-green-300 text-sm">
                        Prediction Complete
                      </span>
                    </div>
                  </div>

                  {/* Rank Display */}
                  <div className="relative py-6 text-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full bg-gradient-to-r from-red-500/20 via-orange-500/10 to-yellow-500/20 blur-3xl" />
                    </div>
                    <div className="relative">
                      <p className="text-gray-400 mb-2 text-sm">
                        Your Predicted Rank
                      </p>
                      <p className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        #<AnimatedCounter value={result.predictedRankAvg} />
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                        <span className="text-gray-400 text-sm">
                          Expected Range:
                        </span>
                        <span className="text-white font-semibold">
                          {result.predictedRankRange.min} -{" "}
                          {result.predictedRankRange.max}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selection Chance */}
                  <div className="flex justify-center">
                    <CircularProgress percentage={getSelectionChance()} />
                  </div>

                  {/* Smart Message */}
                  <div
                    className={`p-5 rounded-2xl border ${
                      result.predictedRankAvg <= 100
                        ? "bg-green-500/10 border-green-500/30"
                        : result.predictedRankAvg <= 300
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    {result.predictedRankAvg <= 100 ? (
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">🎉</span>
                        <div>
                          <p className="font-bold text-green-400 mb-1">
                            Outstanding Performance!
                          </p>
                          <p className="text-gray-300 text-sm">
                            Congratulations! You have an excellent chance of
                            selection!
                          </p>
                        </div>
                      </div>
                    ) : result.predictedRankAvg <= 300 ? (
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">👍</span>
                        <div>
                          <p className="font-bold text-yellow-400 mb-1">
                            Good Position!
                          </p>
                          <p className="text-gray-300 text-sm">
                            You're in a competitive position. Keep working hard!
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">💪</span>
                        <div>
                          <p className="font-bold text-red-400 mb-1">
                            Keep Going!
                          </p>
                          <p className="text-gray-300 text-sm">
                            Don't give up! Success comes with persistence!
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Student Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: "👤", label: "Name", value: form.name },
                      {
                        icon: "🎓",
                        label: "Class",
                        value:
                          form.className +
                          (form.stream ? ` ${form.stream}` : ""),
                      },
                      { icon: "📊", label: "Marks", value: `${form.marks}%` },
                      { icon: "🏷️", label: "Category", value: form.category },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-center"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.label}
                        </p>
                        <p className="font-semibold text-sm truncate">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2 text-sm group"
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        📤
                      </span>
                      <span className="hidden sm:inline">Share</span>
                    </button>
                    <button
                      onClick={() => setShowDownloadModal(true)}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:border-green-500/50 hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm group"
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        📥
                      </span>
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2 text-sm font-medium group"
                    >
                      <span className="group-hover:rotate-180 transition-transform">
                        🔄
                      </span>
                      <span className="hidden sm:inline">Again</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <span>🎯 50K+ Predictions</span>
              <span>⭐ 4.9 Rating</span>
              <span>✅ 95% Accuracy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .input::placeholder {
          color: #666;
        }

        .input:focus {
          outline: none;
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.05);
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
        }

        .input:hover:not(:focus) {
          border-color: rgba(255, 255, 255, 0.2);
        }

        select.input {
          cursor: pointer;
          appearance: none;
          background-image: url("./logo.png' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 18px;
          padding-right: 40px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-8px);
          }
          40% {
            transform: translateX(8px);
          }
          60% {
            transform: translateX(-8px);
          }
          80% {
            transform: translateX(8px);
          }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(0) translateX(20px);
          }
          75% {
            transform: translateY(20px) translateX(10px);
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
