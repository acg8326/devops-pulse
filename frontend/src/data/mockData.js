// Mock data simulating real DevOps monitoring data

export const pipelines = [
  {
    id: 1,
    name: "hr-portal-api",
    branch: "main",
    status: "success",
    stages: [
      { name: "build", status: "success", duration: 45 },
      { name: "test", status: "success", duration: 120 },
      { name: "deploy", status: "success", duration: 60 }
    ],
    triggeredBy: "aj.garcia",
    triggeredAt: "2025-01-20T08:30:00Z",
    duration: 225,
    environment: "production"
  },
  {
    id: 2,
    name: "frontend-dashboard",
    branch: "feature/new-charts",
    status: "running",
    stages: [
      { name: "build", status: "success", duration: 38 },
      { name: "test", status: "running", duration: null },
      { name: "deploy", status: "pending", duration: null }
    ],
    triggeredBy: "maria.santos",
    triggeredAt: "2025-01-20T09:15:00Z",
    duration: null,
    environment: "staging"
  },
  {
    id: 3,
    name: "payment-service",
    branch: "hotfix/timeout-fix",
    status: "failed",
    stages: [
      { name: "build", status: "success", duration: 52 },
      { name: "test", status: "failed", duration: 89 },
      { name: "deploy", status: "skipped", duration: null }
    ],
    triggeredBy: "john.reyes",
    triggeredAt: "2025-01-20T07:45:00Z",
    duration: 141,
    environment: "development"
  },
  {
    id: 4,
    name: "notification-worker",
    branch: "main",
    status: "success",
    stages: [
      { name: "build", status: "success", duration: 30 },
      { name: "test", status: "success", duration: 95 },
      { name: "deploy", status: "success", duration: 45 }
    ],
    triggeredBy: "aj.garcia",
    triggeredAt: "2025-01-20T06:00:00Z",
    duration: 170,
    environment: "production"
  },
  {
    id: 5,
    name: "auth-service",
    branch: "develop",
    status: "running",
    stages: [
      { name: "build", status: "running", duration: null },
      { name: "test", status: "pending", duration: null },
      { name: "deploy", status: "pending", duration: null }
    ],
    triggeredBy: "lisa.cruz",
    triggeredAt: "2025-01-20T09:20:00Z",
    duration: null,
    environment: "staging"
  }
];

export const servers = [
  {
    id: 1,
    name: "prod-web-01",
    type: "Web Server",
    provider: "Linode",
    status: "healthy",
    cpu: 45,
    memory: 62,
    disk: 38,
    uptime: "45d 12h 30m",
    ip: "172.105.x.x",
    environment: "production"
  },
  {
    id: 2,
    name: "prod-web-02",
    type: "Web Server",
    provider: "Linode",
    status: "healthy",
    cpu: 38,
    memory: 55,
    disk: 41,
    uptime: "45d 12h 30m",
    ip: "172.105.x.x",
    environment: "production"
  },
  {
    id: 3,
    name: "prod-db-01",
    type: "Database",
    provider: "Oracle Cloud",
    status: "warning",
    cpu: 78,
    memory: 85,
    disk: 72,
    uptime: "30d 8h 15m",
    ip: "132.145.x.x",
    environment: "production"
  },
  {
    id: 4,
    name: "staging-app-01",
    type: "Application",
    provider: "Linode",
    status: "healthy",
    cpu: 22,
    memory: 45,
    disk: 28,
    uptime: "15d 4h 20m",
    ip: "172.104.x.x",
    environment: "staging"
  },
  {
    id: 5,
    name: "dev-runner-01",
    type: "GitLab Runner",
    provider: "Oracle Cloud",
    status: "healthy",
    cpu: 55,
    memory: 48,
    disk: 35,
    uptime: "7d 22h 45m",
    ip: "129.153.x.x",
    environment: "development"
  },
  {
    id: 6,
    name: "prod-redis-01",
    type: "Cache",
    provider: "Linode",
    status: "critical",
    cpu: 92,
    memory: 94,
    disk: 45,
    uptime: "2d 5h 10m",
    ip: "172.105.x.x",
    environment: "production"
  }
];

