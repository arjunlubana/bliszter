import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const poster = (url: string, data: Object) =>
  axios.post(url, data).then((res) => res.data);

export { fetcher, poster };
