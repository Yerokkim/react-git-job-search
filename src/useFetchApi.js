import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "MAKE_REQUEST",
  GET_DATA: "GET_DATA",
  ERROR: "ERROR",
  UPDATE_HAS_NEXT_PAGE: "UPDATE_HAS_NEXT_PAGE",
};
//ex dispatch(type , payload: 3) action 이 받아서 state값 변경
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return {
        loading: true,
        jobs: [],
      };
    case ACTIONS.GET_DATA:
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      };
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage,
      };

    default:
      return state;
  }
}
//https://cors-anywhere.herokuapp.com/
const BASE_URI = "/positions.json";
export default function useFetchApi(params, page) {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
  });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });

    axios

      .get(
        BASE_URI,
        //page 를 꼭 이렇게?

        {
          cancelToken: cancelToken.token,
          params: { markdown: true, page: page, ...params },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });
    //second page

    const cancelToken2 = axios.CancelToken.source();

    axios
      .get(
        BASE_URI,
        //page 를 꼭 이렇게?

        {
          cancelToken: cancelToken.token,
          params: { markdown: true, page: page + 1, ...params },
        }
      )
      .then((res) => {
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } });
      });

    return () => {
      cancelToken.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);
  return state;
}
