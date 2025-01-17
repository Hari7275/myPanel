import React, { useEffect, useRef , forwardRef} from "react";
import "./checkbox.css";

const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
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

export default Checkbox;
