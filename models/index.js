const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');


BlogPost.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})


module.exports = { User, BlogPost, Comment };
