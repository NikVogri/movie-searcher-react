const saveToLocalStorage = (data, type) => {
  const getLocalStorageData = localStorage.getItem(type);
  const localStorageData = JSON.parse(getLocalStorageData);

  const elementExist = localStorageData.find(el => {
    return el.id === data.id;
  });

  if (!elementExist) {
    localStorageData.push({ ...data });
  }
  localStorage.setItem(type, JSON.stringify(localStorageData));
};
export default saveToLocalStorage;
