const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function onDragEnd(result, state, setState) {
  const { source, destination } = result;
  if (!destination) {
    return;
  }

  if (destination.droppableId === source.droppableId) {
    if (destination.index === source.index) {
      return;
    }

    const widgets = reorder(state.widgets[source.droppableId], source.index, destination.index);

    const updateState = {
      widgets: {
        ...state.widgets,
        [source.droppableId]: widgets,
      },
    };

    setState(updateState);
  } else {
    const startColumn = [...state.widgets[source.droppableId]];
    const finishColumn = [...state.widgets[destination.droppableId]];
    const [removed] = startColumn.splice(source.index, 1);
    finishColumn.splice(destination.index, 0, removed);

    const updateState = {
      widgets: {
        ...state.widgets,
        [source.droppableId]: startColumn,
        [destination.droppableId]: finishColumn,
      },
    };
    setState(updateState);
  }
}