export const deployments = [
  {
    id: 1,
    project: "hr-portal-api",
    version: "v2.4.1",
    environment: "production",
    status: "success",
    deployedBy: "aj.garcia",
    deployedAt: "2025-01-20T08:35:00Z",
    duration: 58
  },
  {
    id: 2,
    project: "frontend-dashboard",
    version: "v1.12.0",
    environment: "staging",
    status: "in_progress",
    deployedBy: "maria.santos",
    deployedAt: "2025-01-20T09:18:00Z",
    duration: null
  },
  {
    id: 3,
    project: "notification-worker",
    version: "v3.0.2",
    environment: "production",
    status: "success",
    deployedBy: "aj.garcia",
    deployedAt: "2025-01-20T06:05:00Z",
    duration: 42
  },
  {
    id: 4,
    project: "payment-service",
    version: "v1.8.5",
    environment: "development",
    status: "failed",
    deployedBy: "john.reyes",
    deployedAt: "2025-01-20T07:50:00Z",
    duration: 35
  },
  {
    id: 5,
    project: "auth-service",
    version: "v2.1.0",
    environment: "production",
    status: "success",
    deployedBy: "lisa.cruz",
    deployedAt: "2025-01-19T22:15:00Z",
    duration: 51
  }
];

export const stats = {
  totalPipelines: 24,
  successRate: 87.5,
  activeDeployments: 2,
  healthyServers: 4,
  warningServers: 1,
  criticalServers: 1,
  totalServers: 6,
  avgBuildTime: 142,
  deploymentsToday: 8
};

export const activityFeed = [
  {
    id: 1,
    type: "deployment",
    message: "hr-portal-api v2.4.1 deployed to production",
    user: "aj.garcia",
    timestamp: "2025-01-20T08:35:00Z"
  },
  {
    id: 2,
    type: "pipeline",
    message: "payment-service pipeline failed at test stage",
    user: "john.reyes",
    timestamp: "2025-01-20T07:50:00Z"
  },
  {
    id: 3,
    type: "alert",
    message: "prod-redis-01 CPU usage exceeded 90%",
    user: "system",
    timestamp: "2025-01-20T09:10:00Z"
  },
  {
    id: 4,
    type: "deployment",
    message: "notification-worker v3.0.2 deployed to production",
    user: "aj.garcia",
    timestamp: "2025-01-20T06:05:00Z"
  },
  {
    id: 5,
    type: "pipeline",
    message: "auth-service pipeline started on develop branch",
    user: "lisa.cruz",
    timestamp: "2025-01-20T09:20:00Z"
  }
];

export const pipelineHistory = [
  { date: "Jan 14", success: 12, failed: 2, total: 14 },
  { date: "Jan 15", success: 18, failed: 1, total: 19 },
  { date: "Jan 16", success: 15, failed: 3, total: 18 },
  { date: "Jan 17", success: 22, failed: 2, total: 24 },
  { date: "Jan 18", success: 19, failed: 4, total: 23 },
  { date: "Jan 19", success: 16, failed: 1, total: 17 },
  { date: "Jan 20", success: 21, failed: 3, total: 24 }
];

export const deploymentHistory = [
  { date: "Jan 14", production: 3, staging: 5, development: 8 },
  { date: "Jan 15", production: 2, staging: 7, development: 12 },
  { date: "Jan 16", production: 4, staging: 6, development: 9 },
  { date: "Jan 17", production: 5, staging: 8, development: 14 },
  { date: "Jan 18", production: 3, staging: 4, development: 11 },
  { date: "Jan 19", production: 2, staging: 6, development: 7 },
  { date: "Jan 20", production: 4, staging: 5, development: 10 }
];

