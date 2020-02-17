const saveToLocalStorage = (data, type) => {
  // get data from local storage
  const getLocalStorageData = localStorage.getItem(type);
  // parse data from local storage
  const localStorageData = JSON.parse(getLocalStorageData);
  // checks if same content type already exists on local storage
  const elementExist = localStorageData.find(el => {
    return el.id === data.id;
  });
  // if it does not exist, it pushes the new object to the array
  if (!elementExist) {
    localStorageData.push({ ...data });
  }
  // updates local storage with the new array
  localStorage.setItem(type, JSON.stringify(localStorageData));
};
export default saveToLocalStorage;
