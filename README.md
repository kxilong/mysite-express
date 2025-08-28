#### 2. 博客表（`blogs`）

存储博客文章的核心内容。

```sql
CREATE TABLE `blogs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '博客ID',
  `title` varchar(200) NOT NULL COMMENT '文章标题',
  `content` longtext NOT NULL COMMENT '文章内容（HTML或Markdown）',
  `summary` varchar(500) DEFAULT NULL COMMENT '文章摘要',
  `cover_image` varchar(255) DEFAULT NULL COMMENT '封面图URL',
  `user_id` bigint(20) NOT NULL COMMENT '作者ID（关联users表）',
  `category_id` bigint(20) DEFAULT NULL COMMENT '分类ID（关联categories表）',
  `view_count` int(11) NOT NULL DEFAULT 0 COMMENT '阅读量',
  `like_count` int(11) NOT NULL DEFAULT 0 COMMENT '点赞数',
  `is_published` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否发布：1-已发布，0-草稿',
  `published_at` datetime DEFAULT NULL COMMENT '发布时间',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_category_id` (`category_id`),
  KEY `idx_published_at` (`published_at`),
  CONSTRAINT `fk_blog_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='博客表';
```
