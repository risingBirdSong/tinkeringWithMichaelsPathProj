import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Swappable, Trash } from '../styles/Draggables.style';

const Draggables = (props) => {
  const paths = props.paths;
  const setPaths = props.setPaths;
  console.log("paths", paths);
  // useEffect(() => {
  //   const keys = Object.keys(localStorage).sort((a, b) => b - a)
  //   let pathFromStorage = [];
  //   let count = 0;
  //   if (keys !== undefined) {
  //     keys.forEach((element) => {
  //       pathFromStorage.push({ id: count, path: localStorage[element] });
  //       count += 1;
  //     });
  //   }
  //   setPaths(pathFromStorage);
  // }, []);

  return (
    <ReactSortable
      list={paths}
      group="filePaths"
      setList={setPaths}
      animation={200}
      delay={2}
    >
      {paths.map((path, idx) => (
        <Swappable key={path.id}>
          {path.path}
          <Trash />
        </Swappable>
      ))}
    </ReactSortable>
  );
};

export default Draggables;

