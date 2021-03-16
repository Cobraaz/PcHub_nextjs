const BaseLayout = (props) => {
  const { className, children } = props;
  return (
    <>
      <div className="layout-container">
        <main
          // onClick={() => isOpen && toggle()}
          className={`cover ${className}`}
        >
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
