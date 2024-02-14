export function compareTwoObjects(objectOne, objectTwo, excludedKeys = []) {
  return Object
      .keys(objectOne)
      .filter((key) => !excludedKeys.includes(key))
      .every((key) => JSON.stringify(objectOne[key]) === JSON.stringify(objectTwo[key]));
}

export function noopFn() {
  return null;
};

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function navigateTo(navigate, tabName) {
  if (typeof tabName !== 'string' || !tabName.length || typeof navigate !== 'function') {
    return;
  }
  const modifiedTabName = tabName.replace(' ', '_').toLowerCase();

  return navigate(`/my_account/${modifiedTabName}`);
};

export function validateInput(e, input, error, setError) {
  const { name, value } = e.target;
  setError((prev) => {
    const stateObj = { ...prev, [name]: '' };

    switch (name) {
      case 'email':
        if (!value) {
          stateObj[name] = 'Please enter email.';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          stateObj[name] = 'Please enter a valid email.';
        }
        break;

      case 'password':
        if (!value) {
          stateObj[name] = 'Please enter Password.';
        } else if (input.password2 && value !== input.password2) {
          stateObj['password2'] = 'Password and confirm password does not match.';
        } else {
          stateObj['password2'] = input.password2 ? '' : error.password2;
        }
        break;

      case 'password2':
        if (!value) {
          stateObj[name] = 'Please enter Confirm Password.';
        } else if (input.password && value !== input.password) {
          stateObj[name] = 'Password and confirm password does not match.';
        }
        break;

      case 'firstName':
        if (!value) {
          stateObj[name] = 'Please enter first name.';
        }
        break;

      case 'lastName':
        if (!value) {
          stateObj[name] = 'Please enter last name.';
        }
        break;

      default:
        break;
    }

    return stateObj;
  });
};

export function onInputChange(e, input, error, setError, setInput) {
  const { name, value } = e.target;
  setInput((prev) => ({
    ...prev,
    [name]: value
  }));
  validateInput(e, input, error, setError);
};

export function validateBirthDate(currentDate, setError) {
  if (currentDate > new Date()) {
    setError((prev) => ({
      ...prev,
      birthDate: 'Birthday cannot be a future date.'
    }));
  }
};
