import { useEffect, useState } from "react";
import "./styles.css";

function App() {
  const [tags, setTags] = useState([
  ]);

  const [text, setText] = useState("");


const [errorDirty, setErrorDirty] = useState(false)
const [error, setError] = useState('Поле не может быть пустым!')
const [formValid, setFormValid] = useState(false);
const [styles, setStyles] = useState('disabled-button')


  const changeText = (e) => {
    setText(e.target.value);
  };

  const addTags = () => {
    setTags([
      {
        text: text,
      },
      ...tags
    ]);
    setText('')
  }

  const deleteTag = (indexRemoveItem) => {
    const filtered = tags.filter((tags, index) => {
      if (index === indexRemoveItem) {
        return false;
      }
      return true;
    });
    setTags(filtered);
  };

  const blurHandler = (e) => {
    if (e.target.name === "texts" && e.target.value === "") {
      setErrorDirty(true);
    } else {
      setErrorDirty(false);
    }
  };


  useEffect(() => {
    if (error) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [error]);

  useEffect(() => {
    if (text !== "") {
      setError("");
      setStyles('addButton')
      setFormValid(true);
    } else {
      setError("Поле ввода не должно быть пустым!");
      setFormValid(false);
    }
  }, [text]);

  return (
    <div>
      <div>
        <input
          onBlur={blurHandler}
          className="input"
          name='texts'
          type="text"
          onChange={changeText}
          value={text}
          placeholder="Введите текст..."
        />
        <button disabled={!formValid} onClick={addTags} className={styles}>Отправить</button>
      </div>
      
      {errorDirty && error && (
          <div className="text-error">{error}</div>
        )}


      <div className="tags_main">
        {tags.map((item, index) => <div className="tagss">{item.text} <button  onClick={() => deleteTag(index)} className="button-del">x</button></div>)}
      </div>
    </div>
  );
}

export default App;
