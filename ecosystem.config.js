
module.exports = {
    apps: [{
        name: "g2panda",
        script: "dist/server.js",
        cwd: "d:\\Personal_Project\\g2panda_release",
        env: {
            NODE_ENV: "production",
            PORT: 7001
        },
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        time: true
    }]
}
