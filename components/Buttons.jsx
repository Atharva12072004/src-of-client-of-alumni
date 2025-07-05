import PropTypes from "prop-types";

const PrimaryButton = ({ name, isDisabled = false }) => {
  PrimaryButton.propTypes = {
    name: PropTypes.string.isRequired,
  };
  return (
    <button
      className={`flex pb-3 justify-center items-center p-2 m-2 text-md font-semibold max-h-9 rounded-md transition duration-300 ease-in-out ${
        isDisabled
          ? 'bg-gray-200 text-gray-300 border border-gray-300 cursor-not-allowed'
          : 'text-white bg-primaryPink border-primaryPink hover:bg-hoverpink hover:text-white border hover:border-transparent'
      }`}
      style={{ letterSpacing: '0.075em', borderWidth: '1.25px' }}
      disabled={isDisabled}
    >
      {name}
    </button>
  );
};

const BorderButton = ({ name, isDisabled = false }) => {
  BorderButton.propTypes = {
    name: PropTypes.string.isRequired,
  };
  return (

    <button
    className={`flex pb-3 justify-center items-center p-2 m-2 text-md font-semibold max-h-9 rounded-md transition duration-300 ease-in-out ${
      isDisabled
        ? 'bg-gray-200 text-gray-300 border border-gray-300 cursor-not-allowed'
        : 'text-primaryPink bg-white rounded-md border-primaryPink hover:bg-primaryPink hover:text-white hover:shadow-md border hover:border-transparent'
    }`}
    style={{ letterSpacing: '0.075em', borderWidth: '1.25px' }}
    disabled={isDisabled}
  >
    {name}
  </button>















    // <button
    //   className= "flex justify-center items-center min-w-max p-2 m-2 text-md font-semibold max-h-9  text-primaryPink bg-white rounded-md border border-primaryPink hover:bg-primaryPink hover:text-white hover:shadow-md transition duration-300 ease-in-out  "
    //   style={{ letterSpacing: '0.075em' ,borderWidth: '1.25px'}}
    // >
    //   {name}
    // </button>
  );
};

const SecondaryButton = () => {
  return (
    <>
      <div>Secondary Button Component</div>
    </>
  );
};

export { PrimaryButton, BorderButton, SecondaryButton };
