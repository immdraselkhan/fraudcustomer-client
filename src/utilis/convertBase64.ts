const convertBase64 = async (file: File) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  return new Promise<string>((resolve, reject) => {
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default convertBase64;
