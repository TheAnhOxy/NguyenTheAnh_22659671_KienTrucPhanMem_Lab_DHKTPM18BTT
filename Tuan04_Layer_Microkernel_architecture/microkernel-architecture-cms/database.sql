CREATE DATABASE cms_plugin;

USE cms_plugin;

-- bảng plugin
CREATE TABLE plugins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE
);

-- bảng analytics
CREATE TABLE analytics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert plugin mặc định
INSERT INTO plugins (name, is_active) VALUES
('seoPlugin', true),
('analyticsPlugin', true);