import React from "react";
import { deleteTag, addNewTag } from "../../../actions/adminPage";
import Tag from "../../Tag/Tag";
import { uid } from "react-uid";

class TagsCard extends React.Component {
  state = {
    newTag: "",
  };
  handleChanges = (event) => {
    event.preventDefault();
    this.setState({ newTag: event.target.value });
  };
  render() {
    const { adminComponent, tags } = this.props;
    return (
      <div className="card">
        <div className="card-header font-weight-bold d-flex justify-content-between">
          Manage Tags
          <button
            className="btn btn-sm btn-outline-success"
            data-toggle="collapse"
            data-target="#addNewTag"
            aria-expanded="false"
            aria-controls="addNewTag"
          >
            Add Tag
          </button>
        </div>
        <div>
          <div className="collapse card-header" id="addNewTag">
            <form
              className="addNewTagForm"
              onSubmit={(e) => {
                e.preventDefault();
                addNewTag(e.target, adminComponent, this, this.state.newTag);
              }}
            >
              <div className="form-group ">
                <label htmlFor="newTagName">Name</label>
                <input
                  type="text"
                  name="newTag"
                  className="form-control newTagNameClass"
                  id="newTagName"
                  placeholder="Tag Name"
                  onChange={this.handleChanges}
                  value={this.state.newTag}
                  required
                />
                <button className="btn btn-sm btn-outline-danger">Add</button>
              </div>
            </form>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          {tags
            ? tags.map((tag) => (
                <li
                  className="list-group-item d-flex justify-content-between"
                  key={uid(tag.name)}
                >
                  <Tag name={tag.name} />
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      deleteTag(adminComponent, tag.name);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))
            : ""}
        </ul>
      </div>
    );
  }
}

export default TagsCard;
