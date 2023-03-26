const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  // returns the blog with the most likes

  // sort the blog in descending order
  blogs.sort(function (a, b) {
    if (a["likes"] < b["likes"]) return 1;
    if (a["likes"] > b["likes"]) return -1;
    return 0;
  });
  return blogs[0];
};

const mostBlogs = (blogs) => {
  let arr = blogs;
  let key = "author";

  const result = arr.reduce((groupedArr, item) => {
    const groupedKey = item[key];
    if (groupedArr[groupedKey] == null) groupedArr[groupedKey] = [];
    groupedArr[groupedKey].push(item);
    return groupedArr;
  }, {});

  const arrLength = Object.values(result).map((arr) => arr.length);
  const mostBlogs = arrLength.indexOf(Math.max(...arrLength));
  const authorWithMostBlogs = Object.keys(result)[mostBlogs];
  return { author: authorWithMostBlogs, blogs: Math.max(...arrLength) };
};

const mostLikes = (blogs) => {
  let arr = blogs;
  let key = "author";

  const result = arr.reduce((groupedArr, item) => {
    const groupedKey = item[key];
    if (groupedArr[groupedKey] == null) groupedArr[groupedKey] = [];
    groupedArr[groupedKey].push(item);
    return groupedArr;
  }, {});

  const authorLikes = Object.values(result).map((arr) =>
    arr.reduce((acc, s) => acc + s.likes, 0)
  );
  const authorWithMostLikes =
    Object.keys(result)[authorLikes.indexOf(Math.max(...authorLikes))];
  return {
    author: authorWithMostLikes,
    likes: Math.max(...authorLikes),
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
