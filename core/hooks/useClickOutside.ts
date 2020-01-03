import * as React from 'react';

export function useOutsideAlerter(refs:any) {
  const [isClickedOutside, setIsClickedOutside] = React.useState<boolean>(false);

  function handleClickOutside(event:MouseEvent) {
    let result:boolean[] = [];

    refs.forEach((ref:any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        result.push(true);
      }
    });

    if (isClickedOutside !== (result.length === refs.length)) {
      setIsClickedOutside(result.length === refs.length);
    }
  }

  React.useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return isClickedOutside;
}
