const pipelines = [
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
    triggeredAt: new Date().toISOString(),
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
    triggeredAt: new Date().toISOString(),
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
    triggeredAt: new Date().toISOString(),
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
    triggeredAt: new Date().toISOString(),
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
    triggeredAt: new Date().toISOString(),
    duration: null,
    environment: "staging"
  }
];

const servers = [
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

const deployments = [
  {
    id: 1,
    project: "hr-portal-api",
    version: "v2.4.1",
    environment: "production",
    status: "success",
    deployedBy: "aj.garcia",
    deployedAt: new Date().toISOString(),
    duration: 58
  },
  {
    id: 2,
    project: "frontend-dashboard",
    version: "v1.12.0",
    environment: "staging",
    status: "in_progress",
    deployedBy: "maria.santos",
    deployedAt: new Date().toISOString(),
    duration: null
  },
  {
    id: 3,
    project: "notification-worker",
    version: "v3.0.2",
    environment: "production",
    status: "success",
    deployedBy: "aj.garcia",
    deployedAt: new Date().toISOString(),
    duration: 42
  },
  {
    id: 4,
    project: "payment-service",
    version: "v1.8.5",
    environment: "development",
    status: "failed",
    deployedBy: "john.reyes",
    deployedAt: new Date().toISOString(),
    duration: 35
  },
  {
    id: 5,
    project: "auth-service",
    version: "v2.1.0",
    environment: "production",
    status: "success",
    deployedBy: "lisa.cruz",
    deployedAt: new Date().toISOString(),
    duration: 51
  }
];

const stats = {
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

const activityFeed = [
  {
    id: 1,
    type: "deployment",
    message: "hr-portal-api v2.4.1 deployed to production",
    user: "aj.garcia",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    type: "pipeline",
    message: "payment-service pipeline failed at test stage",
    user: "john.reyes",
    timestamp: new Date().toISOString()
  },
  {
    id: 3,
    type: "alert",
    message: "prod-redis-01 CPU usage exceeded 90%",
    user: "system",
    timestamp: new Date().toISOString()
  },
  {
    id: 4,
    type: "deployment",
    message: "notification-worker v3.0.2 deployed to production",
    user: "aj.garcia",
    timestamp: new Date().toISOString()
  },
  {
    id: 5,
    type: "pipeline",
    message: "auth-service pipeline started on develop branch",
    user: "lisa.cruz",
    timestamp: new Date().toISOString()
  }
];

module.exports = {
  pipelines,
  servers,
  deployments,
  stats,
  activityFeed
};
