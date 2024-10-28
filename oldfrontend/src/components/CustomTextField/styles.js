const styles = {
  inputField: {
    background: "white",
    borderRadius: "10px",
    border: "1px solid #4CCFF8",
    "&.MuiTextField-root:hover": {
      border: "1px solid #4CCFF8",
      background: "white",
      boxShadow: "0px 0px 12px 0px rgba(76, 207, 248, 0.50)",
    },

    color: "black",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    caretColor: "black",
    "input::placeholder": {
      color: "black",
      fontSize: "14px",
    },
    "& .MuiInputBase-root": {
      color: "black",
      fontSize: "14px",
      padding: "8px 6px 5px 10px",
    },

    "& input:-webkit-autofill": {
      borderRadius: "10px",
      WebkitTextFillColor: "black",
      fontSize: "14px",
      backgroundClip: "padding-box",
      WebkitBackgroundClip: "padding-box",
      transition: "background-color 5000s ease-in-out 0s",
      paddingLeft: "1px",
    },
    "& input:-webkit-autofill::first-line": {
      fontSize: "14px",
      color: "black",
    },
    "& input": {
      "&:-internal-autofill-selected": {
        borderRadius: "20px",
        WebkitTextFillColor: "black",
        fontSize: "14px",
        paddingLeft: "1px",
      },
    },
    "&:focus": {
      outline: "none",
    },
  },
};

export default styles;
