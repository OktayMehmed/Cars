import "./styles.css"

const NotFoundPage = () => {
  return (
    <div className="site">
      <div className="sketch">
        <div className="bee-sketch red"></div>
        <div className="bee-sketch blue"></div>
      </div>

      <h1 className="not-found-title">
        404:
        <small>Not Found</small>
      </h1>
    </div>
  );
};

export default NotFoundPage;
