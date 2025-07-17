import React from "react";
import {
  Home,
  MessageCircle,
  Settings,
  TrendingUp,
  Users,
  Hash,
  type LucideIcon,
} from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}
interface MenuItem {
  icon: LucideIcon;
  label: string;
  active: boolean;
}
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const menuItems: MenuItem[] = [
    { icon: Home, label: "Home", active: false },
    { icon: Users, label: "Community", active: true },
    { icon: MessageCircle, label: "Messages", active: false },
    { icon: TrendingUp, label: "Trending", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="fixed left-0 top-0 h-full w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 pt-20">
        <div className="px-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Navigation</h3>
          <nav className="space-y-2">
            {menuItems.map((item: MenuItem, index: number) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-400/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="px-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Trending Topics
          </h3>
          <div className="space-y-3">
            {[
              "#SustainableFarming",
              "#CropRotation",
              "#OrganicTips",
              "#ClimateChange",
            ].map((tag: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-green-400 cursor-pointer transition-colors"
              >
                <Hash className="w-4 h-4" />
                <span>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
