import React from 'react';
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


// bad way to do this but just for the sake of testing...
let tracker = 3;


//converted to functional so we can have top most state
const App = () => {
  // path: '',
  // storage: 0,
  // counts: [],
  // paths: []
  let initState = [
    {
      id: 1,
      path: "test path a"
    },
    {
      id: 2,
      path: "test path b"
    }
  ]
  const [path, setPath] = React.useState("");
  const [paths, setPaths] = React.useState(initState);
  const [storage, setStorage] = React.useState(0);
  const [counts, setCounts] = React.useState(0);
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
    console.log("path convert", path);
    let pathsCopy = [...paths];
    let newPath = {
      id: tracker,
      path: path
    }
    pathsCopy.push(newPath);
    // this.setState({ paths: pathsCopy }, console.log("paths copy", pathsCopy));
    setPaths(pathsCopy);
    tracker++;
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
