import React from "react";

import { Form, Input, Button } from "ui";

class ItemForm extends React.Component {
  componentWillMount() {
    this.initState(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.initState(nextProps);
  }

  onChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { onSubmit, itemFormFields } = this.props;

    onSubmit(this.state);
    this.initState({
      itemFormFields
    });
  };

  initState = ({ itemFormFields, item }) => {
    this.state = itemFormFields.reduce((acc, formField) => {
      acc[formField.name] = item ? item[formField.name] : "";
      return acc;
    }, {});
  };

  cancelUpdate = e => {
    e.preventDefault();
    this.props.onCancelUpdate();
  };

  render() {
    const { item, itemName, itemFormFields } = this.props;
    const currentlyEditing =
      item &&
      <p className="editing-heading">
        You are currently editing a {itemName}
      </p>;

    return (
      <div>
        {currentlyEditing}
        <Form onSubmit={this.onSubmit}>
          {itemFormFields.map(formField =>
            <Input
              type={formField.type}
              placeholder={formField.name}
              name={formField.name}
              value={this.state[formField.name]}
              onChange={this.onChange}
              key={formField.name}
            />
          )}
          <Button type="submit" block>
            {item ? `Update ${itemName}` : `Add ${itemName}`}
          </Button>
          {item
            ? <Button block onClick={this.cancelUpdate}>
                Cancel
              </Button>
            : ""}
        </Form>
      </div>
    );
  }
}

export default ItemForm;
