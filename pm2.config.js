module.exports = {
  apps: [
    {
      name: "admin-panel",
      script: "npm",
      args: "start",
      instances: 1,
      // exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
