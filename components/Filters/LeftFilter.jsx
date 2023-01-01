import React, { useRef, useState } from 'react';

export const LeftFilter = () => {
  const myRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(!isVisible);
  }
  return (
    <>
      <div id="leftFilterContainer">
        <form method="POST" action="#">
          <div>
            <div id="sizesContainer" onClick={handleClick}>
              Sizes
            </div>
            {isVisible ? (
              <div
                style={{ display: isVisible ? 'block' : 'none' }}
                ref={myRef}
                id="leftFilterSizesContainer"
              >
                <input type="checkbox" id="size" name="size" value="6.5" />
                <label for="size">6 1/2</label>
                <input type="checkbox" id="size" name="size" value="7" />
                <label for="size">7</label>
                <input type="checkbox" id="size" name="size" value="7.5" />
                <label for="size">7 1/2</label>
                <input type="checkbox" id="size" name="size" value="8" />
                <label for="size">8</label>
                <input type="checkbox" id="size" name="size" value="8.5" />
                <label for="size">8 1/2</label>
                <input type="checkbox" id="size" name="size" value="9" />
                <label for="size">9</label>
                <input type="checkbox" id="size" name="size" value="9.5" />
                <label for="size">9 1/2</label>
                <input type="checkbox" id="size" name="size" value="10" />
                <label for="size">10</label>
                <input type="checkbox" id="size" name="size" value="10.5" />
                <label for="size">10 1/2</label>
                <input type="checkbox" id="size" name="size" value="11" />
                <label for="size">11</label>
                <input type="checkbox" id="size" name="size" value="11.5" />
                <label for="size">11 1/2</label>
                <input type="checkbox" id="size" name="size" value="12" />
                <label for="size">12</label>
                <input type="checkbox" id="size" name="size" value="12.5" />
                <label for="size">12 1/2</label>
              </div>
            ) : (
              ''
            )}
          </div>

          <input type="Submit" name="Submit" value="Submit" />
        </form>
      </div>
    </>
  );
};
