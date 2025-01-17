import React from "react";
import "./tableCheckbox.css";

const TableCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return (
    <>
      <div className="checkbox_container">
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    </>
  );
});

export default TableCheckbox;
