export const LocalStorageCRUD = (() => {
    const STORAGE_KEY = 'optionsObject';
  
    const getOptions = () => {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : {};
    };
  
    const saveOptions = (options) => {
      const currentOptions = getOptions();
      const updatedOptions = { ...currentOptions, ...options };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOptions));
    };
  
    const updateOption = (key, value) => {
      const options = getOptions();
      if (options[key] !== undefined) {
        options[key] = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
      } else {
        console.warn(`Option "${key}" does not exist.`);
      }
    };
  
    const deleteOption = (key) => {
      const options = getOptions();
      if (options[key] !== undefined) {
        delete options[key];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
      } else {
        console.warn(`Option "${key}" does not exist.`);
      }
    };
  
    const getAllOptions = () => {
      return getOptions();
    };
  
    return {
      saveOptions,
      updateOption,
      deleteOption,
      getAllOptions,
    };
  })();
  