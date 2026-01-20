/**
 * Format duration in seconds to human readable string
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration (e.g., "3m 45s")
 */
export function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "Running...";
  if (seconds === 0) return "0s";
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  if (mins === 0) return `${secs}s`;
  if (secs === 0) return `${mins}m`;
  return `${mins}m ${secs}s`;
}

/**
 * Format timestamp to relative time (e.g., "2 min ago")
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Relative time string
 */
export function formatRelativeTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

/**
 * Format timestamp to locale time string
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted time (e.g., "09:30 AM")
 */
export function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
}

/**
 * Format timestamp to locale date string
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted date (e.g., "Jan 20, 09:30 AM")
 */
export function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

/**
 * Format percentage value
 * @param {number} value - Percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined) return "0%";
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format bytes to human readable string
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size (e.g., "1.5 GB")
 */
export function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
