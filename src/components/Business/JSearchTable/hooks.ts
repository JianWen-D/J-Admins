const useJsearchTable = () => {
  const handleRefresh = (callback: () => void) => {
    callback();
  };
  return {
    handleRefresh,
  };
};

export default useJsearchTable;
