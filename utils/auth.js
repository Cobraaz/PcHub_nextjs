export const withAuth = (res, location) => {
  res.writeHead(302, {
    Location: location,
  });
  res.end();
  return { props: {} }; // stop execution
};
