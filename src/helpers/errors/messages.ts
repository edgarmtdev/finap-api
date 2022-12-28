const errorMessages = {
  fieldUndefined: "The field",
  noInformation: "An email and password are required",
};

const formatMessage = (type: number, data?: string | undefined) => {
  switch (type) {
    case 1:
      return `${errorMessages.fieldUndefined + " " + data} is required`;
    case 2:
      return errorMessages.noInformation;
    case 3:
      return `${errorMessages.fieldUndefined + " " + data} is incorrect`;
    case 4:
      const formatText = data.split("_")[1];
      return `${errorMessages.fieldUndefined + " " + formatText} already exists`;
    default:
      return "No valid";
  }
};

export default formatMessage;
