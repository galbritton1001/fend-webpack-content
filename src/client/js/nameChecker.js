function checkForName(inputData) {
  console.log(inputData);
  let urlOk = new RegExp(`((http|https)://)(www.)`);

  if (inputData[1] === true) {
    console.log("0000000000000000000000000000000000000000");
    if (urlOk.test(inputData[0])) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log("11111111111111111111111111111111111");
    if (urlOk.test(inputData[0])) {
      if (
        confirm("You have entered what appears to be a valid URL continue ?")
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log("222222222222222222222222222222222222222222222222222");
      if (
        confirm("You have entered what appears to be an invalid URL continue ?")
      ) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }
}
export { checkForName };
