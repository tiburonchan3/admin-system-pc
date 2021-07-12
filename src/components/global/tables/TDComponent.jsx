import React from "react";

const TDComponent = React.memo(({ name, children,onclick,cursor }) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5" onClick={onclick}>
      <div className="flex items-center text-center">
        <div className="ml-3">
          {name ? (
            <p className={cursor + " text-gray-900 text-xs whitespace-nowrap text-center"}>
              {name}
            </p>
          ) : (
            <div className="flex">{children}</div>
          )}
        </div>
      </div>
    </td>
  );
})

export default TDComponent;
