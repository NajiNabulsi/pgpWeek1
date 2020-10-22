import useFetch from "./useFetch";

const questionsControllers = () => {
  const { isLoading, error, clearError, sendRequest } = useFetch();

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [gifCorrect, setGifCorrect] = useState(false);
  const [gifWrong, setGifWrong] = useState(false);

  const fetchQuestion = async (url) => {
    const data = await sendRequest(url);
    setQuestionsData(data);
  };

  const postQuestion = async (url, __id, answer) => {
    const body = {
      _id,
      answer,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
    let getAnswer;
    try {
      getAnswer = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
    } catch (err) {
      console.log("request not send", err);
    }

    if (getAnswer.answer === true) {
      setCorrect(correct + 1);
      setGifCorrect(true);
    } else {
      setWrong(wrong + 1);
      setGifWrong(true);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setGifCorrect(false);
      setGifWrong(false);
    }, 1300);
  }, [correct, wrong]);

  return {
    fetchQuestion,
    postQuestion,
    correct,
    gifCorrect,
    wrong,
    isLoading,
    error,
  };
};

export default questionsControllers;
