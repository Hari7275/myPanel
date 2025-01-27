module.exports = {
  apps: [
    {
      name: "admin-panel",
      script: "npm",
      args: "start",
      instances: 1, // You can set this to 'max' for cluster mode
      // exec_mode: "fork", 
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

// module.exports = {
//   apps: [
//     {
//       name: "admin-panel",
//       script: "serve",
//       args: "-s build -l 3000", // Adjust the port as needed
//       instances: 1,
//       exec_mode: "fork",
//       env: {
//         NODE_ENV: "production",
//       },
//     },
//   ],
// };
