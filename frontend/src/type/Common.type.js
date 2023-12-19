import PropTypes from 'prop-types';

export const ModsType = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.bool
]));

export const MixType = PropTypes.shape({
  block: PropTypes.string,
  elem: PropTypes.string,
  mods: ModsType
});

MixType.mix = MixType;

export const ChildrenType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);

export const RefType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({ current: PropTypes.instanceOf(Element) })
]);

export const MetaTitleType = PropTypes.oneOfType([PropTypes.string, PropTypes.object]);
