export class Field {
  alias = '';

  fields = [];

  args = [];

  constructor(name) {
    this.name = name;
  }

  addField(field) {
    if (typeof field === 'string') {
      this.fields.push(new Field(field));
    } else if (field instanceof Field) {
      this.fields.push(field);
    }
    return this;
  }

  setAlias(alias) {
    this.alias = `${alias}:`;

    return this;
  }

  addFieldList(fieldList) {
    fieldList.forEach(this.addField.bind(this));

    return this;
  }

  addArgument(name, value) {
    this.args.push({
      name,
      value
    });

    return this;
  }
}

export default Field;
