const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    onDelete: 'CASCADE'
});
Post.belongsTo(User);

Post.hasMany(Comment, {
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post);

Comment.belongsTo(User);
User.hasMany(Comment);

module.exports = {
    User,
    Post,
    Comment
};