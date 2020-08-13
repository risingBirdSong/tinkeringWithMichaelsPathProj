import React, { useEffect, useState } from 'react';
// import Draggable, {DraggableCore} from 'react-draggable';
import PathForm from './PathForm';
import Draggables from './Draggables';
import { whichPath } from '../../../server/scripts/index';
import {
  Container,
  NavBar,
  Title,
  NavCenter,
  Emblem,
  Display,
  FormContainer,
  Instructions,
} from '../styles/App.style';


// Hook
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}



// bad way to do this but just for the sake of testing...


//converted to functional so we can have top most state
const App = () => {
  // path: '',
  // storage: 0,
  // counts: [],
  // paths: []
  let initState = [
    // {
    //   id: 1,
    //   path: "test path a"
    // },
    // {
    //   id: 2,
    //   path: "test path b"
    // }
  ]

  useEffect(() => {
    let copyOfPaths = [...paths];
    for (let i = 0; i < window.localStorage.length; i++) {
      let storedVal = localStorage.getItem(localStorage.key(i));
      copyOfPaths.push({
        id: i,
        path: storedVal
      })
    }
    setPaths(copyOfPaths);
  }, [])

  const [path, setPath] = React.useState("");
  const [paths, setPaths] = React.useState(initState);
  const [storage, setStorage] = React.useState(0);
  const [counts, setCounts] = React.useState(0);

  // const [name, setName] = useLocalStorage('testKey', 'testVal');

  // componentDidMount() {
  //   const local = window.localx  xStorage.length;
  //   const keys = Object.keys(localStorage).sort((a, b) => b - a);
  //   const paths = [];
  //   const counts = [];
  //   let count = 0;
  //   if (keys !== undefined) {
  //     keys.forEach((element) => {
  //       paths.push({ path: localStorage[element] });
  //       counts.push(count);
  //       count += 1;
  //     });
  //   }
  //   this.setState({ storage: local, counts });
  // }

  const pathConvert = (value) => {
    const path = whichPath(value);
    let pathsCopy = [...paths];
    let nextIdx = window.localStorage.length;
    let newPath = {
      id: nextIdx,
      path: path
    }
    pathsCopy.push(newPath);
    // this.setState({ paths: pathsCopy }, console.log("paths copy", pathsCopy));
    setPaths(pathsCopy);
    window.localStorage.setItem(nextIdx, path);
    // const { storage } = this.state;
    // const temp = {};
    // temp.path = path;
    // temp.storage = storage;
    // navigator.clipboard.writeText(path)
    //   .then(() => {
    //     if (path !== 'Not a valid path') {
    //       temp.storage += 1;
    //       window.localStorage[storage] = path;
    //       temp.pathCopy.push(path);
    //     }
    //     this.setState(temp);
    //   })
    //   .catch(() => {
    //     this.setState({ path });
    //   });
  }

  return (
    <Container>
      <NavBar>
        <Title />
        <NavCenter>
          <Display>Stuff n Things</Display>
        </NavCenter>
        <Emblem />
      </NavBar>
      <hr />
      <FormContainer>
        <Instructions>Chicken</Instructions>
        <PathForm pathConvert={pathConvert} />
        <div>{path}</div>
      </FormContainer>
      <hr />
      <Draggables counts={counts} path={path} paths={paths} setPaths={setPaths} />
    </Container>
  );
}

export default App;