export const pipelineHistoryLog = [
  {
    id: 1,
    pipelineName: "hr-portal-api",
    branch: "main",
    status: "success",
    triggeredBy: "aj.garcia",
    startedAt: "2025-01-20T08:30:00Z",
    finishedAt: "2025-01-20T08:34:15Z",
    duration: 255,
    environment: "production"
  },
  {
    id: 2,
    pipelineName: "frontend-dashboard",
    branch: "feature/new-charts",
    status: "success",
    triggeredBy: "maria.santos",
    startedAt: "2025-01-20T07:15:00Z",
    finishedAt: "2025-01-20T07:19:30Z",
    duration: 270,
    environment: "staging"
  },
  {
    id: 3,
    pipelineName: "payment-service",
    branch: "hotfix/timeout-fix",
    status: "failed",
    triggeredBy: "john.reyes",
    startedAt: "2025-01-20T06:45:00Z",
    finishedAt: "2025-01-20T06:48:21Z",
    duration: 201,
    environment: "development"
  },
  {
    id: 4,
    pipelineName: "auth-service",
    branch: "main",
    status: "success",
    triggeredBy: "lisa.cruz",
    startedAt: "2025-01-19T22:10:00Z",
    finishedAt: "2025-01-19T22:14:45Z",
    duration: 285,
    environment: "production"
  },
  {
    id: 5,
    pipelineName: "notification-worker",
    branch: "develop",
    status: "success",
    triggeredBy: "aj.garcia",
    startedAt: "2025-01-19T18:30:00Z",
    finishedAt: "2025-01-19T18:33:10Z",
    duration: 190,
    environment: "staging"
  },
  {
    id: 6,
    pipelineName: "hr-portal-api",
    branch: "feature/leave-module",
    status: "failed",
    triggeredBy: "maria.santos",
    startedAt: "2025-01-19T15:20:00Z",
    finishedAt: "2025-01-19T15:22:45Z",
    duration: 165,
    environment: "development"
  },
  {
    id: 7,
    pipelineName: "frontend-dashboard",
    branch: "main",
    status: "success",
    triggeredBy: "aj.garcia",
    startedAt: "2025-01-19T12:00:00Z",
    finishedAt: "2025-01-19T12:04:30Z",
    duration: 270,
    environment: "production"
  },
  {
    id: 8,
    pipelineName: "payment-service",
    branch: "main",
    status: "success",
    triggeredBy: "john.reyes",
    startedAt: "2025-01-19T09:45:00Z",
    finishedAt: "2025-01-19T09:49:15Z",
    duration: 255,
    environment: "production"
  },
  {
    id: 9,
    pipelineName: "auth-service",
    branch: "feature/oauth",
    status: "success",
    triggeredBy: "lisa.cruz",
    startedAt: "2025-01-18T16:30:00Z",
    finishedAt: "2025-01-18T16:34:00Z",
    duration: 210,
    environment: "staging"
  },
  {
    id: 10,
    pipelineName: "notification-worker",
    branch: "hotfix/email-bug",
    status: "failed",
    triggeredBy: "aj.garcia",
    startedAt: "2025-01-18T14:15:00Z",
    finishedAt: "2025-01-18T14:17:30Z",
    duration: 150,
    environment: "development"
  }
];

export const alerts = [
  {
    id: 1,
    type: "critical",
    title: "High CPU Usage",
    message: "prod-redis-01 CPU usage exceeded 90% for more than 5 minutes",
    server: "prod-redis-01",
    metric: "cpu",
    value: 94,
    threshold: 90,
    status: "active",
    createdAt: "2025-01-20T09:10:00Z",
    acknowledgedAt: null,
    acknowledgedBy: null
  },
  {
    id: 2,
    type: "warning",
    title: "High Memory Usage",
    message: "prod-db-01 memory usage is at 85%",
    server: "prod-db-01",
    metric: "memory",
    value: 85,
    threshold: 80,
    status: "active",
    createdAt: "2025-01-20T08:45:00Z",
    acknowledgedAt: null,
    acknowledgedBy: null
  },
  {
    id: 3,
    type: "critical",
    title: "Pipeline Failed",
    message: "payment-service pipeline failed at test stage",
    server: null,
    metric: null,
    value: null,
    threshold: null,
    status: "acknowledged",
    createdAt: "2025-01-20T07:50:00Z",
    acknowledgedAt: "2025-01-20T07:55:00Z",
    acknowledgedBy: "john.reyes"
  },
  {
    id: 4,
    type: "warning",
    title: "Disk Space Low",
    message: "prod-db-01 disk usage is at 72%",
    server: "prod-db-01",
    metric: "disk",
    value: 72,
    threshold: 70,
    status: "resolved",
    createdAt: "2025-01-19T22:30:00Z",
    acknowledgedAt: "2025-01-19T22:35:00Z",
    acknowledgedBy: "aj.garcia"
  },
  {
    id: 5,
    type: "info",
    title: "Deployment Completed",
    message: "hr-portal-api v2.4.1 successfully deployed to production",
    server: null,
    metric: null,
    value: null,
    threshold: null,
    status: "resolved",
    createdAt: "2025-01-20T08:35:00Z",
    acknowledgedAt: null,
    acknowledgedBy: null
  },
  {
    id: 6,
    type: "critical",
    title: "Service Unavailable",
    message: "notification-worker failed health check 3 times",
    server: "prod-web-01",
    metric: null,
    value: null,
    threshold: null,
    status: "resolved",
    createdAt: "2025-01-19T14:20:00Z",
    acknowledgedAt: "2025-01-19T14:25:00Z",
    acknowledgedBy: "aj.garcia"
  }
];
