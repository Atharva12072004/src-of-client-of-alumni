export const JobsFilterButton = ({name, used}) => {
  return (
    <>
      {used ? (
        <button
          className= "p-2 m-2 text-md font-semibold text-white bg-black rounded-md border border-white hover:shadow-md transition duration-300 ease-in-out  "
          style={{ letterSpacing: '0.075em' ,borderWidth: '1.25px'}}
        >
          {name}
        </button>
      ): (
        <button className="p-2 m-2 text-md font-semibold text-black bg-white rounded-md border border-black hover:bg-black hover:text-white hover:shadow-md transition duration-300 ease-in-out  "
                style={{
                  letterSpacing: '0.075em',
                  borderWidth  : '1.25px'
                }}>
          {name}
        </button>
      )}
    </>

  );
};

export const JobsFilterButtonPlus = ({name}) => {
  return (
    <button className=" flex p-2 m-2 text-md font-semibold text-black bg-white rounded-md border border-black hover:bg-black hover:text-white hover:shadow-md transition duration-300 ease-in-out  "
            style={{
              letterSpacing: '0.075em',
              borderWidth  : '1.25px'
            }}>
      <div>{name}</div>
      <img src="/plus.svg"
           alt="actions-icon"
           className="mt-1.5 mr-1 ml-1" />
    </button>
  );
};