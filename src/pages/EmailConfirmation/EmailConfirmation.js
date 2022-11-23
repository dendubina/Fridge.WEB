import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { confirmEmail } from "../../services/Http/FridgeApi/FridgeApiService";
import "./EmailConfirmation.css";

export default function EmailConfirmation() {
  const [result, setResult] = useState(undefined);
  const [secondsBeforeRedirect, SetSecondsBeforeRedirect] = useState(10);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    confirmEmail({
      userId: params.userId,
      token: searchParams.get("emailToken").replace(/ /g, "+"),
    })
      .then((response) => {
        if (response.ok) {
          setResult(true);
        } else {
          setResult(false);
        }
      })
      .catch((error) => {
        setResult(false);
        console.error(error);
      });

    let timer = setInterval(() => {
      SetSecondsBeforeRedirect(
        (secondsBeforeRedirect) => secondsBeforeRedirect - 1
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [params.userId, searchParams]);

  useEffect(() => {
    if (result === true && secondsBeforeRedirect <= 0) {
      navigate("/", { replace: true });
    }
  }, [result, secondsBeforeRedirect, navigate]);

  return (
    <>
      <Header />
      <div className="result-block">
        {result === true && (
          <>
            Thanks for email confirmation. Redirecting to main page in{" "}
            <span className="seconds-span">{secondsBeforeRedirect}</span>{" "}
            seconds.
          </>
        )}
        {result === false && (
          <>Oops, sorry, something went wrong. Please, try again later</>
        )}
        {result === undefined && <>Loading...</>}
      </div>
    </>
  );
}
