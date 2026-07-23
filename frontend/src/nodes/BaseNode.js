import { useMemo, useState } from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';
import './baseNode.css';

const getFieldDefaultValue = (field, id, data) => {
  if (data?.[field.name] !== undefined) {
    return data[field.name];
  }

  if (typeof field.defaultValue === 'function') {
    return field.defaultValue(id, data);
  }

  return field.defaultValue ?? '';
};

const renderHandle = (nodeId, handle) => (
  <Handle
    key={handle.id}
    type={handle.type}
    position={handle.position}
    id={`${nodeId}-${handle.id}`}
    style={handle.style}
  />
);

export const BaseNode = ({
  id,
  data,
  title,
  subtitle,
  handles = [],
  fields = [],
  children,
}) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const initialValues = useMemo(
    () =>
      fields.reduce((values, field) => {
        values[field.name] = getFieldDefaultValue(field, id, data);
        return values;
      }, {}),
    [fields, id, data]
  );
  const [values, setValues] = useState(initialValues);

  const handleChange = (fieldName, fieldValue) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: fieldValue,
    }));
    updateNodeField(id, fieldName, fieldValue);
  };

  const renderField = (field) => {
    const value = values[field.name] ?? '';
    const commonProps = {
      value,
      onChange: (event) => handleChange(field.name, event.target.value),
      placeholder: field.placeholder,
      className: 'base-node__control',
    };

    return (
      <label className="base-node__field" key={field.name}>
        <span className="base-node__field-label">{field.label}</span>
        {field.type === 'select' ? (
          <select {...commonProps}>
            {field.options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea {...commonProps} rows={field.rows ?? 3} />
        ) : (
          <input {...commonProps} type={field.type ?? 'text'} />
        )}
      </label>
    );
  };

  return (
    <div className="base-node">
      {handles.map((handle) => renderHandle(id, handle))}
      <div className="base-node__header">
        <span className="base-node__title">{title}</span>
        {subtitle ? <span className="base-node__subtitle">{subtitle}</span> : null}
      </div>
      {fields.length > 0 ? (
        <div className="base-node__fields">{fields.map(renderField)}</div>
      ) : null}
      {children ? <div className="base-node__content">{children}</div> : null}
    </div>
  );
};
