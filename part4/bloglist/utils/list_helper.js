const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog  = (blogs) => {
  // returns the blog with the most likes

  // sort the blog in descending order
  blogs.sort(function (a, b) {
    if (a['likes'] < b['likes']) return 1
    if (a['likes'] > b['likes']) return -1
    return 0
  })
  return blogs[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog 
};
