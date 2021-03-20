export const withAuth = (res, location) => {
  res.setHeader("Location", location);
  res.statusCode = 302;
  // res.end();
  return { props: {} }; // stop execution
};
