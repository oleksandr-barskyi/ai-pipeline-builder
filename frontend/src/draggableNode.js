export const DraggableNode = ({ type, label, icon: Icon, accent = '#6366f1' }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
      <div
        className={`draggable-node draggable-node--${type}`}
        style={{ '--node-accent': accent }}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
        draggable
      >
          {Icon ? (
            <span className="draggable-node__icon">
              <Icon />
            </span>
          ) : null}
          <span className="draggable-node__label">{label}</span>
      </div>
    );
  };
