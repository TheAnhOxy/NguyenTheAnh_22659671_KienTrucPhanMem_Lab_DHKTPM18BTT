const fs = require("fs");
const path = require("path");
const db = require("../config/db");

class PluginManager {
  constructor() {
    this.plugins = [];
  }

  // load plugin từ DB
  loadPlugins() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM plugins WHERE is_active = true", (err, results) => {
        if (err) reject(err);

        results.forEach((row) => {
          const pluginPath = path.join(__dirname, "../plugins", row.name);
          if (fs.existsSync(pluginPath + ".js")) {
            const plugin = require(pluginPath);
            this.plugins.push(plugin);
            console.log("✅ Loaded:", row.name);
          }
        });

        resolve();
      });
    });
  }

  // chạy plugin
  async execute(context) {
    for (const plugin of this.plugins) {
      await plugin.run(context);
    }
  }
}

module.exports = new PluginManager();