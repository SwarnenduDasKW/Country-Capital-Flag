export const apidata = (url) => {
  const [items, setItems] = useState([]);

  fetch(url).then((x) => x.json());

  return x;
};
