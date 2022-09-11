import React from "react";
import Tag from "../../Tag/Tag";
import { uid } from "react-uid";

/* Component for the Course section of profile page */
class TagSection extends React.Component {
  render() {
    const { preferredTags, profileComponent } = this.props;
    return (
      <div className="tag-display">
        <h5 className="pb-1 border-bottom">Preferred Tags </h5>
        <div className=" tag-section d-inline-flex pb-2 mb-4">
          {preferredTags
            ? preferredTags.map((tag) => (
                <Tag
                  key={uid(tag.name)}
                  name={tag.name}
                  profileComponent={profileComponent}
                />
              ))
            : ""}
        </div>
      
      </div>
    );
  }
}

export default TagSection;
