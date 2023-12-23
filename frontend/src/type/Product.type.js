import PropTypes from 'prop-types';

export const ProductType = PropTypes.shape({
  SKU: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
  images: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
});
