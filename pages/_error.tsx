import Link from "next/link";
import { NextPageContext } from "next";

interface StatusCode {
  statusCode: string;
}

const Error = ({ statusCode }: StatusCode) => {
  return (
    <>
      <div className="container">
        <div className="text-box">
          <h1>{statusCode ? statusCode : "404"}</h1>
          <h1>{statusCode ? statusCode : "404"}</h1>
        </div>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </div>
      <style jsx>{`
        *,
        *:after,
        *:before {
          box-sizing: border-box;
        }

        body {
          font-family: "Inter", sans-serif;
          background-color: #fff;
        }

        .text-box {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h1 {
          font-size: 12vw;
          font-weight: 900;
          text-align: center;
          background-color: #000;
          color: #fff;
          display: block;
          padding: 0.5em;
          width: 100%;
        }

        h1:nth-child(2) {
          position: absolute;
          background-color: #fff;
          color: #000;
          clip-path: inset(-1% -1% 50% -1%);
        }

        a {
          font-size: 2vw;
          font-weight: 900;
          margin-top: 1em;
          text-align: center;
          color: black;
          text-decoration: none;
        }
        span {
          display: block;
          transform: rotate(90deg);
          margin-top: 0.25em;
        }

        .container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
