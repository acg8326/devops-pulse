import { useState, useRef, useEffect } from "react";
import { Bell, AlertTriangle, AlertCircle, Rocket, GitBranch, X, Check } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "High CPU Usage",
    message: "prod-redis-01 CPU at 94%",
    time: "2 min ago",
    read: false
  },
  {
    id: 2,
    type: "pipeline",
    title: "Pipeline Failed",
    message: "payment-service failed at test stage",
    time: "15 min ago",
    read: false
  },
  {
    id: 3,
    type: "deployment",
    title: "Deployment Complete",
    message: "hr-portal-api v2.4.1 deployed",
    time: "1 hour ago",
    read: true
  },
  {
    id: 4,
    type: "alert",
    title: "Memory Warning",
    message: "prod-db-01 memory at 85%",
    time: "2 hours ago",
    read: true
  }
];

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const dropdownRef = useRef(null);

  const unreadCount = items.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "pipeline":
        return <GitBranch className="w-4 h-4 text-blue-400" />;
      case "deployment":
        return <Rocket className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const markAsRead = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, read: true } : item
    ));
  };

  const markAllAsRead = () => {
    setItems(items.map(item => ({ ...item, read: true })));
  };

  const removeNotification = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-400 hover:text-white transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h3 className="font-semibold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-emerald-400 hover:text-emerald-300"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="p-4 text-center text-slate-400">
                No notifications
              </div>
            ) : (
              items.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors ${
                    !notification.read ? "bg-slate-700/30" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="p-2 bg-slate-700 rounded-lg h-fit">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-white">{notification.title}</p>
                        <button 
                          onClick={() => removeNotification(notification.id)}
                          className="text-slate-500 hover:text-slate-300"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{notification.time}</span>
                        {!notification.read && (
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-slate-700">
            <button className="w-full text-center text-sm text-emerald-400 hover:text-emerald-300">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
