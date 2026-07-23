import { BaseNode } from './BaseNode';

export const createConfigurableNode = (config) => {
  const ConfigurableNode = ({ id, data }) => (
    <BaseNode id={id} data={data} {...config}>
      {config.content}
    </BaseNode>
  );

  ConfigurableNode.displayName = `${config.title.replace(/\s+/g, '')}Node`;
  return ConfigurableNode;
};
