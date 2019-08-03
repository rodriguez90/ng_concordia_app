const Optional = {
  EMPTY: null,
  of: function (value) {

    function isNullOrUndefined(value) {
      return value == undefined || value == null;
    }

    return {
      get: function () {
        if (isNullOrUndefined(value)) {
          throw 'Optional value is undefined or null';
        }
        return value;
      },
      orElse: function (elseValue) {
        if (isNullOrUndefined(value)) {
          return elseValue;
        }
        return value;
      },
      ifPresent: function (func) {
        if (!isNullOrUndefined(value)) {
          func(value);
        }
      },
      isPresent: function () {
        return !isNullOrUndefined(value);
      },
      filter: function (filterFunction) {
        if (isNullOrUndefined(value) || filterFunction(value)) {
          return this;
        } else {
          return Optional.EMPTY;
        }
      },
      map: function (mapperFunction) {
        if (isNullOrUndefined(value)) {
          return Optional.EMPTY;
        } else {
          return Optional.of(mapperFunction(value));
        }
      }
    };
  },
  empty: function () {
    return Optional.EMPTY;
  },
};
Optional.EMPTY = Object.freeze(Optional.of(null));

export default Optional;
